import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./styles/style.css";
import Navbar from "./navbar";
import { Link } from 'react-router-dom';

const baseURL = "http://127.0.0.1:8000";

function Host_Dashboard() {
    return (
        <>
        <Navbar />
    
        <div className="container d-flex align-items-center justify-content-center" style={{minHeight: '100vh', height: '100%'}}>
            <div className="container">
                <div className="fs-2 fw-bold d-flex align-items-center justify-content-center">
                    <p className="main_title_host_pending_reservation">
                        Host Activites
                    </p>
                </div>
                <div className="row mb-4">
                    <div className="col-md-6" style={{ marginTop: '20px'}}>
                        <div className="card">
                            <div className="card-body">
                            <h5 className="card-title">Pending Reservation Requests</h5>
                            <p className="card-text">
                                Approve or deny reservation requests made for your properties.
                            </p>
                            <Link to="/host_pending">
                                <input
                                class="btn btn-success w-100 fw-semibold button_format_sign_up save_button_profile"
                                type=""
                                value="Manage"
                                />
                            </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6" style={{ marginTop: '20px'}}>
                        <div className="card">
                            <div className="card-body">
                            <h5 className="card-title">Cancellation Requests</h5>
                            <p className="card-text">
                                Approve or deny cancellation requests on approved reservations.
                            </p>
                            <Link to="/host_cancellation">
                                <input
                                class="btn btn-success w-100 fw-semibold button_format_sign_up save_button_profile"
                                type=""
                                value="Manage"
                                />
                            </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mb-4">
                    <div class="col-md-6" style={{ marginTop: '20px'}}>
                    <div class="card">
                        <div class="card-body">
                        <h5 class="card-title">Existing Reservations</h5>
                        <p class="card-text">
                            View all upcoming approved reservations at your properties.
                        </p>
                        <Link to="/host_existing">
                            <input
                            class="btn btn-success w-100 fw-semibold button_format_sign_up save_button_profile"
                            type=""
                            value="View"
                            />
                        </Link>
                        </div>
                    </div>
                    </div>
                <div class="col-md-6" style={{ marginTop: '20px'}}>
                <div class="card">
                    <div class="card-body">
                    <h5 class="card-title">Completed Reservations</h5>
                    <p class="card-text">
                        View all completed reservations at your properties. (past stays)
                    </p>
                    <Link to="/host_completed">
                        <input
                        class="btn btn-success w-100 fw-semibold button_format_sign_up save_button_profile"
                        type=""
                        value="View"
                        />
                    </Link>
                    </div>
                </div>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-md-6">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Manage My Properties</h5>
                      <p class="card-text">
                        Add new properties to my account or edit existing properties.
                      </p>
                      <Link to="/host_properties">
                        <input
                          class="btn btn-success w-100 fw-semibold button_format_sign_up save_button_profile"
                          type=""
                          value="Manage"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">My Stays</h5>
                      <p class="card-text">
                        View past, present and pending reservations and request cancellations.
                      </p>
                      <Link to="/dashboard">
                        <input
                          class="btn btn-success w-100 fw-semibold button_format_sign_up save_button_profile"
                          type=""
                          value="Manage"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              
            </div>
            </div>
        </div>
        
        </>
    )
}

export default Host_Dashboard;