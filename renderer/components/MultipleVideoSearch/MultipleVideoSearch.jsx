import React from "react";
import classes from "./MultipleVideoSearch.module.css";

const MultipleVideoSearch = (props) => {
  const [state, setState] = React.useState({
    textAreaContent: "",
  });

  React.useEffect(() => {
    const data = localStorage.getItem("multipleVideoSearch-state");
    if (data) {
      setState(JSON.parse(data));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("multipleVideoSearch-state", JSON.stringify(state));
  });

  const submitHandler = () => {
    if (state.textAreaContent.length > 0) {
      props.submitHandler(state.textAreaContent);
    }
  };

  return (
    <div className={classes.multipleVideoSearch}>
      <img
        className={classes.logo}
        draggable="false"
        src="../assets/logo.svg"
        alt="MIYT"
      />

      <textarea
        className={classes.textArea}
        onChange={(e) => {
          setState({ ...state, textAreaContent: e.target.value });
        }}
        placeholder="Enter one or more names/ urls of videos you would like to download. &#10;Seperate videos with a new line"
        cols="30"
        rows="10"
        value={state.textAreaContent}
      ></textarea>

      <div className={classes.submit} onClick={() => submitHandler()}></div>
    </div>
  );
};

export default MultipleVideoSearch;
