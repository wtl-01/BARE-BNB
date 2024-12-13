import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./styles/style.css";
import { useNavigate } from "react-router-dom";

const baseURL = "http://127.0.0.1:8000";

function SignUpForm() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleFirstNameChange = (event) => setFirstName(event.target.value);
  const handleLastNameChange = (event) => setLastName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePhoneNumberChange = (event) => setPhoneNumber(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const navigate = useNavigate();

  const handleSubmission = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const requestData = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      phone_number: formData.get("phone_number"),
      email: formData.get("email"),
      password: formData.get("password"),
      is_host: false,
    };

    fetch(`${baseURL}/users/signup/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        } else {
          navigate("/signIn");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main>
      <div className="needs-validation col-md-4 offset-md-4 signup_container border border-secondary">
        <div>
          <h1>Welcome to Restify</h1>
        </div>

        <br />

        <form action="" onSubmit={handleSubmission}>
          <div className="form-group">
            <input
              className="form-control fs-6 fw-semibold"
              type="text"
              id="first_name"
              placeholder="First name"
              value={first_name}
              onChange={handleFirstNameChange}
              name="first_name"
              required
            />
          </div>

          <div className="form-group">
            <input
              className="form-control .fs-2 fw-semibold"
              type="text"
              id="last_name"
              placeholder="Last name"
              value={last_name}
              onChange={handleLastNameChange}
              name="last_name"
              required
            />
          </div>

          <div className="fw-light">
            <p>Make sure it matches the name on your government ID.</p>
          </div>

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

          <div className="fw-light">
            <p>We'll email you trip confirmations and receipts.</p>
          </div>

          <div className="form-group">
            <input
              className="form-control fs-6 fw-semibold"
              type="tel"
              id="phone_number"
              placeholder="Phone number"
              value={phone_number}
              onChange={handlePhoneNumberChange}
              name="phone_number"
              required
            />
          </div>

          <div className="fw-light">
            <p>
              We'll call or text you to confirm your number. Standard message
              and data raters apply.
              <a href="privacy_policy.html">Privacy Policy</a>.
            </p>
          </div>

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
            className="btn btn-success w-100 fw-semibold button_format_sign_up"
            type="submit"
            value="Agree and continue"
          />
        </form>
      </div>
    </main>
  );
}

export default SignUpForm;
