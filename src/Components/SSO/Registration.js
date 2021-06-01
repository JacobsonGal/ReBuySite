import React, { useState } from "react";
import "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../Assets/Images/ReBuy.png";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import Welcome from "./Welcome";

export default function Registration() {
  const [registered, setRegistered] = useState(false);
  const [welcomeDone, setWelcomeDone] = useState(false);
  return (
    <div className="login">
      <div>
        <img src={logo} alt="logo" className="loginLogo" />
      </div>
      {!welcomeDone ? (
        <div className="WelcomeForm">
          <Welcome setWelcomeDone={setWelcomeDone} />
        </div>
      ) : (
        <div className="Form">
          {registered ? (
            <LogIn setRegistered={setRegistered} />
          ) : (
            <SignUp setRegistered={setRegistered} />
          )}
        </div>
      )}
    </div>
  );
}
