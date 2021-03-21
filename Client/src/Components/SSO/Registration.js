import React, { useState } from "react";
import "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../Assets/Images/ReBuyLogo.png";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

export default function Registration() {
  const [registered, setRegistered] = useState(false);
  return (
    <div className="login">
      <div>
        <img src={logo} alt="logo" className="loginLogo" />
      </div>
      <div className="Form">
        {registered ? <LogIn /> : <SignUp setRegistered={setRegistered} />}
      </div>
    </div>
  );
}
