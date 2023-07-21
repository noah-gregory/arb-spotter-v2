// Require mongoose module
let jwt = require('jsonwebtoken');
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

let ud = jwt.decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJmYiIsImxhc3ROYW1lIjoic3dhZyIsImlhdCI6MTY4OTgzMDcwOH0.kJW5dktXNSI_BncrMAahMr2hC0-8RaYnzNq8Z9MUExI', {complete:true});
console.log(ud);


// Create collection of Model


// add something to said collection 




// // add a user to our database
// // this is an instance 

// var user1 = new user({FirstName: "fb", LastName: "swag",  Login: "testaut1o", Password: "123"});

// user1.save().then(savedUser => {
//     savedUser = user;
// });

// console.log("user is made");




