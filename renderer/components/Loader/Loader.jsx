import React from "react";
import { ipcRenderer } from "electron";
import classes from "./Loader.module.css";

const Loader = (props) => {
  return (
    <div>
      <div className={classes.Loader}>
        <img
          className={classes.logo}
          draggable="false"
          src="../assets/logo.svg"
          alt="MIYT"
        />
      </div>
    </div>
  );
};

export default Loader;
