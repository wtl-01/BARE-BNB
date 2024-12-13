import React from "react";
import "./App.css";
import SignUpForm from "./components/signup_form";
import SignInForm from "./components/signin_form";
import Dashboard from "./components/dashboard";
import PrivateProfile from "./components/private_profile";
import Host_Dashboard from "./components/host_dashboard";
import ProfilePicture from "./components/profile_picture";
import UserTerminated from "./components/reservations/user_terminated_reservations";
import UserCompleted from "./components/reservations/user_completed_reservations";
import UserPresent from "./components/reservations/user_present_reservations";
import UserPending from "./components/reservations/user_pending_reservations";
import HostCancellation from "./components/reservations/host_cancellation_request";
import HostCompleted from "./components/reservations/host_completed_reservations";
import HostExisting from "./components/reservations/host_existing_requests";
import HostPending from "./components/reservations/host_pending_reservations";
import HostProperties from "./components/reservations/host_manage_property";
import BookProperty from "./components/book_property";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PropertyPage from "./components/properties";
import Properties from "./components/properties";
import Search from "./components/search";

import Notification from "./components/notification";
import Property from "./components/property";

import PublicProfile from "./components/public_profile";
import CreateProperty from "./components/create_property";
import EditProperty from "./components/edit_property";



function App() {
  return (
    <Router>
      <ToastContainer />
      <div className="App">
        <Routes>
          <Route path="/" element={<SignUpForm />}>
            {" "}
          </Route>
          <Route path="/signIn" element={<SignInForm />}>
            {" "}
          </Route>
          <Route path="/myProfile" element={<PrivateProfile />}>
            {" "}
          </Route>
          <Route path="/dashboard" element={<Dashboard />}>
            {" "}
          </Route>
          <Route path="/host_dashboard" element={<Host_Dashboard />}>
            {" "}
          </Route>
          <Route path="/user_pending" element={<UserPending />}>
            {" "}
          </Route>
          <Route path="/user_terminated" element={<UserTerminated />}>
            {" "}
          </Route>
          <Route path="/user_completed" element={<UserCompleted />}>
            {" "}
          </Route>
          <Route path="/user_present" element={<UserPresent />}>
            {" "}
          </Route>
          <Route path="/host_cancellation" element={<HostCancellation />}>
            {" "}
          </Route>
          <Route path="/host_completed" element={<HostCompleted />}>
            {" "}
          </Route>
          <Route path="/host_existing" element={<HostExisting />}>
            {" "}
          </Route>
          <Route path="/host_pending" element={<HostPending />}>
            {" "}
          </Route>
          <Route path="/host_properties" element={<HostProperties />}>
            {" "}
          </Route>

          <Route path="/editProfilePicture" element={<ProfilePicture />}>
            {" "}
          </Route>

          <Route path="/public_profile/:id" element={<PublicProfile />}>
            {" "}
          </Route>

          <Route
            path="/book_property/:id/:from/:to/:price"
            element={<BookProperty />}
          >
            {" "}
          </Route>

          <Route

              path="/properties"
              element={<Properties/>}

          >
            {" "}
          </Route>

          <Route


              path="/notification/:notificationId"
              element={<Notification />}

          >
            {" "}
          </Route>


          <Route path="/property/:id" element={<Property/>}>
            {" "}
          </Route>

          <Route path="/property/:id/edit" element={<EditProperty/>}>
            {" "}
          </Route>

          <Route
          path="/search"
          element={<Search />}
          >
          {" "}
        </Route>


          <Route

              path="/property/create"
              element={<CreateProperty />}
          >
            {" "}
          </Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
