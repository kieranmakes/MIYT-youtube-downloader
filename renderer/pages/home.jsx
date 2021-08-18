import React, { useState } from "react";
import { ipcRenderer } from "electron";
import Head from "next/head";
import StartScreen from "../components/StartScreen/StartScreen";
import MultipleVideoSearch from "../components/MultipleVideoSearch/MultipleVideoSearch";
import DownloadListing from "../components/DownloadListing/DownloadListing";
import Loader from "../components/Loader/Loader";
import axios from "axios";

function Home() {
  const changeScreenToDownloadListings = async (data) => {
    try {
      let searchTerms = [];
      if (data.indexOf("\n") > 0) {
        let lines = data.split("\n");
        lines = lines.filter((line) => line !== "");
        searchTerms = lines;
      } else {
        searchTerms = [data];
      }

      ipcRenderer.on("asynchronous-reply", (event, video_data) => {
        setState({
          ...state,
          currentScreen: (
            <DownloadListing
              listings={video_data}
              goBack={changeScreenToMultipleVideoSearch}
              onDownloadStarted={() =>
                setState({ ...state, currentScreen: <Loader /> })
              }
              onDownloadFinished={() => {
                setState({ ...state, currentScreen: startScreen });
              }}
            />
          ),
        });
      });
      ipcRenderer.send(
        "asynchronous-message",
        "search-terms-video-data",
        searchTerms
      );
      setState({
        currentScreen: <Loader />,
      });
    } catch (e) {
      throw e;
    }
  };
  const startScreen = (
    <StartScreen
      multipleVideoSearchClicked={() => changeScreenToMultipleVideoSearch}
      submitHandler={changeScreenToDownloadListings}
    />
  );

  const [state, setState] = useState({
    currentScreen: startScreen,
  });

  const changeScreenToMultipleVideoSearch = () => {
    setState({
      ...state,
      currentScreen: (
        <MultipleVideoSearch submitHandler={changeScreenToDownloadListings} />
      ),
    });
  };

  return (
    <React.Fragment>
      <Head>
        <title>MIYT</title>
      </Head>
      {state.currentScreen}
      {/* <Loader /> */}
    </React.Fragment>
  );
}

export default Home;
