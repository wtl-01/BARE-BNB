import React, { useState, useEffect } from "react";
import Reviewername from "./reviewername";

const baseURL = "http://127.0.0.1:8000";
const accessToken = localStorage.getItem("accessToken");

const Replies = (props) => {
    const property_id = props.property_id;
    const comment_id = props.id;
    const [replies, setReplies] = useState([]);
    const [length, setLength] = useState(0);
  
    //get replies
    useEffect(() => {
      const fetchRepliesData = async () => {
        try {
          const response = await fetch(`${baseURL}/properties/${property_id}/reviews/${comment_id}/`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
    
          const data = await response.json();
          setReplies(data);
          setLength(data.length);
          
          
        } catch (error) {
          console.error(`Error fetching user data: ${error}`);
          setReplies([]);
        }
      };
        fetchRepliesData();
      
    }, [comment_id]);
    
    
  
    return (
      <>
        {replies && replies.map((reply) => (
          <div key={reply.id} style={{ marginLeft: '20px', marginTop: '10px', marginBottom: '10px'}}>
            <Reviewername id={reply.reviewer}/>
            <div>Reply: {reply.comment_text}</div>
          </div>
        ))}
      </>
    );
  }
  
  export default Replies;
