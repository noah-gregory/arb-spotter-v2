import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
function Login()
{
var bp = require('./Path.js');
var storage = require('../tokenStorage.js');
var loginName;
var loginPassword;
const [message,setMessage] = useState('');
const doLogin = async event =>
{
event.preventDefault();
var obj = {login:loginName.value,password:loginPassword.value};
var js = JSON.stringify(obj);
var config =
{
method: 'post',
url: bp.buildPath('api/login'),
headers:
{
'Content-Type': 'application/json'
},
data: js
};
axios(config)
.then(function (response)
{
    console.log("is axios working?");
var res = response.data;
if (res.error)
{
setMessage('User/Password combination incorrect');
}
else
{
console.log("before jwt");
storage.storeToken(res);

// var jwt = require("jwt-decode");
console.log("is jwt working?");
var ud = jwt_decode(storage.retrieveToken());

var firstName = ud.firstName;
var lastName = ud.lastName;
console.log(firstName);
console.log(lastName);
var user = {firstName:firstName,lastName:lastName};
localStorage.setItem('user_data', JSON.stringify(user));
window.location.href = '/signup';
}
})
.catch(function (error)
{
console.log(error);
});
}
return(
<div id="loginDiv">
<span id="inner-title">PLEASE LOG IN</span><br />
<input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c} /><br
/>
<input type="password" id="loginPassword" placeholder="Password" ref={(c) =>
loginPassword = c} /><br />
<input type="submit" id="loginButton" class="buttons" value = "Do It"
onClick={doLogin} />
<span id="loginResult">{message}</span>
</div>
);
};
export default Login;