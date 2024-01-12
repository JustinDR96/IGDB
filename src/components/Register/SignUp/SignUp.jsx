import React from "react";

export default function SignUp() {
  return (
    <div className="form-container">
      <h1>Register</h1>
      <form className="form-signUp">
        <div className="username">
          <input type="text" id="username" placeholder="Username" />
        </div>

        <div className="email">
          <input type="email" id="email" placeholder="Email" />
        </div>

        <div className="password">
          <input type="password" id="password" placeholder="Password" />

          <input
            type="password"
            id="password2"
            placeholder="Confirm Password"
          />
        </div>

        <div className="submit-link">
          <button type="submit">Submit</button>
          <a href="">Already have an account ?</a>
        </div>
      </form>
    </div>
  );
}
