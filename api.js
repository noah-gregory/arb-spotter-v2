require('express');
require('mongodb');
const nodemailer = require('nodemailer');


exports.setApp = function ( app, client )
{
    //load user model
    const User = require("./models/user.js");
    //load card model
    const Card = require("./models/cards.js");
    const Posts = require('./models/post.js');

    const app_name = 'arb-navigator-6c93ee5fc546'
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

    app.post('/api/addcard', async (req, res, next) =>
    {
        // incoming: userId, colo
        // outgoing: error
        let token = require('./createJWT.js');
        const { userId, card, jwtToken } = req.body;
        try
        {
            if( token.isExpired(jwtToken))
            {
                var r = {error:'The JWT is no longer valid', jwtToken: ''};
                res.status(200).json(r);
                return;
            }
        }
        catch(e)
        {
            console.log(e.message);
        }

        const newCard = new Card({ Card: card, UserId: userId });
        var error = '';
        try
        {
            // const db = client.db();
            // const result = db.collection('Cards').insertOne(newCard);
            newCard.save();
        }
        catch(e)
        {
            error = e.toString();
        }

        var refreshedToken = null;
        try
        {
            refreshedToken = token.refresh(jwtToken);
        }
        catch(e)
        {
            console.log(e.message);
        }

        var ret = { error: error, jwtToken: refreshedToken };
        res.status(200).json(ret);
    });

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
        const results = await User.find({'Login' : login, 'Password' : password, 'isVerified' : True});
        
        var id = -1;
        var fn = '';
        var ln = '';
        var ret;

        if( results.length > 0 )
        {
            console.log("there was a hit");
            
            // Get elements of result
            fn = results[0].FirstName;
            ln = results[0].LastName;
            id = results[0]._id;

            // var str =    .stringify(results[0]);
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
        }
        else
        {
            ret = {error:"Login/Password incorrect"};
        }

        console.log(ret);
        res.status(200).json(ret);
    });

    app.post('/api/searchcards', async (req, res, next) =>
    {
        // incoming: userId, search
        // outgoing: results[], error
        let token = require('./createJWT.js');
        var error = '';
        const { userId, search,jwtToken } = req.body;
        try
        {
            if( token.isExpired(jwtToken))
            {
                var r = {error:'The JWT is no longer valid', jwtToken: ''};
                res.status(200).json(r);
                return;
            }
        }
        catch(e)
        {
            console.log(e.message)  
            
        }

        var _search = search.trim();

        // const db = client.db();
        // const results = await
        // db.collection('Cards').find({"Card":{$regex:_search+'.*',
        // $options:'r'}}).toArray();

        const results = await Card.find({ "Card": { $regex: _search + '.*', $options: 'r' } });
        var _ret = [];
        for( var i=0; i<results.length; i++ )
        {
            _ret.push( results[i].Card );
        }

        var refreshedToken = null;

        try
        {
            refreshedToken = token.refresh(jwtToken);
        }
        catch(e)
        {
            console.log(e.message);
        }

        var ret = { results:_ret, error: error, jwtToken: refreshedToken };
    });
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
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            emailToken: emailKey,
            isVerified: false,
            Email: req.body.Email,
            Login: req.body.Login,
            Password: req.body.Password
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
             if (num)
             {
                
                console.log("login exists");
                 res.status(400).send({error: 'Login already exists'});
                
             }
             const num2 = await User.findOne({'Email' : newUser.Email})
             if (num2)
             {
                console.log("email exists");
                return res.status(400).send({error: 'Email already exists'});
                
             }
            
             await transporter.sendMail({
                from: 'arbnavigator01@gmail.com',
                to: req.body.Email,
                subject: 'Account Verification',
                html: `<p>Hello ${req.body.Login},</p><p>Please click the following link to verify your account: <a href="${verificationLink}">${verificationLink}</a></p>`,
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
            ret = token.createToken1(req.body.FirstName, req.body.LastName, req.body.Email, req.body.Login, req.body.Password, newUserSaved[0]._id);
            console.log("user has been added, unverified");
        
      

        console.log(ret);

    res.status(200).json(ret);  
           
    });
    app.get('/verify/:token', async (req, res) => {
        try
        {
            const token = req.params.token;
            console.log("in verifyToken");
            const user = await User.findOne({'emailToken' : token});
            if(!user)
            {
                return res.status(404).json({message: 'The token is not vaild. Please contact the admins for support'});
            }
            user.isVerified = true;
            user.emailToken = undefined;
            await user.save();
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
     var results = await Posts.find({"xCoord" : {$ne : null}}).sort({dateCreated : -1}).select('_id');
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
        const searchTerm = req.body;
        try {
        
            const searchregex = new RegExp(searchTerm, 'i');
            var results =  await Posts.find( {
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
            return res.status(400).send({error: 'Error fetching posts'});
        }
         res.status(200).send({results});
    })
}
