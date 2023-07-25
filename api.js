const multer = require('multer');
var fs = require('fs');
require('express');
require('mongodb');


exports.setApp = function ( app, client )
{
    //load user model
    const User = require("./models/user.js");
    //load post model
    const Post = require("./models/post.js");

    const upload = multer({
        limits: {
          fieldSize: 50 * 1024 * 1024, // 50 MB (adjust as needed)
        },
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
        const results = await User.find({'Login' : login, 'Password' : password});
        
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
        }
        else
        {
            ret = {error:"Login/Password incorrect"};
        }

        console.log(ret);
        res.status(200).json(ret);
    });

    app.post('/api/signUp', async (req,res,next) =>
    {
        // incoming: FirstName, LastName, Email, Login, Password;
        // outcoming: FirstName, LastName
        var error = '';
        var newUserSaved;
        // const { firstname, lastname, email, login, password } = req.body;
        // var newUser = new User({FirstName: firstname, LastName: lastname, Email: email, Login: login, Password: password});
        
        var newUser =new User({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            Login: req.body.Login,
            Password: req.body.Password
        })
            // newUser.save().then(savedUser => {
            //     savedUser = newUser;
            // });
             const num = await User.findOne({'Login' : newUser.Login})
             if (num)
             {
                
                console.log("login exists");
                return res.status(400).send({error: 'Login already exists'});
                
             }
             const num2 = await User.findOne({'Email' : newUser.Email})
             if (num2)
             {
                console.log("email exists");
                return res.status(400).send({error: 'Email already exists'});
                
             }
            
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
            ret = token.createToken(req.body.FirstName, req.body.LastName, req.body.Email, req.body.Login, req.body.Password, newUserSaved[0]._id);
            console.log("user has been added");
        
      

        console.log(ret);   
        res.status(200).json(ret);  

    });

    app.get('/api/returnLastest', async (req,res,next) =>
    {
        // returns an json of all posts' object _ids, sorted by the time theyre uploaded
        try
        {
            var results = await Post.find({"xCoord" : {$ne : null}}).sort({dateCreated : -1}).select('_id');
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
    });

    app.post('/api/search', async (req,res,next) =>
    {
        const searchTerm = req.body;
        try {
        
            const searchregex = new RegExp(searchTerm, 'i');
            var results =  await Post.find( {
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
    });

    // app.post('/api/uploadImage', upload.single('file'), async (req,res,next) =>
    // {
    //     if (!req.file) {
    //         return res.status(400).send('No file uploaded.');
    //     }
    //     res.status(200).send('File uploaded successfully.');        
    // });

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

    app.post('/api/deletePost', async (req,res,next) =>
    {
        try {
            var results =  await Post.deleteOne({'_id':req.body});
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

}
