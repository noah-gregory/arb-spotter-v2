import { Link} from "react-router-dom";
// import { useParams } from 'react-router-dom';
// import axios from 'axios'; // Import Axios

const VerifyEmailPass = () => {
  return (
    <div>
      <h1>Email Verification</h1>
      <p>Please check your email to reset your password.</p>
      <Link to="/Login">Go to Login</Link> 
    </div>
  );
};

export default VerifyEmailPass;