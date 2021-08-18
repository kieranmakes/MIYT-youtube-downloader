import React from "react";
import classes from "./StartScreen.module.css";

const StartScreen = (props) => {
  const [state, setState] = React.useState({
    inputData: "",
  });

  const submitHandler = () => {
    if (state.inputData.length > 0) {
      props.submitHandler(state.inputData);
    }
  };

  return (
    <div className={classes.startScreen}>
      <img
        id="logo"
        draggable="false"
        className={classes.logo}
        src="/assets/logo.svg"
        alt="MIYT"
      />

      <div className={classes.form}>
        <input
          type="text"
          onChange={(e) => setState({ ...state, inputData: e.target.value })}
          className={classes.input}
          placeholder="Search by name or url..."
        />
        <div className={classes.submit} onClick={() => submitHandler()}></div>
      </div>
      <p
        className={classes.multipleVideosLink}
        onClick={props.multipleVideoSearchClicked()}
      >
        Search multiple videos &nbsp; 🌐
      </p>
    </div>
  );
};

export default StartScreen;
