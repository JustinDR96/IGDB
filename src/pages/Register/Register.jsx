import React from "react";
import Login from "../../components/Register/Login/Login";
import SignUp from "../../components/Register/SignUp/SignUp";

export default function Register() {
  return (
    <div className="Register-container">
      <div className="register-form">
        <Login />
        {/* <SignUp /> */}
      </div>

      <div className="register-image">
        <img src="/Images/register/img_register.jpg" alt="" />
      </div>
    </div>
  );
}
