import React from "react";
import classes from "./DownloadListing.module.css";
import axios from "axios";
import { ipcRenderer } from "electron";

import MetadataPopup from "../MetadataPopup/MetadataPopup";
import VideoSelectorPopup from "../VideoSelectorPopup/VideoSelectorPopup";

const DownloadListing = (props) => {
  const [state, setState] = React.useState({
    directoryPath: undefined,
    listings: props.listings,
    showMetaPopup: false,
    showVideoSelectorPopup: false,
    selectedIndex: undefined,
  });
  const [selectedVideoIndexes, setSelectedVideoIndexes] = React.useState([]);
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

  const removeListing = (index) => {
    if (state.listings.length > 1) {
      let _selectedVideoIndexes = selectedVideoIndexes;
      let _metadataList = metadataList;
      let _listings = state.listings;
      _selectedVideoIndexes.splice(index, 1);
      _metadataList.splice(index, 1);
      _listings.splice(index, 1);
      setMetadataList(_metadataList);
      setSelectedVideoIndexes(_selectedVideoIndexes);
      setState({ ...state, listings: _listings });
    }
  };

  const updateSelectedVideoIndexes = () => {
    // console.log("updating Selected video indexes:: " + selectedVideoIndexes);
    let _selectedVideoIndexes = [];
    for (let i = 0; i < state.listings.length; i++) {
      console.log(`i am ${i}`);
      _selectedVideoIndexes[i] = 0;
    }
    console.log(
      "selectedVideoIndexes: ",
      JSON.stringify(_selectedVideoIndexes)
    );
    setSelectedVideoIndexes(_selectedVideoIndexes);
  };

  const updateMetadataList = (metadata) => {
    console.log("hello");
    if (metadata) {
      let _metadataList = metadataList;
      _metadataList[state.selectedIndex] = metadata;
      setState({ ...state, showMetaPopup: false });
      setMetadataList(_metadataList);
    } else {
      try {
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
      } catch (e) {
        console.log("ERROR ::  " + e);
      }
    }
  };

  const openMetaPopup = (index) => {
    setState({ ...state, showMetaPopup: true, selectedIndex: index });
  };

  const openVideoSelectorPopup = (index) => {
    setState({ ...state, showVideoSelectorPopup: true, selectedIndex: index });
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
      if (selectedVideoIndexes.length === 0) updateSelectedVideoIndexes();
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
                  {metadataList.length > 0
                    ? metadataList[i].trackTitle
                    : state.listings[i].title}
                </div>
                <div className={classes.options}>
                  <div className={classes.miniBtn}>MP3</div>
                  <div
                    className={classes.miniBtn}
                    onClick={() => openMetaPopup(i)}
                  >
                    META
                  </div>
                  <div
                    className={classes.editBtn}
                    onClick={() => {
                      openVideoSelectorPopup(i);
                    }}
                  ></div>
                  <div
                    className={classes.deleteBtn}
                    onClick={() => {
                      removeListing(i);
                    }}
                  ></div>
                </div>
              </div>
              <hr className={classes.hr} />
            </div>
          );
        })
      : "";

  let videoSelectorPopup = state.showVideoSelectorPopup ? (
    <VideoSelectorPopup
      metadata={metadataList}
      index={state.selectedIndex}
      hideBackdrop={() => setState({ ...state, showVideoSelectorPopup: false })}
      submitMetadata={(metadata) => updateMetadataList(metadata)}
      listings={state.listings}
    />
  ) : (
    ""
  );

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
        {/* <p>metadata: {JSON.stringify(metadataList)}</p> */}
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
      {videoSelectorPopup}
    </div>
  );
};

export default DownloadListing;
