import React, {useEffect, useState, Fragment} from 'react';
import ReactDOM from 'react-dom';
import {useNavigate, useParams} from "react-router-dom";
import axios from 'axios';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./styles/style.css";

import { useLocation } from "react-router-dom";

const baseURL = "http://127.0.0.1:8000";

/**
 *
 * usage: return <PropertyCard property_id=1/>
 */

const PropertyCard = ({property_id}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [property, setProperty] = useState({});
    const [price, setPrice] = useState(0);
    const [image_link, setImage] = useState("");
    const [propertyName, setName] = useState("");
    const [country, setCountry] = useState("");
    const [description, setDesc] = useState("");

    //console.log(baseURL +`/properties/${property_id}`);

    function fetch_some () {
        fetch(`${baseURL}/properties/${property_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setLoading(false);
                setProperty(JSON.parse(JSON.stringify(data)));

                setImage(`${baseURL}${data.thumbnail_img}`);
                setName(data.name);
                setCountry(data.address_country);
                setDesc(data.description);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function fetch_all () {



        fetch(`${baseURL}/properties/${property_id}/prices/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                const price = data;
                var filteredPrices = [];


                for(var index in price) {
                    var obj = data[index];
                    var start_date = Date.parse(obj.start_date);
                    var end_date = Date.parse(obj.end_date);

                    var current_date = new Date();
                    if(current_date > start_date && current_date < end_date)
                        filteredPrices.push(obj.pricing);
                }
                setPrice(filteredPrices[0]);

                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });






    }

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch_some();


    }, []);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch_all();


    }, []);

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`../property/${property_id}`)
    };

    return (<>
        <a href='' onClick={handleClick} style={{ color: 'inherit'}}>
            <div className="card h-100 d-inline-block">
                <div className="row g-0">
                    <div className="row g-0" >
                        <img
                            src={`${image_link}`}
                             className="card-img img-fluid rounded-start "
                             alt="image of the property"/>
                    </div>
                    <div className="row g-0">
                        <div className="card-body d-flex flex-column">
                            <div className="h-100">
                                <h4 className="card-title" style={{color: 'grey'}}>
                                    {country}</h4>
                                <h2 className="card-title">
                                    {propertyName}</h2>
                                <p className="card-text">
                                    {description}
                                </p>
                                <h4 className="card-title mb-3">
                                    $<strong>
                                    {price}
                                </strong>
                                    <span
                                    style={{color: 'grey'}}>/night</span></h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </>);
}

export default PropertyCard;