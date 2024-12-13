import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./styles/style.css";
import { getToken, isAuthenticated } from "../js/AuthSvc";
import Navbar from "./navbar";
import { NormalAlert } from "../js/AlertSvc";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const baseURL = "http://127.0.0.1:8000";

function PrivateProfile() {
  const accessToken = getToken();
  const navigate = useNavigate();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEditName = () => {
    // make call to backend
    const requestData = {
      first_name: first_name,
      last_name: last_name,
    };

    fetch(`${baseURL}/users/editProfile/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          toast.error("Failed to update legal name.  Please try again.");
          throw new Error("Editing legal name failed");
        } else {
          toast.success("Legal Name updated successfully!");
          setFirstName(first_name);
          setLastName(last_name);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditEmail = () => {
    // make call to backend

    const requestData = {
      email: email,
    };

    fetch(`${baseURL}/users/editProfile/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          toast.error("Failed to update email. Please try again.");
          throw new Error("Editing email failed");
        } else {
          toast.success("Email updated successfully!");
          setEmail(email);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditPhoneNumber = () => {
    // make call to backend
    const requestData = {
      phone_number: phone_number,
    };

    fetch(`${baseURL}/users/editProfile/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          toast.success("Failed to update phone number. Please try again.");
          throw new Error("Editing phone number failed");
        } else {
          setPhoneNumber(phone_number);
          toast.success("Phone number updated successfully!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditPassword = () => {
    // make call to backend
    const requestData = {
      password: password,
    };

    fetch(`${baseURL}/users/editProfile/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          toast.success("Failed to update password. Please try again.");
          throw new Error("Editing password failed");
        } else {
          setPhoneNumber(phone_number);
          toast.success("Password updated successfully!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdatePicture = () => {
    navigate("/editProfilePicture");
  };

  useEffect(() => {
    async function fetchData() {
      fetch(`${baseURL}/users/viewMyProfile/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setEmail(data.email);
          setPhoneNumber(data.phone_number);
          setPassword(data.password);
          setAvatar(data.avatar);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, []);

  const authenticated = isAuthenticated();
  if (!authenticated) {
    return NormalAlert(
      5,
      "Access Denied",
      "You are trying to access a page that requires you to login. You will be logged out and redirected to the Sign-in page."
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <div
          className="container d-flex align-items-center justify-content-center col-sm-6 col-md-6 col-lg-5"
          style={{ minHeight: "100vh", height: "100%" }}
        >
          <div className="container">
            <div className="fs-1 fw-bold">Personal Info</div>

            <div className="card">
              <div className="card-body">
                <div className="img_profile_container">
                  {avatar ? (
                    <img className="image_profile" src={avatar} alt="Avatar" />
                  ) : (
                    <img
                      className="image_profile"
                      src={require("./avatar.png")}
                      alt="Avatar"
                    />
                  )}
                </div>
                <div className="text-center update_profile_picture">
                  <a
                    className="update_profile_picture_link"
                    onClick={handleUpdatePicture}
                  >
                    Update photo
                  </a>
                </div>

                <div className="Legal_name_container">
                  <p className="fs-5 legal_name_profile">Legal Name</p>
                  <p className="actual_legal_name_profile">
                    {first_name + " " + last_name}
                  </p>
                  <details className="text-end">
                    <summary className="fw-semibold text-decoration-underline legal_name_summary">
                      Edit
                    </summary>
                    <input
                      className="form-control fs-6 fw-semibold"
                      type="text"
                      id=""
                      placeholder="First name"
                      required
                      onChange={handleFirstNameChange}
                    />
                    <input
                      className="form-control fs-6 fw-semibold"
                      type="text"
                      id=""
                      placeholder="Last name"
                      required
                      onChange={handleLastNameChange}
                    />
                    <input
                      className="btn btn-success w-100 fw-semibold button_format_sign_up save_button_profile"
                      type="submit"
                      value="Save"
                      onClick={handleEditName}
                    />
                  </details>
                </div>

                <hr />

                <div className="email_address_container">
                  <p className="fs-5">Email Address</p>
                  <p className="email_profile">{email}</p>

                  <details className="text-end">
                    <summary className="fw-semibold text-decoration-underline email_address_summary">
                      Edit
                    </summary>
                    <input
                      className="form-control fs-6 fw-semibold"
                      type="text"
                      id=""
                      placeholder="Email Address"
                      required
                      onChange={handleEmailChange}
                    />
                    <input
                      className="btn btn-success w-100 fw-semibold button_format_sign_up save_button_profile"
                      type="submit"
                      value="Save"
                      onClick={handleEditEmail}
                    />
                  </details>
                </div>
                <hr />

                <div className="phone_number_container">
                  <p className="fs-5">Phone Number</p>
                  <p className="phone_number_profile">{phone_number}</p>

                  <details className="text-end">
                    <summary className="fw-semibold text-decoration-underline phone_number_summary">
                      Edit
                    </summary>
                    <input
                      className="form-control fs-6 fw-semibold"
                      type="text"
                      id=""
                      placeholder="Phone number"
                      required
                      onChange={handlePhoneNumberChange}
                    />
                    <input
                      className="btn btn-success w-100 fw-semibold button_format_sign_up save_button_profile"
                      type="submit"
                      value="Save"
                      onClick={handleEditPhoneNumber}
                    />
                  </details>
                </div>
                <hr />

                <div className="phone_number_container">
                  <p className="fs-5">Password</p>
                  <p className="phone_number_profile">***********</p>
                  <details className="text-end">
                    <summary className="fw-semibold text-decoration-underline phone_number_summary">
                      Edit
                    </summary>
                    <input
                      className="form-control fs-6 fw-semibold"
                      type="text"
                      id=""
                      placeholder="***********"
                      required
                      onChange={handlePasswordChange}
                    />
                    <input
                      className="btn btn-success w-100 fw-semibold button_format_sign_up save_button_profile"
                      type="submit"
                      value="Save"
                      onClick={handleEditPassword}
                    />
                  </details>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default PrivateProfile;
