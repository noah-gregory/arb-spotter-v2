const multer = require('multer');
var fs = require('fs');
require('express');
require('mongodb');
const nodemailer = require('nodemailer');


exports.setApp = function ( app, client )
{
    //load user model
    const User = require("./models/user.js");
    //load card model
    const Card = require("./models/cards.js");
    //load post model
    const Post = require("./models/post.js");

    const upload = multer({
        limits: {
          fieldSize: 50 * 1024 * 1024, // 50 MB (adjust as needed)
        },
      });

      const app_name = 'arb-navigator-6c93ee5fc546';
      function buildPath(route)
      {
          
          if (process.env.NODE_ENV === 'production') 
          {
              return 'https://' + app_name +  '.herokuapp.com/' + route;
          }
          else
          {        
              return 'http://localhost:3000/' + route;
          }
      }
    

      app.post('/api/login', async (req, res, next) =>
      {
          // incoming: login, password
          // outgoing: id, firstName, lastName, error
  
          var error = '';
          const { login, password } = req.body;
          console.log(login);
          console.log(password);
  
          // const db = client.db();
          // const results = await
          // db.collection('Users').find({Login:login,Password:password}).toArray();
  
          // Attempt to find user in database with provided login and password
          const results = await User.find({'Login' : login, 'Password' : password});
          
          var id = -1;
          var fn = '';
          var ln = '';
          var ret;
          console.log(results[0]);
          if( (results.length > 0 ) )
          {
              if( results[0].isVerified == true){
              console.log("there was a hit");
              
              // Get elements of result
              fn = results[0].FirstName;
              ln = results[0].LastName;
              id = results[0]._id;
  
              // var str = JSON.stringify(results[0]);
              try
              {
                  const token = require("./createJWT.js");
                  console.log(fn);
                  console.log(ln);
                  ret = token.createToken(fn, ln, id);
              }
              catch(e)
              {
                  ret = {error:e.message};
              }
          }else if(results[0].isVerified == false)
          {
              ret = {error:"Email is not verified"};
          }
      }
          else
          {
              ret = {error:"Login/Password incorrect"};
          }
  
          console.log(ret);
          res.status(200).json(ret);
      });

   

    // app.post('/api/signUp', async (req,res,next) =>
    // {
    //     // incoming: FirstName, LastName, Email, Login, Password;
    //     // outcoming: FirstName, LastName

    //     var error = '';
    //     const { firstname, lastname, email, login, password } = req.body;
    //     var newUser = new User({FirstName: firstname, LastName: lastname, Email: email, Login: login, Password: password});
        
    //     try
    //     {
    //         newUser.save().then(savedUser => {
    //             savedUser = newUser;
    //         });
    //         const token = require("./createJWT.js");
    //         ret = token.createToken(firstname, lastname);
    //     }
    //     catch(e)
    //     {
    //         ret = {error:e.message};
    //     }

    //     console.log(ret);

    //     res.status(200).json(ret);    
    // });

    const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    app.post('/api/signUp', async (req,res,next) =>
    {
        // incoming: FirstName, LastName, Email, Login, Password;
        // outcoming: FirstName, LastName

        var error = '';
        var newUserSaved;
        var emailKey = genRanHex(16);
        console.log(emailKey);
        // const { firstname, lastname, email, login, password } = req.body;
        // var newUser = new User({FirstName: firstname, LastName: lastname, Email: email, Login: login, Password: password});
        
        var newUser =new User({
            FirstName: req.body.firstname,
            LastName: req.body.lastname,
            emailToken: emailKey,
            isVerified: false,
            Email: req.body.email,
            Login: req.body.login,
            Password: req.body.password
        });
       
       
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            
            auth: {
              user: 'arbnavigator01@gmail.com',
              pass: 'yusssvlqxdguglpo',
            },
          }); 
          const verificationLink = buildPath('verify/'+ newUser.emailToken);
            // newUser.save().then(savedUser => {
            //     savedUser = newUser;
            // });

             var num = await User.findOne({'Login' : newUser.Login})
             console.log(num);
             console.log(newUser.Login);
             if (num)
             {
                
                console.log("login exists");
                return res.status(500).send({error: 'Username already exists'});
                
             }
             const num2 = await User.findOne({'Email' : newUser.Email})
             if (num2)
             {
                console.log("email exists");
                return res.status(500).send({error: 'Email already exists'});
                
             }
            
             await transporter.sendMail({
                from: 'arbnavigator01@gmail.com',
                to: req.body.email,
                subject: 'Account Verification',
                html: `<p>Hello ${req.body.login},</p><p>Please click the following link to verify your account: <a href="${verificationLink}">${verificationLink}</a></p>`,
              });
            const savedUser = await newUser.save(); 
            try{
                 newUserSaved = await User.find({'Login' : newUser.Login, 'Password' : newUser.Password});
            }
            catch(e)
            {
                console.log("Error finding user");        
            }
           
            console.log(newUser.FirstName);
            const token = require("./createJWT.js");
            ret = token.createToken1(req.body.firstName, req.body.lastName, req.body.email, req.body.login, req.body.password, newUserSaved[0]._id);
            console.log("user has been added, unverified");
        
      

        console.log(ret);

    res.status(200).json(ret);  
           
    });
    app.get('/api/verify/:token', async (req, res) => {
        console.log("in verifyToken");
        try
        {
            const token = req.params.token;
           
            const user = await User.findOne({'emailToken' : token});
            console.log(user);
            if(!user)
            {
                return res.status(404).json({message: 'The token is not vaild. Please contact the admins for support'});
            }
            user.isVerified = true;
            user.emailToken = undefined;
            await user.save();
            console.log("success");
            return res.status(200).json({message: "Success"});
        } catch(e)
        {
            console.error('Error vaildating email', e);
            res.status(500).json({ message: 'An error occurred while verifying the email.' });
        }
    }); 

    app.get('/api/returnLastest', async (req,res,next) =>
    {
        // returns an json of all posts' object _ids, sorted by the time theyre uploaded

    try
    {
     var results = await Posts.find().sort({dateCreated : -1}).select('_id');
     if(results)
     {
        console.log(JSON.stringify(results));
     }   
    }
    catch(e)
    {
        console.log(e);
        return res.status(400).send({error: 'Error fetching posts'});

    }
    res.status(200).json(results); 
    })
    
    app.post('/api/search', async (req,res,next) =>
    {
        const searchTerm = req.body.search;
        console.log(searchTerm);
        try {
            const searchregex = new RegExp(searchTerm, 'i');
            var results =  await Post.find( {
                $or: [
                  {poster: searchregex},
                  {tags: searchregex}
                ]});
            if(results){
                console.log("hi");
                // console.log(JSON.stringify(results));
            }
        }catch (e)
        {
            console.log(e);
            return res.status(400).send({error: 'Error fetching posts'});
        }
         res.status(200).send(results);
    });

    app.post('/api/uploadPost', upload.single('json'), async (req,res,next) =>
    {
        // incoming: poster, image, tags
        // outgoing: json(savedPost)
        var savedPost;
        const jsonData = JSON.parse(req.body.json);
        var newPost = new Post({poster: jsonData.poster, 
                                image: jsonData.image,
                                caption: jsonData.caption,
                                tags: jsonData.tags});
        
        try
        {
            newPost.save().then(savedPost => {
                savedPost = newPost;
            });
            res.status(200).json(savedPost); // uploaded post successfully
        }
        catch(e)
        {
            res.status(400).json({message: e});
        }
    });

    app.post('/api/searchUser', async (req,res,next) =>
    {
        const searchTerm = req.body.search;
        try {
            const searchregex = new RegExp(searchTerm, 'i');
            var results =  await Post.find( {
                $or: [
                  {poster: searchregex},
                ]});
            if(results){
                console.log("searchUser Success");
                // console.log(JSON.stringify(results));
            }
        }catch (e)
        {
            console.log(e);
            return res.status(400).send({error: 'Error fetching posts'});
        }
         res.status(200).send(results);
    });

    app.post('/api/deletePost', async (req,res,next) =>
    {
        console.log(req.body.search);
        try {
            var results =  await Post.deleteOne({'_id':req.body.search});
            if(results){
                console.log("Successfully deleted");
            }
        }catch (e)
        {
            console.log(e);
            return res.status(400).send({error: 'Error deleting post'});
        }
         res.status(200).send({results});
    });

    app.post('/api/resetPassword', async (req,res,next) =>
    {
        
        var emailKey = genRanHex(16);
        console.log(emailKey);
        const { email } = req.body;
        const results = await User.find({'Email' : email});

        if( (results.length > 0 ) )
        {
            
            var user = await User.findOne({'Email' : email});
            user.emailToken = emailKey;

            await user.save();

            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                
                auth: {
                  user: 'arbnavigator01@gmail.com',
                  pass: 'yusssvlqxdguglpo',
                },
              }); 
              console.log(user.Login);
            var link = buildPath('reset/'+ emailKey);
            await transporter.sendMail({
                from: 'arbnavigator01@gmail.com',
                to: user.Email,
                subject: 'Password Reset',
                html: `<p>Hello ${user.Login},</p><p>Please click the following link to reset your password: <a href="${link}">${link}</a></p>`,
              });

           var ret = {message: "Email sent successfully"};
        }   
        else
        {
            ret = {error:"Email is unvalid or is not associated with a verified account."};
        }

        console.log(ret);
        res.status(200).json(ret);

    });

    app.post('/api/reset/:token', async (req, res, next) => {
        console.log("in resettoeken");

        try
        {
            const token = req.params.token;
            const { firstPassword, secondPassword } = req.body;
            console.log(firstPassword);
            var user = await User.findOne({'emailToken' : token});
            console.log(user);
            if(!user)
            {
                
                return res.status(404).json({message: 'The token is not vaild. Please contact the admins for support'});
            }
            user.emailToken = undefined;
            if(firstPassword == secondPassword){
                user.Password = firstPassword;
                await user.save();
                console.log("success");
                return res.status(200).json({message: "Success"});
            }else{
                return res.status(500).json({message: "Passwords are not matching"});
            }
            
            
        } catch(e)
        {
            console.error('Error changing password ', e);
            res.status(500).json({ message: 'Error changing password' });
        }
        
    });
}
