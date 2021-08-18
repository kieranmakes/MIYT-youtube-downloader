import React, { useState } from "react";
import c from "./VideoSelectorPopup.module.css";

const VideoSelectorPopup = (props) => {
  const [state, setState] = useState({});

  React.useEffect(() => {
    setState({});
  }, []);

  return (
    <div className={c.VideoSelectorPopup}>
      <div className={c.backdrop} onClick={props.hideBackdrop}></div>
      <div className={c.popupContent}>
        <h1>Video Selector</h1>
        <div className={c.videoSelectorContainer}>
          <div className={c.arrowButton}>&lt;-</div>
          <div>
            {/* <p>{props.index}</p> */}
            {/* <p>{props.listings[props.index].data[0]["bestThumbnail"].url}</p> */}
            <img
              src={props.listings[props.index].data[0]["bestThumbnail"].url}
              alt="image preview"
              className={c.previewImg}
            />

            <div className={c.videoDetailsContainer}>
              <h2 className={c.videoTitle}>
                {props.listings[props.index].data[0]["title"]}
              </h2>
              <p className={c.duration}>
                <strong>Duration: &nbsp; </strong>
                {props.listings[props.index].data[0]["duration"]}
              </p>
            </div>
            <div className={c.submitButton}></div>
          </div>

          <div className={c.arrowButton}> -&gt; </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSelectorPopup;
