import React from "react";
import { Card, Container, Col,Row } from "react-bootstrap";
import { useState} from "react";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

const Feed = () => {
  var [searchData, setSearch] = useState('');
  var [response, setData] = useState('');
  var [condition, setCondition] = useState(false);
  // var tag1_exists = card.tags[0] != "";
  // console.log(response);

  const renderCard = (card, index) => {
    var tag1_exists = true;
    var tag2_exists = true;
    var tag3_exists = true;
    if(card.tags[0] === undefined || card.tags[0] == ''){
      tag1_exists = false;
    }
    if(card.tags[1] === undefined || card.tags[1] == ''){
      tag2_exists = false;
    }
    if(card.tags[2] === undefined || card.tags[2] == ''){
      tag3_exists = false;
    }
    return (
      <Card style={{ width: "8rem" }} key={index} className="box">
         <Card.Title className="posterbox">{card.poster}</Card.Title>
        <Container className="image__box">
          <Card.Img variant="top"  src={`data:image/jpeg;base64,${card.image}`} className="post-image" />
        </Container>
        <Card.Body className="text__box">
          <Card.Text className="caption__box">{card.caption}</Card.Text>
          <Container className="fluid tag__box">
            {tag1_exists && <Col style={{ width: '33%' }}><Card.Text className="tags text-center">{card.tags[0]}</Card.Text></Col>}
            {tag2_exists && <Col style={{ width: '33%' }}><Card.Text className="tags text-center">{card.tags[1]}</Card.Text></Col>}
            {tag3_exists && <Col style={{ width: '33%' }}><Card.Text className="tags text-center">{card.tags[2]}</Card.Text></Col>}
          </Container>
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

        const userDetails = JSON.parse(localStorage.getItem('user_data'));
        console.log(userDetails);
        let obj = {search:userDetails.id};
        let js = JSON.stringify(obj);

        response = await axios.post(buildPath('api/searchUser'), js, {
            headers: {
            'Content-Type': 'application/json',
            }
        });
        console.log("!!!!");
        setData(response.data);
        setCondition(true);
    };

    doSearch();

  return (
    <div>
        {condition && <div className="grid">{response.map(renderCard)}</div>}
    </div>
  )
};

export default Feed;


