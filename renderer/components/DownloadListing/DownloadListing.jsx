import React from "react";
import classes from "./DownloadListing.module.css";
import axios from "axios";
import { ipcRenderer } from "electron";

import MetadataPopup from "../MetadataPopup/MetadataPopup";

const DownloadListing = (props) => {
  const [state, setState] = React.useState({
    directoryPath: undefined,
    listings: props.listings,
    showMetaPopup: false,
    selectedIndex: undefined,
  });

  const [metadataList, setMetadataList] = React.useState([]);

  const getHomeDir = () => {
    return ipcRenderer.sendSync("synchronous-message", "home-dir");
  };

  const handleDownload = () => {
    let urlList = state.listings.map((listing) => {
      return listing.data[0].url;
    });
    let titleList = state.listings.map((listing) => {
      return listing.data[0].title;
    });
    // console.log(urlList);
    ipcRenderer.on("asynchronous-reply", (event, response) => {
      if (response === "download-complete") {
        props.onDownloadFinished();
      }
    });
    ipcRenderer.send("asynchronous-message", "download-list", {
      urls: urlList,
      path: state.directoryPath,
      titles: titleList,
      metadataList: metadataList,
    });
    props.onDownloadStarted();
  };

  const updateMetadataList = (metadata) => {
    if (metadata) {
      let _metadataList = metadataList;
      _metadataList[state.selectedIndex] = metadata;
      setState({ ...state, showMetaPopup: false });
      setMetadataList(_metadataList);
    } else {
      let metadataList = [];
      for (let i = 0; i < state.listings.length; i++) {
        metadataList[i] = {
          trackTitle: state.listings[i].data[0].title,
          artist: "",
          genre: "",
        };
        console.log(state.listings[i].data[0].title);
      }
      console.log(JSON.stringify(metadataList));
      setMetadataList(metadataList);
    }
  };

  const openMetaPopup = (index) => {
    console.log(metadataList[index]);
    setState({ ...state, showMetaPopup: true, selectedIndex: index });
  };

  React.useEffect(() => {
    if (state.directoryPath == null) {
      let homeDir = getHomeDir();
      setState({ ...state, directoryPath: homeDir });
    }
  }, [state.directoryPath]);

  React.useEffect(() => {
    if (props.listings == null) {
      const data = localStorage.getItem("downloadListing-state");
      if (data) {
        setState(JSON.parse(data));
      }
    } else {
      if (metadataList.length === 0) updateMetadataList();
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("downloadListing-state", JSON.stringify(state));
  });

  console.log("state: " + JSON.stringify(state));
  let listings =
    state.listings !== "download-complete"
      ? state.listings.map((listing, i) => {
          return (
            <div key={i}>
              <div className={classes.listingTile}>
                <div className={classes.videoTitle}>
                  {listing.data[0].title}
                </div>
                <div className={classes.options}>
                  <div className={classes.miniBtn}>MP3</div>
                  <div
                    className={classes.miniBtn}
                    onClick={() => openMetaPopup(i)}
                  >
                    META
                  </div>
                  <div className={classes.editBtn}></div>
                  <div className={classes.deleteBtn}></div>
                </div>
              </div>
              <hr className={classes.hr} />
            </div>
          );
        })
      : "";

  let metaPopup = state.showMetaPopup ? (
    <MetadataPopup
      metadata={metadataList}
      index={state.selectedIndex}
      hideBackdrop={() => setState({ ...state, showMetaPopup: false })}
      submitMetadata={(metadata) => updateMetadataList(metadata)}
    />
  ) : (
    ""
  );
  return (
    <div className={classes.downloadListing}>
      <img
        className={classes.logo}
        draggable="false"
        src="../assets/logo.svg"
        alt="MIYT"
      />
      <div className={classes.downloadListingContainer}>
        <p>metadata: {JSON.stringify(metadataList)}</p>
        <div
          className={classes.backButton}
          onClick={() => props.goBack()}
        ></div>
        {listings}
      </div>
      <div
        className={classes.downloadButton}
        onClick={() => handleDownload()}
      ></div>
      <div
        className={classes.changeDirLink}
        onClick={async () => {
          ipcRenderer.on("asynchronous-reply", (event, directoryPath) => {
            setState({ ...state, directoryPath });
          });
          ipcRenderer.send("asynchronous-message", "directory-picker");
        }}
      >
        Change file's destination &nbsp; 📁
      </div>
      {state.directoryPath != null ? (
        <p className={classes.directoryPath}>{state.directoryPath}</p>
      ) : (
        ""
      )}
      {metaPopup}
    </div>
  );
};

export default DownloadListing;
