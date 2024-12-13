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

const baseURL = "http://127.0.0.1:8000";

/**
 *
 * usage: return <PropertyLayout filters='' page=''/>
 */


export default class PropertyUnit extends React.Component {
    state = {
        properties: [],
        isLoading: false,
        errorMsg: '',
        filters: null
    };

    componentDidMount() {
        this.setState({ isLoading: true });

        if (!this.props.filters){
            const url = `${baseURL}/properties?page=${this.props.page}`
            console.log('get url w/o filt')
            console.log(url)
            axios
                .get(url)
                .then((response) => {
                    this.setState({ properties: response.data, errorMsg: '' });
                })
                .catch((error) =>
                    this.setState({
                        errorMsg: 'Error while loading data. Try again later.'
                    })
                )
                .finally(() => {
                    this.setState({ isLoading: false });
                });
        } else {
            const url = `${baseURL}/properties?page=${this.props.page}${this.props.filters}`
            console.log('get url w/ filt')
            console.log(url)
            axios
                .get(url)
                .then((response) => {
                    this.setState({ properties: response.data, errorMsg: '' });
                })
                .catch((error) =>
                    this.setState({
                        errorMsg: 'Error while loading data. Try again later.'
                    })
                )
                .finally(() => {
                    this.setState({ isLoading: false });
                });
        }

    }

    render() {
        const { properties, isLoading, errorMsg } = this.state;
        //console.log(properties);

        const page = this.props.page;
        const filters = this.props.filters;

        const idx = properties.results;
        var propertyIDs = [];

        for(var index in idx) {
            var obj = idx[index];
            propertyIDs.push(obj.pk);
        }

        // console.log(propertyIDs);

        var num_rows = Math.floor(propertyIDs.length / 3)
        var num_cols = propertyIDs.length % 3


        function sliceIntoChunks(arr, chunkSize) {
            const res = [];
            for (let i = 0; i < arr.length; i += chunkSize) {
                const chunk = arr.slice(i, i + chunkSize);
                res.push(chunk);
            }
            return res;
        }
        const render = sliceIntoChunks(propertyIDs, 3)


        const layout = [
            { i: "a", x: 0, y: 0, w: 1, h: 1, isResizable: false, },
            { i: "b", x: 1, y: 0, w: 1, h: 1, isResizable: false, },
            { i: "c", x: 2, y: 0, w: 1, h: 1, isResizable: false, },
            { i: "d", x: 0, y: 1, w: 1, h: 1, isResizable: false, },
            { i: "e", x: 1, y: 1, w: 1, h: 1, isResizable: false, },
            { i: "f", x: 2, y: 1, w: 1, h: 1, isResizable: false, },
            { i: "g", x: 0, y: 2, w: 1, h: 1, isResizable: false, },
            { i: "h", x: 1, y: 2, w: 1, h: 1, isResizable: false, },
            { i: "i", x: 2, y: 2, w: 1, h: 1, isResizable: false, },
        ]

        let items = [];
        for (let i = 0; i < propertyIDs.length; i++) {
            items.push(
                <Grid item md={4}>
                    <PropertyCard property_id={propertyIDs[i]}/>
                </Grid>
                );
        }
        // console.log(items)


        return (
            <>
                <div className="property-block">
                    {isLoading && <p className="loading">Loading...</p>}
                    {errorMsg && <p className="errorMsg">{errorMsg}</p>}
                    <p>Page No: {page}</p>
                    <p>Filters: {filters}</p>


                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1.5, md: 2 }}>
                        {items}
                    </Grid>


                </div>
            </>

        );
    }
}