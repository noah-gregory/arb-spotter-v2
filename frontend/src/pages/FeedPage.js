import React from 'react';
import Feed from '../components/Feed';
import Navbar from '../components/Navbar';

const FeedPage = () =>
{
    console.log("FeedPage");
    return(
      <div >
        <Navbar />
        <Feed />
      </div>
    );
};

export default FeedPage;