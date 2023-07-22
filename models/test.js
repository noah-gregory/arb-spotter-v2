// Require mongoose module
let jwt_decode = require('jwt-decode');
const mongoose = require('mongoose');
const user = require('./user.js');
  
// Set Up the Database connection
mongoose.connect(
    'mongodb+srv://COP4331:COP4331C@cluster0.5gewmlg.mongodb.net/ArbNavigator?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  
console.log("connected to mongodb");
// Defining User schema

// Defining User model

// let ud = jwt_decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJmYiIsImxhc3ROYW1lIjoic3dhZyIsImlkIjoiNjRiMGU3NWQ4OWExODVkYjg1MTNkZTUyIiwiaWF0IjoxNjg5ODk3OTQwfQ.gmeH06KY6t7hkEuPro8GhajzDzr7zo3qHWq8fPEBJps');
// console.log(ud);

  
// Create collection of Model


// add something to said collection 




// // add a user to our database
// // this is an instance 

var user1 = new user({FirstName: "fb", LastName: "swag",  Login: "Kei111", Password: "123"});

user1.save().then(savedUser => {
    savedUser = user;
});

console.log("user is made");




