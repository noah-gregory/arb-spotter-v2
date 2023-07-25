import React from 'react';
import Delete from '../components/DeletePost';
import Navbar from '../components/Navbar';

const DeletePage = () =>
{
    console.log("FeedPage");
    return(
      <div >
        <Navbar />
        <Delete />
      </div>
    );
};

export default DeletePage;