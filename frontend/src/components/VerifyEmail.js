// import { useState} from "react";
// import axios from 'axios';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

// const SearchBar = () => {
//     var [searchData, setSearch] = useState('');

//     const app_name = 'arb-navigator-6c93ee5fc546';
//     function buildPath(route)
//     {
//         console.log("Build Path");
//         if (process.env.NODE_ENV === 'production') 
//         {
//             return 'https://' + app_name +  '.herokuapp.com/' + route;
//         }
//         else
//         {        
//             return 'http://localhost:5000/' + route;
//         }
//     }

//     const doSearch = async (e) => {
//         // e.preventDefault();
//         let obj = {search:searchData};
//         let js = JSON.stringify(obj);

//         const response = await axios.get(buildPath('api/verify:'), js, {
//             headers: {
//             'Content-Type': 'application/json',
//             }
//         });
//         console.log(response);
//     }
//   return (
//     <div>
//       <h1>Email Verification</h1>
//       <p>{verificationStatus}</p>
//     </div>
//   );
// };

// export default VerifyEmail;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import Axios

const app_name = 'arb-navigator-6c93ee5fc546';

function buildPath(route) {
  console.log("Build Path");
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name + '.herokuapp.com/' + route;
  } else {
    return 'http://localhost:5000/' + route;
  }
}

const VerifyEmail = () => {
  const { token } = useParams();
  const [verificationStatus, setVerificationStatus] = useState('');

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      try {
        console.log(buildPath(`api/verify/${token}`));
        const response = await axios.get(buildPath(`api/verify/${token}`));
        setVerificationStatus(response.data.message);
      } catch (error) {
        console.error('Error verifying email:', error);
        setVerificationStatus('An error occurred while verifying the email.');
      }
    };

    fetchVerificationStatus();
  }, [token]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{verificationStatus}</p>
    </div>
  );
};

export default VerifyEmail;