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
import {MultiSelect} from "react-multi-select-component";

const baseURL = "http://127.0.0.1:8000";

const CreateProperty = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();


    const [submitting, setSubmitting] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);


    const [email, setEmail] = useState("");
    const [phoneNumberValue, setPhoneNumberValue] = useState("");
    const [preferredContact, setPreferredContact] = useState("email");
    const [name, setName] = useState("");
    const [capacity, setCapacity] = useState(0);
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [country, setCountry] = useState("");
    const [postal, setPostal] = useState("");

    const [selected, setSelected] = useState([]);

    const [description, setDescription] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [amenities, setAmenities] = useState([]);


    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePhoneChange = (event) => setPhoneNumberValue(event.target.value);
    const handlePreferredContactChange = (event) => setPreferredContact(event.target.value);

    const handleDescriptionChange = (event) => setDescription(event.target.value);
    const handleNameChange = (event) => setName(event.target.value);
    const handleCapacityChange = (event) => setCapacity(event.target.value);
    const handleThumbnailChange = (event) => {
        console.log(event.target.files[0]);
        setThumbnail(event.target.files[0]);
    };

    const handleAddressChange = (event) => setAddress(event.target.value);

    const handleCityChange= (event) => setCity(event.target.value);

    const handleProvinceChange = (event) => setProvince(event.target.value);

    const handleCountryChange = (event) => setCountry(event.target.value);

    const handlePostalChange= (event) => setPostal(event.target.value);

    const handleAmenities = function(selectedItems) {
        const amens = [];
        for (let i=0; i<selectedItems.length; i++) {
            amens.push(selectedItems[i].value);
        }
        setAmenities(amens);
    }




    const options = [
        { value: "Wifi", label: "Free Wifi" },
        { value: "Kitchen", label: "Kitchen Available" },
        { value: "TV", label: "TV Available"},
        { value: "Toiletries", label: "Toiletries Provided"},
        { value: "Workspace", label: "Workspace Available"},
        { value: "Parking", label: "Parking Available"},
        { value: "Self-CheckIn", label: "Self Check in Available"},
        { value: "Free Cancellation Within 24 hours", label: "Free Cancellation Within 24 hours"},
        { value: "Free Cancellation Within 48 hours", label: "Free Cancellation Within 48 hours"},
        { value: "Free Cancellation Within one week", label: "Free Cancellation Within One Week"},
    ];


    const handleSubmit = event => {
        console.log("creating property...")

        if (!AuthSvc.isAuthenticated()) {
            toast.error("You are Not Authenticated and Cannot Create Properties.");
            navigate("/signIn");
            throw new Error("Not Signed In!")
        }

        try {
            event.preventDefault();
            setSubmitting(true);
            var formData = new FormData();

            if (name.length > 0) {
                formData.set('name', name);
            }

            if (capacity >= 0) {
                formData.set('guest_num', capacity);
            }
            if (address.length>0) {
                formData.set('address_string', address);
            }

            if (country.length > 0) {
                formData.set('address_country', country);
            }

            if (city.length > 0) {
                formData.set('address_city', city);
            }

            if (province.length > 0) {
                formData.set('address_province', province);
            }

            if (postal.length > 0) {
                formData.set('address_postal_code', postal);
            }

            if (description.length > 0) {
                formData.set('description', description);
            }

            const amens = [];
            for (let i=0; i<selected.length; i++) {
                amens.push(selected[i].value);
            }

            formData.set('amenities', amens);

            formData.set('thumbnail_img', thumbnail);

            console.log(formData)

            var response = 404;

            fetch(`${baseURL}/properties/create/`, {
                method: "PUT",
                headers: {
                    "Authorization": "Bearer " + AuthSvc.getToken()
                },
                body: formData,
            })
                .then((data) => {
                    const status = data.status;
                    if (status === 201) {
                        console.log(data);
                        response=200
                        toast.success("Property Created!");
                        return data.json();
                        //navigate("/property/");
                    } else if (status === 404) {
                        toast.warn("Oops, something has gone wrong... Please Visit the Support Page.")
                    } else if (status === 401) {
                        toast.warn("Your Session has Expired. Please Log in again")
                        navigate("/signIn");
                    }else if (status === 400) {
                        toast.error("One or more fields are incorrect.")
                    }
                }).then((result) => {
                    const data = result
                    console.log(result)
                    if (response === 200) {
                        navigate(`/property/${result.pk}`)
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
                        <form className="newpropform" onSubmit={handleSubmit} noValidate>
                            <h3>Creating Your Property:</h3>
                            <p>Feel free to be creative, but honest with your property!</p>
                            <div className="spacer">
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="PName">Property Name</label>
                                            <input type="text" className="form-control" id="Pname"
                                                   placeholder="Property Name: ie, Seventh Heaven"
                                                   value={name} onChange={handleNameChange}/>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="NGst">Capacity</label>
                                            <input type="number" className="form-control" id="NGst"
                                                   placeholder="# Guests"
                                                   value={capacity} onChange={handleCapacityChange}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="spacer">
                                <h4>Property Address: </h4>
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
                                <h4>Amenities and Policies: </h4>
                                <p>Please indicate all available amenities.</p>
                                <div className="spacer">
                                    <MultiSelect
                                        options={options}
                                        value={selected}
                                        onChange={setSelected}
                                        labelledBy="Select"
                                    />
                                </div>
                            </div>
                            <div className="spacer">
                                <h4>Description: </h4>
                                <div className="form-group">
                                    <label htmlFor="property-description">Describe your property. Be creative, but be
                                        honest!</label>
                                    <textarea className="form-control" id="property-description"
                                              placeholder="Eg: A beautiful property located in the middle of the Leyndell Catacombs!"
                                              rows="4"
                                              value={description} onChange={handleDescriptionChange}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="spacer">
                                <div className="row">
                                    <h4>Thumbnail Picture: </h4>
                                    <p>Please upload an accurate picture of your property.</p>
                                </div>
                                <div className="row">
                                    <div className="form-group">
                                        <label htmlFor="thumbnail-property">Your File: (JPEG, PNG, SVG)</label>
                                        <input type="file" className="borderAttachment" id="thumbnail-property"
                                               name="myImage"  onChange={handleThumbnailChange}/>
                                    </div>
                                </div>
                            </div>
                            <div className="spacer">
                                <input className="btn btn-success w-100 fw-semibold button_format_sign_in" type="submit" value="Submit"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );



};


export default CreateProperty;
