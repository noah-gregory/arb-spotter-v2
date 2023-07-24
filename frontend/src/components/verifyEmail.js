import { useRef, useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const verifyEmailPage = () => {
  const data = {
    // any additional data you want to pass to the server
  };

  axios.post('http://localhost:3000/send-email', data)
    .then((response) => {
      console.log(response.data.message); // Email sent successfully!
    })
    .catch((error) => {
      console.error('Error sending email:', error);
    });
};

export default verifyEmailPage;