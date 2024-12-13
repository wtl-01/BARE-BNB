import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./styles/style.css";
import { useNavigate } from "react-router-dom";

const baseURL = "http://127.0.0.1:8000";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const navigate = useNavigate();

  const handleSubmission = (event) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.target);

      const requestData = {
        email: formData.get("email"),
        password: formData.get("password"),
      };

      fetch(`${baseURL}/users/login/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          const token = data.access;

          // Store the access token in local storage
          localStorage.setItem("accessToken", token);
          localStorage.setItem("username", email);
          localStorage.setItem("isAuthenticated", true);

          navigate("/myProfile");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <div className="needs-validation col-md-4 offset-md-4 signin_container border border-secondary">
        <div>
          <h1>Welcome back to Restify</h1>
        </div>

        <br />
        <form action="" onSubmit={handleSubmission}>
          <div className="form-group">
            <input
              className="form-control fs-6 fw-semibold"
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              name="email"
              required
            />
          </div>

          <br />

          <div className="form-group">
            <input
              className="form-control fs-6 fw-semibold"
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              name="password"
              required
            />
          </div>

          <br />
          <br />

          <div>
            <p>
              By selecting <b>Agree and continue</b>, I acknowledge Restify's
              <a href="privacy_policy.html">Privacy Policy</a>.
            </p>
          </div>

          <input
            className="btn btn-success w-100 fw-semibold button_format_sign_in"
            type="submit"
            value="Agree and continue"
          />
        </form>
      </div>
    </main>
  );
}

export default SignInForm;
