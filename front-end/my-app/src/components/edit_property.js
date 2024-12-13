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
import Navbar from "./navbar";

const baseURL = "http://127.0.0.1:8000";


const EditProperty = () => {

    const params = useParams();

    const [images, setImages] = useState([]);
    const [price, setPrice] = useState(0);

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const fileSelectedHandler = (e) => {
        setImages([...images, ...e.target.files]);
    }

    const navigate = useNavigate();

    var {id} = params;

    const handleUploadImgs = (event) => {
        if (!AuthSvc.isAuthenticated()) {
            toast.error("You are Not Authenticated and Cannot Edit Properties.");
            navigate("/signIn");
            throw new Error("Not Signed In!")
        }

        for (let i=0; i<images.length; i++) {

            var formData = new FormData();
            formData.set('image', images[i]);
            fetch(`${baseURL}/properties/${id}/aux/manage/`, {
                method: "PUT",
                headers: {
                    "Authorization": "Bearer " + AuthSvc.getToken()
                },
                body: formData
            })
                .then((data) => {
                    const status = data.status;
                    console.log(data)
                    if (status === 200) {
                        toast.success("added image!")
                    } else {
                        toast.error("Cannot Save Image.")
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

        }
    }

    const handleAddPrice = (event) => {
        var formData = new FormData();
        formData.set('pricing', price);
        formData.set('start_date', from);
        formData.set('end_date', to);
        fetch(`${baseURL}/properties/${id}/prices/manage/`, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + AuthSvc.getToken()
            },
            body: formData
        })
            .then((data) => {
                console.log(data)
                const status = data.status;
                if (status === 200) {
                    toast.success("added pricing!")
                } else {
                    toast.error("Cannot Add Pricing.")
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleExit = (event) => {
        navigate(`/property/${id}`)
    }

    const handlePrice = (event) => setPrice(event.target.value);

    const handleFrom = (event) => setFrom(event.target.value);

    const handleTo = (event) => setTo(event.target.value);

    return (
        <div className="container">
            <Navbar/>
            <div className="container">
                <div className="row">
                    <form className="imguploadform" onSubmit={handleUploadImgs} noValidate>
                        <div><h4>Upload Property Images</h4></div>
                        <label htmlFor="imgs1234">Your Files: (JPEG, PNG, SVG)</label>
                        <input type="file" multiple id="imgs1234" onChange={fileSelectedHandler} />
                        <input className="btn btn-success w-100 fw-semibold button_format_sign_in" type="submit" value="Upload"/>
                    </form>
                </div>
                <div className="row">
                    <div><h4>Add Prices</h4></div>
                    <form className="imguploadform" onSubmit={handleAddPrice} noValidate>
                        <div><h4>Add Price Segment</h4></div>
                        <label htmlFor="price1234">Price</label>
                        <input type="number" multiple id="price1234" value={price} onChange={handlePrice} />

                        <label htmlFor="price1234">From</label>
                        <input type="date" multiple id="price1234" value={from} onChange={handleFrom} />

                        <label htmlFor="price1234">To</label>
                        <input type="date" multiple id="price1234" value={to} onChange={handleTo} />

                        <input className="btn btn-success w-100 fw-semibold button_format_sign_in" type="submit" value="Upload"/>
                    </form>
                </div>
                <div className="container">
                    <input className="btn btn-success w-100 fw-semibold button_format_sign_in" onClick={handleExit} value="Finished"/>
                </div>
            </div>
        </div>



    );

}

export default EditProperty;


