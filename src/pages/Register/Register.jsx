import React, { useState } from "react";
import Login from "../../components/Register/Login/Login";
import SignUp from "../../components/Register/SignUp/SignUp";

export default function Register() {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className="Register-container">
      <div className="register-form">
        {showSignUp ? (
          <SignUp />
        ) : (
          <Login onNeedAccountClick={() => setShowSignUp(true)} />
        )}
      </div>

      <div className="register-image">
        <img src="/Images/register/img_register.jpg" alt="" />
      </div>
    </div>
  );
}
