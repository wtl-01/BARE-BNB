import React, {useEffect, useState, Fragment} from 'react';
import ReactDOM from 'react-dom';
import {useNavigate, useParams} from "react-router-dom";
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
import PropertyUnit from "./property_card_unit";

const baseURL = "http://127.0.0.1:8000";



export default class PropertyIndex extends React.Component {
    state = {
        pages_loaded: [],
    };

    componentDidMount() {

        console.log("mount cards")
        this.setState({pages_loaded: this.props.cards, filters: this.props.filters});

    }


    render() {
        const { pages_loaded} = this.state;

        console.log(this.props.filters)

        let items = [];
        for (let i = 0; i < pages_loaded.length; i++) {
            items.push(
                <PropertyUnit page={pages_loaded[i]} filters={this.props.filters}/>
            );
        }

        return (
            <>
                <div>
                    <div className="property-card-page" id="prop-page">
                        {items}
                    </div>
                </div>
            </>
        );
    }
}