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
import PropertyIndex from "./cards_2";

const baseURL = "http://127.0.0.1:8000";

/**
 *
 * usage: return <PropertyLayout filters='' page=''/>
 */


export default class Properties extends React.Component {
    state = {
        pages_loaded: [],
        pgno: 1,
        more: true,
        fetching: true,
        filters: null,
    };

    loadMore = () => {

        const { pages_loaded, pgno, more, fetching} = this.state;
        if (fetching) {
            let url = `${baseURL}/properties?page=${pgno}`

            const queryParameters = new URLSearchParams(window.location.search)
            const quere = queryParameters.get("query")


            let query = ''

            const name = queryParameters.get("name")
            const country = queryParameters.get("country")
            const city = queryParameters.get("city")
            const search = queryParameters.get("search")
            const orderBy = queryParameters.get("orderby")
            //console.log(query)

            if (name != null){
                query = '&name=' + encodeURIComponent(name.trim());

            }

            if (country != null){
                query = query + '&address_country=' +encodeURIComponent(country.trim());

            }

            if (city != null ){
                query = query + '&address_city=' + encodeURIComponent(city.trim());

            }

            if (search != null ){
                query = query + '&search=' + encodeURIComponent(search.trim());

            }

            if (orderBy != null ){
                query = query + '&ordering=' + encodeURIComponent(orderBy.trim());

            }

            if (query.length >0){
                url = url  + query;
                this.setState({
                    filters: query
                });
            }

            console.log(url)
            axios.get(url)
                .then((response) => {

                    if (response.data.next !== null){

                        this.setState({
                            more: true,
                        });

                    } else {
                        this.setState({
                            more: false,
                        });
                    }

                    this.setState({
                        pgno: pgno+1,
                        pages_loaded: pages_loaded
                    })
                    pages_loaded.push(pgno);
                })
                .catch((error) => {}
                )
                .finally(() => {
                });
        }


    };


    componentDidMount() {


        console.log("mount properties")

        const { pages_loaded, pgno, more, fetching} = this.state;
        if (fetching) {

            let url = `${baseURL}/properties?page=${pgno}`

            const queryParameters = new URLSearchParams(window.location.search)
            const quere = queryParameters.get("query")


            let query = ''

            const name = queryParameters.get("name")
            const country = queryParameters.get("country")
            const city = queryParameters.get("city")
            const search = queryParameters.get("search")
            const orderBy = queryParameters.get("orderby")
            //console.log(query)

            if (name != null){
                query = '&name=' + encodeURIComponent(name.trim());

            }

            if (country != null){
                query = query + '&address_country=' +encodeURIComponent(country.trim());

            }

            if (city != null ){
                query = query + '&address_city=' + encodeURIComponent(city.trim());

            }

            if (search != null ){
                query = query + '&search=' + encodeURIComponent(search.trim());

            }

            if (orderBy != null ){
                query = query + '&ordering=' + encodeURIComponent(orderBy.trim());

            }

            if (query.length >0){
                url = url  + query;
                this.setState({
                    filters: query
                });
            }

            console.log(url)
            axios.get(url)
                .then((response) => {

                    if (response.data.next !== null){

                        this.setState({
                            more: true,
                        });
                    } else {
                        this.setState({
                            more: false,
                        });
                    }
                    this.setState({
                        pgno: pgno+1,
                        pages_loaded: pages_loaded
                    })
                    pages_loaded.push(pgno);

                })
                .catch((error) => {}
                )
                .finally(() => {
                });
        }
    }


    render() {
        const { pages_loaded, pgno, more, fetching, filters} = this.state;
        console.log(filters)

        return (
            <>
                <Navbar />
                <div style={{margin: '1rem'}}>
                    <div className="home_cards">
                        <PropertyIndex cards={pages_loaded} filters={filters}/>
                        <div className="d-grid gap-2 col-6 mx-auto">
                            <button className="btn btn-success w-100 fw-semibold button_format_sign_in mx-auto" onClick={this.loadMore} disabled={!more} style={{paddingLeft: '4rem', paddingRight: '4rem'}}>Show more</button>
                        </div>

                    </div>
                </div>

            </>
        );
    }
}