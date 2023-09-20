import React, { useState } from "react";
import axios from "axios";
import { FormSVG, Lock } from "../SVG/index";
import Style from "./SignUp.module.css";
import { Notification } from "../index";

const SignUp = ({ setLogin, setSignup, notification, setNotification }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setUser({ ...user, [fieldName]: e.target.value });
  };

  const createAccount = async (e) => {
    e.preventDefault();
    if (
      user.email == "" ||
      user.password == "" ||
      user.passwordConfirm == "" ||
      user.name == ""
    ) {
      return setNotification("Please provide all the details");
    }
    setNotification("Wait creating account...");
    try {
      //api call
      const response = await axios({
        method: "POST",
        url: `/api/v1/user/signup`,
        withCredentials: true,
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          passwordConfirm: user.passwordConfirm,
        },
      });
      //console.log(response);
      if (response.data.status == "success") {
        setNotification("Account created successfully");
        localStorage.setItem("NFTApi Token", response.data.token);
        setSignup(false);
        setNotification("");
      } else {
        setNotification("Something went wrong,try again");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className={Style.card}>
        <div className={Style.card2}>
          <form className={Style.form}>
            <p id="heading" className={Style.heading}>
              Sign Up
            </p>
            <div className={Style.field}>
              <FormSVG styleClass={Style.input_icon} />
              <input
                type="text"
                className={Style.input_field}
                placeholder="name"
                autoComplete="off"
                onChange={(e) => handleFormFieldChange("name", e)}
              />
            </div>
            <div className={Style.field}>
              <FormSVG styleClass={Style.input_icon} />
              <input
                type="text"
                className={Style.input_field}
                placeholder="email"
                autoComplete="off"
                onChange={(e) => handleFormFieldChange("email", e)}
              />
            </div>
            <div className={Style.field}>
              <Lock styleClass={Style.input_icon} />
              <input
                type="text"
                className={Style.input_field}
                placeholder="Password"
                onChange={(e) => handleFormFieldChange("password", e)}
              />
            </div>
            <div className={Style.field}>
              <Lock styleClass={Style.input_icon} />
              <input
                type="text"
                className={Style.input_field}
                placeholder="PasswordConfirm"
                onChange={(e) => handleFormFieldChange("passwordConfirm", e)}
              />
            </div>

            <div className={Style.btn}>
              <button
                className={Style.button1}
                onClick={() => (setSignup(false), setLogin(true))}
              >
                Login
              </button>
              <button
                className={Style.button2}
                onClick={() => setSignup(false)}
              >
                Close
              </button>
            </div>
            <button className={Style.button3} onClick={(e) => createAccount(e)}>
              SignUp
            </button>
          </form>
        </div>
      </div>
      {notification != "" && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}
    </>
  );
};

export default SignUp;
