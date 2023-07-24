// Require mongoose module
let jwt_decode = require('jwt-decode');
const mongoose = require('mongoose');
const user = require('./user.js');
const posts = require('./post.js');
  
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

// var results =  await user.find({'Login' : 'Kei111'});


// // this function searches all with the login "fb"

async function searchall()  {
    try {
        const searchval = "fb";
        const searchregex = new RegExp(searchval, 'i');
        var results =  await user.find( {'Login' : searchregex});
        if(results){
            console.log(JSON.stringify(results));
        }
    }catch (e)
    {
        console.log(e);
    }
    
}
// searchall();
// add something to said collection 


 // // returns all posts 
async function returnall()
{
    try
    {
     var results = await posts.find({"xCoord" : {$ne : null}}).sort({dateCreated : -1}).select('dateCreated -_id');
     if(results)
     {
        console.log(JSON.stringify(results));
     }   
    }
    catch(e)
    {
        console.log(e);
    }
}
// returnall();

async function create10posts()
{
    
	var x = 0;
   
    while(x < 100){
        try
    {
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes();
        var newPost = new posts({poster: "kei", xCoord: Math.floor(Math.random() * 100), yCoord: Math.floor(Math.random() * 100), tags: ["hi", "cute", "funny"] });
        newPost.save().then(savedPost =>{
            savedPost = newPost;
        })
        x+=10;
       
        console.log("user is made");
    }
    catch(e)
    {
        console.log(e);
    }
   
    }
    
}

// create10posts();
// returnall();


async function deleteAll()
{
    try
    {
        await posts.deleteMany();
        console.log("all posts have been deleted");
    }
    catch(e)
    {
        console.log(e);
    }
}
// deleteAll();


async function search()
{
    try {
        const searchval = "fb";
        const searchregex = new RegExp(searchval, 'i');
        var results =  await posts.find( {
            $or: [
              {poster: searchregex},
              {tags: searchregex}
            ]});
        if(results){
            console.log(JSON.stringify(results));
        }
    }catch (e)
    {
        console.log(e);
    }
}

search();
// // add a user to our database
// // this is an instance 

// var user1 = new user({FirstName: "fb", LastName: "swag", Email: "yausddsau@yahoo.com" , Login: "Kei111", Password: "123"});

// user1.save().then(savedUser => {
//     savedUser = user;
// });

// console.log("user is made");