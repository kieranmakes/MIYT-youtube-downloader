import React, { useState } from "react";
import c from "./VideoSelectorPopup.module.css";

const VideoSelectorPopup = (props) => {
  const [state, setState] = useState({
    listings: [],
    currentlySelectedVideoIndex: undefined,
  });

  const increaseSelectedVideoIndex = () => {
    if (state.currentlySelectedVideoIndex < 9) {
      let currentlySelectedVideoIndex = state.currentlySelectedVideoIndex;
      currentlySelectedVideoIndex++;
      setState({ ...state, currentlySelectedVideoIndex });
    }
  };

  const decreaseSelectedVideoIndex = () => {
    if (state.currentlySelectedVideoIndex > 0) {
      let currentlySelectedVideoIndex = state.currentlySelectedVideoIndex;
      currentlySelectedVideoIndex--;
      setState({ ...state, currentlySelectedVideoIndex });
    }
  };

  const submitHandler = () => {
    let allVideoIndexes = props.selectedVideoIndexes;
    allVideoIndexes[props.index] = state.currentlySelectedVideoIndex;

    props.onUpdateSelectedVideoIndexes(allVideoIndexes);
    props.onUpdateMetadataTitle(
      props.listings[props.index].data[state.currentlySelectedVideoIndex].title
    );
  };

  React.useEffect(() => {
    if (state.currentlySelectedVideoIndex == null) {
      let currentlySelectedVideoIndex = props.selectedVideoIndexes[props.index];
      setState({ ...state, currentlySelectedVideoIndex });
    }
  }, []);

  return (
    <div className={c.VideoSelectorPopup}>
      <div className={c.backdrop} onClick={props.hideBackdrop}></div>
      <div className={c.popupContent}>
        <h1>Video Selector</h1>
        <div className={c.videoSelectorContainer}>
          <div
            className={c.arrowButton}
            onClick={() => decreaseSelectedVideoIndex()}
          >
            &lt;-
          </div>
          <div>
            {/* <p>{props.index}</p> */}
            {/* <p>{props.listings[props.index].data[0]["bestThumbnail"].url}</p> */}
            <img
              src={
                state.currentlySelectedVideoIndex != null
                  ? props.listings[props.index].data[
                      state.currentlySelectedVideoIndex
                    ]["bestThumbnail"].url
                  : ""
              }
              alt="image preview"
              className={c.previewImg}
            />
            <div className={c.videoDetailsContainer}>
              <h2 className={c.videoTitle}>
                {state.currentlySelectedVideoIndex != null
                  ? props.listings[props.index].data[
                      state.currentlySelectedVideoIndex
                    ]["title"]
                  : ""}
              </h2>
              <p className={c.duration}>
                <strong>Duration: &nbsp; </strong>
                {state.currentlySelectedVideoIndex != null
                  ? props.listings[props.index].data[
                      state.currentlySelectedVideoIndex
                    ]["duration"]
                  : ""}
              </p>
            </div>
            <div
              className={c.submitButton}
              onClick={() => submitHandler()}
            ></div>
          </div>

          <div
            className={c.arrowButton}
            onClick={() => increaseSelectedVideoIndex()}
          >
            -&gt;
          </div>
        </div>
      </div>

      {/* <p> */}
      {/*   {JSON.stringify( */}
      {/*     props.listings[props.index].data[state.currentlySelectedVideoIndex] */}
      {/*   )} */}
      {/* </p> */}
    </div>
  );
};

export default VideoSelectorPopup;
