
// import React from 'react';
// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios'; // Import Axios


// const app_name = 'arb-navigator-6c93ee5fc546';

// function buildPath(route) {
//   console.log("Build Path");
//   if (process.env.NODE_ENV === 'production') {
//     return 'https://' + app_name + '.herokuapp.com/' + route;
//   } else {
//     return 'http://localhost:5000/' + route;
//   }
// }

// const ChangePassword = () => {
//   const { token } = useParams();
//   var [verificationStatus, setVerificationStatus] = useState('');
//   var [firstPass, setPassword] = useState('');
//   var [secondPass, setPasswordConfirm] = useState('');

//   var obj = {firstPassword:firstPass, secondPassword:secondPass};
//   var js = JSON.stringify(obj);
  
//   useEffect(() => {
//     const fetchVerificationStatus = async () => {
//       try {
//         const response = await axios.post(buildPath(`api/reset/${token}`), js,
//         {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
       
//       } catch (error) {
//         console.error('Error verifying email:', error);
        
//       }
//     };

//     fetchVerificationStatus();
//   }, [token]);

//   return (
//     <section className='login-section'>
//     <h1>Password Reset</h1>
//     <form onSubmit={ChangePassword}>
//         <label>New Password:</label>
//         <input
//             type="text"
//             id="firstPassword"
//             autoComplete="off"
//             onChange={(e) => setPassword(e.target.value)}
//             required
//         />
//         <label>Confirm New Password:</label>
//         <input
//             type="text"
//             id="secondPassword"
//             autoComplete="off"
//             onChange={(e) => setPasswordConfirm(e.target.value)}
//             required
//         />
//         <button className='login-button'>Reset Password</button>
//     </form>
// </section>
//   );
// };

// export default ChangePassword;

import React, { useState } from 'react';
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

const ChangePassword = () => {
  const { token } = useParams();
  const [firstPass, setFirstPass] = useState('');
  const [secondPass, setSecondPass] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const obj = { firstPassword: firstPass, secondPassword: secondPass };
    const js = JSON.stringify(obj);

    try {
        console.log(buildPath(`api/reset/${token}`))
      const response = await axios.post(buildPath(`api/reset/${token}`), js, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // Process the response if needed
    } catch (error) {
      console.error('Eail:', error);
    }
  };

  return (
    <section className='login-section'>
      <h1>Password Reset</h1>
      <form onSubmit={handleFormSubmit}>
        <label>New Password:</label>
        <input
          type="password"
          id="firstPassword"
          autoComplete="off"
          value={firstPass}
          onChange={(e) => setFirstPass(e.target.value)}
          required
        />
        <label>Confirm New Password:</label>
        <input
          type="password"
          id="secondPassword"
          autoComplete="off"
          value={secondPass}
          onChange={(e) => setSecondPass(e.target.value)}
          required
        />
        <button className='login-button' type="submit">Reset Password</button>
      </form>
    </section>
  );
};

export default ChangePassword;