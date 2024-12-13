import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Navbar from "../navbar";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil} from '@fortawesome/free-solid-svg-icons'

const baseURL = "http://127.0.0.1:8000";

function HostProperties() {
    return (
        <>
        <Navbar />
        <div clasName="container">
          <div className="fs-2 fw-bold d-flex align-items-center justify-content-evenly">
                <p className="main_title_host_pending_reservation">
                Manage My Properties
                </p>
          </div>
          <div style={{ marginTop: '10px', marginLeft: '30px', marginBottom: '20px'}}><Link to='/property/create'><button id="myButton" className="search_button2"><a href="#" style={{ textDecoration:'none', color:'inherit'}}>
            <FontAwesomeIcon icon={faPencil}/>  Create Property</a></button></Link></div>
          <div class="container d-flex align-items-center justify-content-center">
            <div class="card-deck w-75">

                
            </div>
          </div>
        </div>
        </>
    )
}

export default HostProperties;