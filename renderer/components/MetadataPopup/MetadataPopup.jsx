import React, { useState } from "react";
import c from "./MetadataPopup.module.css";

const MetadataPopup = (props) => {
  const [state, setState] = useState({
    metadata: {
      trackTitle: "",
      artist: "",
      genre: "",
    },
  });

  React.useEffect(() => {
    setState({
      ...state,
      metadata: props.metadata[props.index],
    });
  }, []);

  return (
    <div className={c.metadataPopup}>
      <div className={c.backdrop} onClick={props.hideBackdrop}></div>
      <div className={c.popupContent}>
        <h1>Track Metadata</h1>
        <div className={c.metadataContainer}>
          <div className={c.input}>
            {/* <p>{JSON.stringify(props)}</p> */}
            <label htmlFor="trackTitle" className={c.trackTitleLabel}>
              Track Title
            </label>
            <input
              type="text"
              className={c.textInput}
              id="trackTitle"
              onChange={(e) =>
                setState({
                  ...state,
                  metadata: { ...state.metadata, trackTitle: e.target.value },
                })
              }
              value={state.metadata.trackTitle}
            />
          </div>
          <div className={c.input}>
            <label htmlFor="artist" className={c.trackTitleLabel}>
              Artist
            </label>
            <input
              type="text"
              className={c.textInput}
              id="artist"
              onChange={(e) =>
                setState({
                  ...state,
                  metadata: { ...state.metadata, artist: e.target.value },
                })
              }
              value={state.metadata.artist}
            />
          </div>
          <div className={c.input}>
            <label htmlFor="genre" className={c.trackTitleLabel}>
              Genre
            </label>
            <input
              type="text"
              className={c.textInput}
              id="genre"
              onChange={(e) =>
                setState({
                  ...state,
                  metadata: { ...state.metadata, genre: e.target.value },
                })
              }
              value={state.metadata.genre}
            />
          </div>
          <div
            className={c.submitButton}
            onClick={() => props.submitMetadata(state.metadata)}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MetadataPopup;
