import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./styles/style.css";
import Navbar from "./navbar";
import { getToken, isAuthenticated } from "../js/AuthSvc";
import { NormalAlert } from "../js/AlertSvc";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseURL = "http://127.0.0.1:8000";

const BookingCard = ({ comment, rating, reviewer }) => {
  const accessToken = getToken();
  const [reviewer_data, setReviewerData] = useState([]);

  useEffect(() => {
    fetchReviewerData();
  }, []);

  const fetchReviewerData = async () => {
    console.log("This is reviewer id:", reviewer);
    const response2 = await fetch(`${baseURL}/users/viewProfile/${reviewer}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }).catch((err) => {
      console.log("Error querying reviewer data: ", err);
    });
    const reviewer_data_response = await response2.json();
    setReviewerData(reviewer_data_response);
  };

  const icons = [];
  for (let i = 0; i < rating; i++) {
    icons.push(<FontAwesomeIcon icon={faStar} key={i} />);
  }

  return (
    <div class="row ml-2">
      <div class="container d-flex align-items-center justify-content-start">
        {reviewer_data.avatar ? (
          <img
            className="customer_viewable_profile_host_pics"
            src={`${baseURL}${reviewer_data.avatar}`}
            alt="Avatar"
          />
        ) : (
          <img
            className="customer_viewable_profile_host_pics"
            src={require("./avatar.png")}
            alt="Avatar"
          />
        )}

        <span class="ml-2">
          {" "}
          {reviewer_data.first_name + " " + reviewer_data.last_name}{" "}
        </span>
      </div>
      <div>{icons}</div>
      <div class="mt-2">{comment}</div>
    </div>
  );
};

function PublicProfile() {
  const [user_data, setUserData] = useState([]);
  const { id } = useParams();
  const accessToken = getToken();
  const [avatar, setAvatar] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [num_pages, setNumPages] = useState(1);

  const [comment, setCommentText] = useState("");
  const [rating, setRatingNum] = useState("");

  const handleCommentChange = (event) => setCommentText(event.target.value);
  const handleRatingChange = (event) => setRatingNum(event.target.value);

  // fetch user info first
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    fetch(`${baseURL}/users/viewProfile/${id}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        setAvatar(data.avatar);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchReviewData().catch((error) => {
      console.error(`Error fetching review data: ${error}`);
    });
  }, [currentPage]);

  console.log("Current page", currentPage);

  const fetchReviewData = async () => {
    const response1 = await fetch(
      `${baseURL}/users/guests/${id}/?page=${currentPage}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    ).catch((err) => {
      console.log("Error querying review data: ", err);
    });
    const data = await response1.json();
    setData(data.results);
    setNumPages(Math.ceil(data.count / 5));
    console.log("This is data", data);
    console.log("This is num pages", num_pages);
  };

  const handleNextClick = (e) => {
    e.stopPropagation();
    if (currentPage < num_pages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevClick = (e) => {
    e.stopPropagation();
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleSubmission = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const requestData = {
      comment_text: formData.get("comment"),
      rating_num: formData.get("rating"),
    };

    fetch(`${baseURL}/users/guests/${id}/review/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          toast.error(
            "Comment and Rating is not successful. Please try again or review if you have permission to review."
          );
          throw new Error(response.statusText);
        } else {
          toast.success(
            "Comment and Rating has been posted successfully. Please refresh the page to see changes."
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      <div
        className="container d-flex align-items-center justify-content-center"
        style={{ "min-height": "100vh", height: "100%" }}
      >
        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <div className="container">
              <div className="fs-1 fw-bold">Personal Info</div>

              <div className="card">
                <div className="card-body">
                  <div className="img_profile_container">
                    {avatar ? (
                      <img
                        className="image_profile"
                        src={`${baseURL}${user_data.avatar}`}
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

                  <div className="Legal_name_container">
                    <p className="fs-5 legal_name_profile">Legal Name</p>
                    <p className="actual_legal_name_profile">
                      {user_data.first_name + " " + user_data.last_name}
                    </p>
                  </div>

                  <hr />

                  <div className="email_address_container">
                    <p className="fs-5">Email Address</p>
                    <p className="email_profile">{user_data.email}</p>
                  </div>
                  <hr />

                  <div className="phone_number_container">
                    <p className="fs-5">Phone Number</p>
                    <p className="phone_number_profile">************</p>
                    <p>Not available to the public</p>
                  </div>
                </div>
              </div>
              <div className="fs-5 fw-bold">Leave Review</div>
              <div className="card">
                <div className="card-body">
                  <form action="" onSubmit={handleSubmission}>
                    <div className="form-group">
                      <input
                        className="form-control fs-6 fw-semibold"
                        type="text"
                        id="comment"
                        placeholder="Comment"
                        value={comment}
                        onChange={handleCommentChange}
                        name="comment"
                        required
                      />
                    </div>

                    <br />

                    <div className="form-group">
                      <input
                        className="form-control fs-6 fw-semibold"
                        type="number"
                        id="rating"
                        placeholder="Rating"
                        value={rating}
                        onChange={handleRatingChange}
                        name="rating"
                        required
                      />
                    </div>

                    <br />
                    <br />

                    <input
                      className="btn btn-success w-100 fw-semibold button_format_sign_in"
                      type="submit"
                      value="Submit Review"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <div className="container">
              <div className="container d-flex align-items-center justify-content-between">
                <div className="fs-2 fw-bold">Reviews by hosts</div>
              </div>

              <hr />

              <div className="container d-flex align-items-center justify-content-center">
                <div className="card-deck w-75">
                  {data.map((review) => (
                    <BookingCard
                      comment={review.comment_text}
                      rating={review.rating_num}
                      reviewer={review.reviewer}
                    />
                  ))}
                  <div className="fw-bold d-flex align-items-center justify-content-between">
                    <button
                      type="button"
                      className="btn btn-secondary fw-semibold mb-2 button_format_sign_in"
                      onClick={handlePrevClick}
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary fw-semibold mb-2 button_format_sign_in"
                      onClick={handleNextClick}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PublicProfile;
