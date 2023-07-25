import React from "react";
import { Card } from "react-bootstrap";
import { useState} from "react";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

const Feed = () => {
  var [searchData, setSearch] = useState('');
  var [response, setData] = useState('');
  var [condition, setCondition] = useState(false);
  // console.log(response);

  const renderCard = (card, index) => {
    console.log("Printing");
    return (
      <Card style={{ width: "8rem" }} key={index} className="box">
         <Card.Title variant="top">{card.poster}</Card.Title>
        <Card.Img variant="top"  src={`data:image/jpeg;base64,${card.image}`} className="post-image" />
        <Card.Body>
          <Card.Text>{card.caption}</Card.Text>
          <Card.Text className="tags">{card.tags[0]}</Card.Text>
          <Card.Text className="tags">{card.tags[1]}</Card.Text>
          <Card.Text className="tags">{card.tags[2]}</Card.Text>
        </Card.Body>
      </Card>
    );
  };

    const app_name = 'arb-navigator-6c93ee5fc546';
    function buildPath(route)
    {
        console.log("Build Path");
        if (process.env.NODE_ENV === 'production') 
        {
            return 'https://' + app_name +  '.herokuapp.com/' + route;
        }
        else
        {        
            return 'http://localhost:5000/' + route;
        }
    }

    const doSearch = async () => {
        // e.preventDefault();
        console.log(searchData);
        let obj = {search:searchData};
        let js = JSON.stringify(obj);

        response = await axios.post(buildPath('api/search'), js, {
            headers: {
            'Content-Type': 'application/json',
            }
        });
        console.log("!!!!");
        setData(response.data);
        setCondition(true);
        
    };

  return (
    <div>
        <div className="search">
        <input
            className="search__input"
            type="text"
            id="search"
            onChange={(e) => setSearch(e.target.value)}
        />
        <button className="search__button" onClick={doSearch}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
        </div>
        {condition && <div className="grid">{response.map(renderCard)}</div>}
      </div>
  )
};

export default Feed;


