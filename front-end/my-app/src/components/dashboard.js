import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./styles/style.css";
import Navbar from "./navbar";
import { Link } from 'react-router-dom';

function Dashboard() {
    return (
        <>
        <Navbar />
    
        <div className="container d-flex align-items-center justify-content-center" style={{minHeight: '100vh', height: '100%'}}>
            <div className="container">
                <div className="fs-2 fw-bold d-flex align-items-center justify-content-center">
                    <p className="main_title_host_pending_reservation">
                        Personal Activities
                    </p>
                </div>
                <div className="row mb-4">
                    <div className="col-md-6" style={{ marginTop: '20px'}}>
                        <div className="card">
                            <div className="card-body">
                            <h5 className="card-title">Pending Reservation Requests</h5>
                            <p className="card-text">
                                View or cancel pending reservation requests for upcoming
                                stays.
                            </p>
                            <Link to="/user_pending">
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
                            <h5 className="card-title">Present Reservations</h5>
                            <p className="card-text">
                                View or request cancellation for upcoming approved
                                reservations.
                            </p>
                            <Link to="/user_present">
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
                        <h5 class="card-title">Terminated Reservations</h5>
                        <p class="card-text">
                            View and review terminated reservations (cancelled by the
                            host).
                        </p>
                        <Link to="/user_terminated">
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
                        View all completed reservations (past stays) and leave
                        review.
                    </p>
                    <Link to="/user_completed">
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
              <div class="container d-flex justify-content-center">
                <div class="col-md-6">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Host Activities</h5>
                      <p class="card-text">
                        Manage customer requests and manage my properties.
                      </p>
                      <Link to="/host_dashboard">
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
        </div>
        
        </>
    )
}

export default Dashboard;
