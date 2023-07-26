import React, { useState, useEffect } from 'react';
import { Link} from "react-router-dom";
// import { useParams } from 'react-router-dom';
// import axios from 'axios'; // Import Axios

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

const VerifyEmail = () => {
  return (
    <div>
      <h1>Email Verification</h1>
      <p>Please check your email to verify your account.</p>
      <Link to="/Login">Go to Login</Link> 
    </div>
  );
};

export default VerifyEmail;