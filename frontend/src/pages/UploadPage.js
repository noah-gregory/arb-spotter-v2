import React from 'react';
import Upload from '../components/Upload';
import Navbar from '../components/Navbar';

const UploadPage = () =>
{
    console.log("UploadPage");
    return(
      <div >
        <Navbar/>
        <Upload />
      </div>
    );
};

export default UploadPage;