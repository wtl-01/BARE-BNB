import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./styles/style.css";
import Navbar from "./navbar";

import { useParams } from 'react-router-dom';

function Notification() {
  const { notificationId } = useParams();
  console.log(notificationId);
  return (
    <>
      <Navbar />
      <h1>Notification: {notificationId}</h1>
    </>
  )
}

export default Notification;
