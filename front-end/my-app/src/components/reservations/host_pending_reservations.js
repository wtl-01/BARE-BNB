import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Navbar from "../navbar";
import { getToken, isAuthenticated } from "../../js/AuthSvc";
import "../styles/style.css";
import { NormalAlert } from "../../js/AlertSvc";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseURL = "http://127.0.0.1:8000";

const BookingCard = ({
  start_date,
  end_date,
  billing_address_string,
  billing_address_city,
  billing_address_country,
  billing_address_province,
  billing_address_postal_code,
  property_id,
  invoice_cost,
  booking_id,
  client,
}) => {
  const accessToken = getToken();
  const [property_data, setPropertyData] = useState([]);
  const [client_data, setClientData] = useState([]);
  const navigate = useNavigate();
  const [approve_button, setApproveButtonDisplay] = useState("Approve");
  const [decline_button, setDeclineButtonDisplay] = useState("Decline");
  const [approve_button_disable, setApproveButtonDisable] = useState(false);
  const [decline_button_disable, setDeclineButtonDisable] = useState(false);

  useEffect(() => {
    fetchPropertyData();
  }, []);

  useEffect(() => {
    fetchClientData();
  }, [property_data]);

  const fetchPropertyData = async () => {
    const response = await fetch(`${baseURL}/properties/${property_id}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }).catch((err) => {
      console.log("Error querying property data: ", err);
    });
    const property_data_response = await response.json();
    setPropertyData(property_data_response);
  };

  const fetchClientData = async () => {
    console.log("This is client id:", client);
    const response2 = await fetch(`${baseURL}/users/viewProfile/${client}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }).catch((err) => {
      console.log("Error querying client data: ", err);
    });
    const client_data_response = await response2.json();
    setClientData(client_data_response);
  };

  const handleViewProperty = () => {
    navigate(`/property/${property_id}`);
  };

  const handleUserPublicProfile = () => {
    navigate(`/public_profile/${client}`);
  };

  const handleApproval = () => {
    try {
      const requestData = {
        pk: booking_id,
        client: client,
        property_booking: property_id,
        billing_address_string: billing_address_string,
        billing_address_city: billing_address_city,
        billing_address_country: billing_address_country,
        billing_address_province: billing_address_province,
        billing_address_postal_code: billing_address_postal_code,
        start_date: start_date,
        end_date: end_date,
        invoice_cost: invoice_cost,
        state: "Approved",
      };

      fetch(`${baseURL}/bookings/${booking_id}/edit/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          } else {
            console.log("Success");
            toast.success(
              "Reservation has been approved successfully. Please refresh the page to see changes."
            );
            setApproveButtonDisplay("Approved");
            setDeclineButtonDisable(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDecline = () => {
    try {
      const requestData = {
        pk: booking_id,
        client: client,
        property_booking: property_id,
        billing_address_string: billing_address_string,
        billing_address_city: billing_address_city,
        billing_address_country: billing_address_country,
        billing_address_province: billing_address_province,
        billing_address_postal_code: billing_address_postal_code,
        start_date: start_date,
        end_date: end_date,
        invoice_cost: invoice_cost,
        state: "Denied",
      };

      fetch(`${baseURL}/bookings/${booking_id}/edit/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          } else {
            console.log("Success");
            toast.success(
              "Reservation has been denied successfully. Please refresh the page to see changes."
            );
            setDeclineButtonDisplay("Declined");
            setApproveButtonDisable(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card w-100 mb-4">
      <div className="card-body d-flex justify-content-between">
        <div>
          <h5 className="card-title font-weight-bold reservation_card_title">
            {property_data.name}
          </h5>
          <h6 className="reservation_card_location">
            Location: {property_data.address_city},{" "}
            {property_data.address_country}
          </h6>
          <a
            className="fw-semibold host_pending_reservation_view_property_link"
            onClick={handleViewProperty}
          >
            View property
          </a>
          <details className="mt-2 host_pending_reservation_details">
            <summary className="fw-semibold text-decoration-underline host_pending_reservation_summary">
              See details
            </summary>
            <ul className="list-group">
              <li className="list-group-item">
                Customer Name:{" "}
                {client_data.first_name + " " + client_data.last_name}
                <a
                  className="fw-semibold host_pending_reservation_customer_profile_link"
                  onClick={handleUserPublicProfile}
                >
                  <FontAwesomeIcon icon={faUser} />
                </a>
              </li>
              <li className="list-group-item">
                Dates requested: {start_date} - {end_date}
              </li>
              <li className="list-group-item">Invoice Fee: ${invoice_cost}</li>
            </ul>
          </details>
        </div>
        <div>
          <button
            href="#"
            className="btn btn-primary host_reservation_request_button_approve"
            id="host_existing_reservation_btn_decline1"
            style={{ padding: "8px", margin: "3px" }}
            onClick={handleApproval}
            disabled={approve_button_disable}
          >
            {approve_button}
          </button>
          <button
            href="#"
            className="btn btn-primary host_reservation_request_button_decline"
            id="host_existing_reservation_btn_decline1"
            style={{ padding: "8px", margin: "3px" }}
            onClick={handleDecline}
            disabled={decline_button_disable}
          >
            {decline_button}
          </button>
        </div>
      </div>
    </div>
  );
};

function HostPending() {
  // fetch data first
  const accessToken = getToken();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [num_pages, setNumPages] = useState(1);

  useEffect(() => {
    fetchData().catch((error) => {
      console.error(`Error fetching bookings: ${error}`);
    });
  }, [currentPage]);

  console.log("Current page", currentPage);

  const fetchData = async () => {
    const response1 = await fetch(
      `${baseURL}/bookings/?type=host&state=Pending&page=${currentPage}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    ).catch((err) => {
      console.log("Error querying booking data: ", err);
    });
    const data = await response1.json();
    setData(data.results);
    setNumPages(Math.ceil(data.count / 5));
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
          className="container d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh", height: "100%" }}
        >
          <div className="container">
            <div className="fs-2 fw-bold d-flex align-items-center justify-content-evenly">
              <p className="main_title_host_pending_reservation">
                Pending Reservation Requests
              </p>
            </div>
            <div className="container d-flex align-items-center justify-content-center">
              <div className="card-deck w-75">
                {data.map((booking) => (
                  <BookingCard
                    start_date={booking.start_date}
                    end_date={booking.end_date}
                    billing_address_string={booking.billing_address_string}
                    billing_address_city={booking.billing_address_city}
                    billing_address_country={booking.billing_address_country}
                    billing_address_province={booking.billing_address_province}
                    billing_address_postal_code={
                      booking.billing_address_postal_code
                    }
                    property_id={booking.property_booking}
                    invoice_cost={booking.invoice_cost}
                    booking_id={booking.pk}
                    client={booking.client}
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
      </main>
    </>
  );
}

export default HostPending;
