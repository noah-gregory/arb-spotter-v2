import React from "react";
import { Card, Container, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"

const Feed = () => {
  var [response, setData] = useState('');
  var [condition, setCondition] = useState(false);
  var [message, setMessage] = useState(false);

  useEffect(() => {
    doSearch();
  }, []);

  // var tag1_exists = card.tags[0] != "";
  // console.log(response);

  const doSearch = async () => {
    // e.preventDefault();

    const userDetails = JSON.parse(localStorage.getItem('user_data'));
    let obj = {search:userDetails.username};
    let js = JSON.stringify(obj);

    response = await axios.post(buildPath('api/searchUser'), js, {
        headers: {
        'Content-Type': 'application/json',
        }
    });
    setData(response.data);
    setCondition(true);
    console.log(response.data.length);
    if(response.data.length == 0){
      setMessage(true);
    }
    else{
      setMessage(false);
    }
};

const doDelete = async (id) => {
  if(window.confirm("Are you sure you want to delete this post?")){
    let obj = {search:id};
    let js = JSON.stringify(obj);

    response = await axios.post(buildPath('api/deletePost'), js, {
          headers: {
          'Content-Type': 'application/json',
          }
    });
    doSearch();
  };
}
  

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
         <Card.Title className="posterbox"><button className="delete-btn" onClick={() => doDelete(card._id)}><FontAwesomeIcon icon={faTrashCan} style={{color: "#f7f7f7"}} /></button>{card.poster}</Card.Title>
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
  return (
    <div>
        {message && <h1>Oh no! You have no posts!</h1>}
        {condition && <div className="grid-delete">{response.map(renderCard)}</div>}
    </div>
  )
};

export default Feed;


