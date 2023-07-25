import React from 'react';
import Feed from '../components/Feed';
import SearchBar from '../components/SearchBar';

const FeedPage = () =>
{
    console.log("FeedPage");
    return(
      <div >
        {/* <SearchBar /> */}
        <Feed />
      </div>
    );
};

export default FeedPage;