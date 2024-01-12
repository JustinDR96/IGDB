import React from "react";

export default function Login() {
  return (
    <div className="form-container">
      <h1>Sign In</h1>
      <form className="form-login">
        <div className="username">
          <input type="text" id="username" placeholder="Username..." />
        </div>

        <div className="password">
          <input type="password" id="password" placeholder="Password..." />
        </div>

        <div className="submit-link">
          <button type="submit">Se connecter</button>
          <a href="">Need account ?</a>
        </div>
      </form>
    </div>
  );
}
