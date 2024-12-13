import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {useNavigate, useParams} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./styles/style.css";

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";


import * as AlertSvc from "../js/AlertSvc.js"
import * as AuthSvc from "../js/AuthSvc.js"

import HostProperties from "./reservations/host_manage_property";
import PropertyCard from "./property_tab";

const baseURL = "http://127.0.0.1:8000";

const BookProperty = () => {

    const navigate = useNavigate();

    const location = useLocation();

    const params = useParams();

    const formValidation =
        (function () {
            // Bootstrap provided starter code
            //
            'use strict';
            window.addEventListener('load', function () {
                var forms = document.getElementsByClassName('bookingform');
                var validation = Array.prototype.filter.call(forms, function (form) {
                    form.addEventListener('submit', function (event) {
                        if (form.checkValidity() === false) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        form.classList.add('was-validated');
                    }, false);
                });
            }, false);
        });


    function reducer(state, action) {
        switch (action.type) {
            case 'reset': {
                return {
                };
            }
            case 'b': {

            }
        }
        throw Error('Unknown action: ' + action.type);
    }

    const [submitting, setSubmitting] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);


    const [email, setEmail] = useState("");
    const [phoneNumberValue, setPhoneNumberValue] = useState("");
    const [preferredContact, setPreferredContact] = useState("email");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [country, setCountry] = useState("");
    const [postal, setPostal] = useState("");


    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePreferredContactChange = (event) => setPreferredContact(event.target.value);
    const handleFirstNameChange = (event) => setFirstName(event.target.value);
    const handleLastNameChange = (event) => setLastName(event.target.value);

    const handleAddressChange = (event) => setAddress(event.target.value);

    const handleCityChange= (event) => setCity(event.target.value);

    const handleProvinceChange = (event) => setProvince(event.target.value);

    const handleCountryChange = (event) => setCountry(event.target.value);

    const handlePostalChange= (event) => setPostal(event.target.value);

    var {  id, from, to, price} = params;
    var finalprice = 0;

    var date1 = new Date(from);
    var date2 = new Date(to);
    var numdiff = Math.floor((date2 - date1) / (1000*60*60*24))

    finalprice = numdiff * price

    const handleSubmit = event => {
        console.log("booking property...")

        if (!AuthSvc.isAuthenticated()) {
            toast.error("You are Not Authenticated!");
            navigate("/signIn");
            throw new Error("Not Signed In!")
        }

        try {
            console.log(id, from, to, price);

            event.preventDefault();
            setSubmitting(true);
            const formData = new FormData(event.target);



            var requestData = {
                start_date: from,
                end_date: to,
                invoice_cost: finalprice,
                state: "Pending",
                billing_address_string: address,
                billing_address_city: city,
                billing_address_country: country,
                billing_address_province: province,
                billing_address_postal_code: postal
            };

            if (!from || !to || !price || !address) {
                requestData = {}
            }



            console.log(requestData);

            fetch(`${baseURL}/properties/${id}/book/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + AuthSvc.getToken()
                },
                body: JSON.stringify(requestData),
            })
                .then((data) => {
                    const status = data.status;
                    if (status === 201) {
                        AlertSvc.SimpleAlert("success", "Booking Successful!")
                        window.open('https://www.youtube.com/watch?v=xvFZjo5PgG0', '_blank').focus();
                        navigate("/user_pending");
                        toast.success("Booking Sent for Approval!");
                    } else if (status === 404) {
                        toast.warn("Oops, something has gone wrong... Please Visit the Support Page.")
                    } else if (status === 401) {
                        toast.warn("Your Session has Expired. Please Log On again")
                        navigate("/signIn");
                    }else if (status === 400) {
                        toast.error("One or more fields are incorrect.")
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.error(error);
        }




        setTimeout(() => {
            setSubmitting(false);
        }, 3000)
    }


    return (
        <>
            <div className="bookingpagepadding">
            <div className="bookingpagebox">

                <div className="DataEntry">
                    <form className="bookingform" onSubmit={handleSubmit} noValidate>
                        <div className="spacer">
                            <h3>Enter Guest Details:</h3>
                        </div>
                        <div className="spacer">
                            <h4>Contact Information: </h4>
                            <div className="row">
                                <div className="form-group">
                                    <label htmlFor="Email1">Email address</label>
                                    <input type="email" className="form-control" id="Email1"
                                           aria-describedby="emailHelp" placeholder="Enter email"
                                           value={email}
                                           onChange={handleEmailChange}/>
                                        <small id="emailHelp" className="form-text text-muted">We'll never share your
                                            email with
                                            anyone
                                            else.</small>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="PhoneInput" style={{display: 'block' }}>Phone Number: </label>
                                        <PhoneInput  id="PhoneInput" placeholder="Eg: 416-967-1111" value={phoneNumberValue} onChange={setPhoneNumberValue}></PhoneInput>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="prefctct">Preferred Contact Method:</label>
                                        <select className="form-control" id="prefctct" value={preferredContact}
                                                onChange={handlePreferredContactChange}>
                                            <option value="EMAIL">Email</option>
                                            <option value="PHONE">Phone</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="Firstname">First Name</label>
                                        <input type="text" className="form-control" id="FirstName"
                                               value={firstName}
                                               onChange={handleFirstNameChange}
                                               placeholder="First Name"/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="LName">Last Name</label>
                                        <input type="text" className="form-control" id="LName"
                                               value={lastName}
                                               onChange={handleLastNameChange}
                                               placeholder="Last Name"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="spacer">
                            <h4>Billing Address: </h4>
                            <div className="row">
                                <div className="form-group">
                                    <label htmlFor="Addrln1">Address Line 1</label>
                                    <input type="email" className="form-control" id="Addrln1"
                                           aria-describedby="emailHelp"
                                           placeholder="Eg: 1 Seventh Heaven Blvd"
                                           value={address}
                                           onChange={handleAddressChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="citysrc">City</label>
                                        <input type="email" className="form-control" id="citysrc"
                                               aria-describedby="emailHelp"
                                               placeholder="Eg: Midgar"
                                               value={city}
                                               onChange={handleCityChange}/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="ProvinceFormInput">Province:</label>
                                        <select className="form-control" id="ProvinceFormInput"
                                                value={province}
                                                onChange={handleProvinceChange}>
                                            <option value="NULL">Select Province</option>
                                            <option value="AB">Alberta</option>
                                            <option value="BC">British Columbia</option>
                                            <option value="MB">Manitoba</option>
                                            <option value="NL">Newfoundland and Labrador</option>
                                            <option value="NB">New Brunswich</option>
                                            <option value="NT">Northern Territories</option>
                                            <option value="NS">Nova Scotia</option>
                                            <option value="NV">Nunavut</option>
                                            <option value="ON">Ontario</option>
                                            <option value="PE">Prince Edward Island</option>
                                            <option value="QC">Quebec</option>
                                            <option value="SK">Saskatchewan</option>
                                            <option value="YT">Yukon</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="CtryFormInput">Country:</label>
                                        <select className="form-control" id="CtryFormInput"
                                                value={country}
                                                onChange={handleCountryChange}>
                                            <option value="NULL">Select Country</option>
                                            <option value="CAN">Canada</option>
                                            <option value="USA">United States</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="postcode">Postal Code</label>
                                        <input type="email" className="form-control" id="postcode"
                                               aria-describedby="emailHelp"
                                               placeholder="Eg: S7R 1F3"
                                               value={postal}
                                               onChange={handlePostalChange}/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="spacer">
                            <h3>Payment Method:</h3>
                            <p>You'll be redirected to a third party site to handle payment.</p>
                        </div>
                        <div className="spacer">
                            <h3>Consent and Privacy:</h3>
                            <p>We take safeguarding your personal information seriously. To learn more about how we use
                                your
                                personal information, please visit our <a href="privacy.html">Privacy Policy</a> page.
                            </p>
                            <div className="input-group">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" required/>
                                        <label className="form-check-label" htmlFor="exampleCheck1">I agree to the terms
                                            and conditions
                                            of the
                                            Restify Service.</label>
                                        <div className="invalid-feedback">
                                            Please Agree to our Terms and Conditions.
                                        </div>
                                </div>

                            </div>
                        </div>
                        <div className="spacer">
                            <input className="btn btn-success w-100 fw-semibold button_format_sign_in" type="submit" value="Submit"/>
                        </div>
                    </form>
                    <script>

                    </script>
                </div>
                <div className="propertyInfo">
                    <div className="card">
                        <div className="row gy-7">
                            <div className="card-body d-flex flex-column">
                                <div className="h-100">
                                   <PropertyCard property_id={id}/>

                                </div>
                            </div>
                            <div className="card-body d-flex flex-column">
                                <h4>Your Booking Information:</h4>
                                <div className="h-100">
                                    <p className="card-text"><strong>From: </strong><span style={{color: 'grey'}}>{from}</span></p>
                                    <p className="card-text"><strong>To: </strong><span style={{color: 'grey'}}>{to}</span></p>
                                    <p className="card-text"><strong>Net Cost: </strong><span style={{color: 'grey'}}>CAD
                                        ${finalprice}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    );



};


export default BookProperty;
