import React from "react";
import Style from "./Button.module.css";
const Button = ({ disconnect, connect, address, file }) => {
  return (
    <>
      {address ? (
        <button onClick={() => disconnect()} className={Style.button}>
          <span className={Style.button_content}>
            {" "}
            {file ? "Upload" : "Disconnect"}{" "}
          </span>
        </button>
      ) : (
        <button onClick={() => connect()} className={Style.button}>
          <span className={Style.button_content}>Connect </span>
        </button>
      )}
    </>
  );
};

export default Button;
