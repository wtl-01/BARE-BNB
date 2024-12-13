import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./styles/style.css";
import Navbar from "./navbar";
import { getToken, isAuthenticated } from "../js/AuthSvc";
import { NormalAlert } from "../js/AlertSvc";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const baseURL = "http://127.0.0.1:8000";

function ProfilePicture() {
  const accessToken = getToken();
  const [avatar, setAvatar] = useState("");
  const [selected_file, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleEditAvatar = () => {
    // make call to backend
    const formData = new FormData();
    if (!selected_file) {
      console.log("File uploaded is null");
    } else {
      console.log("This is file uploaded", selected_file);
    }
    formData.set("avatar", selected_file);

    fetch(`${baseURL}/users/editProfile/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          toast.error("Failed to upload profile picture.  Please try again.");
          throw new Error("Editing profile picture failed");
        } else {
          toast.success("Profile Picture updated successfully!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBackButton = () => {
    navigate("/myProfile");
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
    <main>
      <Navbar />
      <div className="cream-bg">
        <div
          className="container d-flex align-items-center"
          style={{ minHeight: "100vh", height: "100%" }}
        >
          <div className="row justify-content-evenly">
            <div className="col-lg-6">
              <div className="card">
                <div className="row g-0">
                  <div className="col-6 col-md-5 d-flex align-items-center justify-content-center">
                    <div>
                      {avatar ? (
                        <img
                          className="image_profile"
                          src={avatar}
                          alt="Avatar"
                        />
                      ) : (
                        <img
                          className="image_profile"
                          src={require("./avatar.png")}
                          alt="Avatar"
                        />
                      )}
                    </div>
                  </div>
                  <div className="col-6 col-md-7">
                    <div className="card-body d-flex flex-column">
                      <div className="h-100">
                        <h1 className="card-title">Profile Photo</h1>
                        <p className="card-text">
                          A profile photo that shows your face can help other
                          hosts and guests get to know you. If you’re a guest, a
                          host won't be able to see it until your booking is
                          confirmed.
                        </p>
                        <input
                          className="borderAttachment"
                          type="file"
                          name="attachments"
                          required
                          onChange={handleFileChange}
                        />
                        <input
                          className="btn btn-success w-50 fw-semibold button_format_sign_up save_button_profile"
                          type="submit"
                          value="Upload File"
                          onClick={handleEditAvatar}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a>
                <input
                  className="btn btn-success fw-semibold button_format_sign_in"
                  value="Go back"
                  id="back_button_update_photo"
                  onClick={handleBackButton}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProfilePicture;
