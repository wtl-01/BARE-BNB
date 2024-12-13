import React, {useEffect, useState, Fragment} from 'react';
import ReactDOM from 'react-dom';
import {redirect, useNavigate, useParams, } from "react-router-dom";
import axios from 'axios';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./styles/style.css";

import GridLayout from "react-grid-layout";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';


import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"

import { useLocation } from "react-router-dom";
import Navbar from "./navbar";
import PropertyCard from "./property_tab";
import {Card} from "@mui/material";
import PropertyIndex from "./cards_2";
import {MultiSelect} from "react-multi-select-component";

const baseURL = "http://127.0.0.1:8000";



export default class Search extends React.Component {
    state = {
        cityFilter: null,
        countryFilter: null,
        nameFilter: null,
        amenityFilter: [],
        searchBar: null,
        orderBy: null,
    };


    handleSubmit = async (event) => {
        event.preventDefault();
        console.log('SUMBIT');
        const {cityFilter,
            countryFilter,
            nameFilter,
            amenityFilter,
            searchBar,
            orderBy} = this.state
        var city = cityFilter;
        var country = countryFilter;
        var name = nameFilter;
        var search = searchBar;
        var order = orderBy;
        //"&name=${name}&country=${country}&city=${city}&search=${search}&orderby=${order}"

        let url = `../properties?page=1`;

        if (city != null) {
            url = url + `&city=`+ encodeURIComponent(city.trim());
        }

        if (country != null) {
            url = url + `&country=` + encodeURIComponent(country.trim());
        }

        if (name != null) {
            url = url + `&name=` + encodeURIComponent(name.trim());
        }

        if (search != null) {
            url = url + `&search=` + encodeURIComponent(search.trim());
        }

        if (order != null) {
            url = url + `&orderby=` + encodeURIComponent(order.trim());
        }


        console.log(url)
        window.location.replace(url);

    }


    componentDidMount() {
        console.log('SEARCH MOUNT')
        console.log(this.state);
    }


    handleChange = (e) => {
        this.setState({ value: e.target.value });
    };

    handleChangeCity = (e) => {
        this.setState({ cityFilter: e.target.value });
        console.log(this.state);
    };

    handleChangeCountry = (e) => {
        this.setState({ countryFilter: e.target.value });
        console.log(this.state);
    };

    handleChangeName = (e) => {
        this.setState({ nameFilter: e.target.value });
        console.log(this.state);
    };

    handleChangeAmen = (e) => {
        this.setState({ amenityFilter: e.target.value });
        console.log(this.state);
    };
    handleSearch = (e) => {
        this.setState({ searchBar: e.target.value });
        console.log(this.state);

    };

    handleChangeOB = (e) => {
        this.setState({ orderBy: e.target.value });
        console.log(this.state);
    };

    render() {

        const { cityFilter,
            countryFilter,
            nameFilter,
            amenityFilter,
            searchBar,
            orderBy} = this.state;

        var options = [
            { label: "WiFi Available", value: "Wifi" },
            { label: "Parking Available", value: "Parking" },
            { label: "Self Check-In", value: "Self-CheckIn"},
            { label: "Workspace Available", value: "Workspace"},
        ];



        return (
            <>
                <Navbar/>
                <div className="spacer">
                    <form className="searchbar" onSubmit={this.handleSubmit} noValidate>
                        <div className="spacer">
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="cityFilter">City:</label>
                                        <input type="text" className="form-control" id="cityFilter" placeholder="City"
                                               value={this.state.cityFilter}
                                               onChange={this.handleChangeCity}/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="countryFilter">Country:</label>
                                        <input type="text" className="form-control" id="countryFilter" placeholder="Country"
                                               value={this.state.countryFilter}
                                               onChange={this.handleChangeCountry}/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="nameFilter">Name:</label>
                                        <input type="text" className="form-control" id="nameFilter" placeholder="Property Name"
                                               value={this.state.nameFilter}
                                               onChange={this.handleChangeName}/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="orderBy">Order By</label>
                                        <select id="orderBy" className="form-select" aria-label="Select Ordering"
                                                value={this.state.orderBy}
                                                onChange={this.handleChangeOB}>
                                            <option selected>None</option>
                                            <option value="current_price">Price (Lowest)</option>
                                            <option value="-current_price">Price (Highest)</option>
                                            <option value="guest_num">Capacity (Lowest)</option>
                                            <option value="-guest_num">Capacity (Highest)</option>
                                        </select>

                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="cityFilter">Search:</label>
                                        <input type="text" className="form-control" id="search" placeholder="Search Term"
                                               value={this.state.searchBar}
                                               onChange={this.handleSearch}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="spacer">
                            <input className="btn btn-success w-100 fw-semibold button_format_sign_in" type="submit" value="Submit"/>
                        </div>
                    </form>
                </div>

            </>
        );
    }
}