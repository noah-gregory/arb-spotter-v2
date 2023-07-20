
require('express');
require('mongodb');

exports.setApp = function ( app, client )
{
    //load user model
    const User = require("./models/user.js");
    //load card model
    const Card = require("./models/cards.js");

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

        const results = await User.find({'Login' : login}).select("-_id");
        
        var id = -1;
        var fn = '';
        var ln = '';
        var ret;

        if( results.length > 0 )
        {
            console.log("there was a hit");
            // id = results[0].UserId;
            fn = results[0].FirstName;
            ln = results[0].LastName;

            // var str = JSON.stringify(results[0]);
            try
            {
                const token = require("./createJWT.js");
                console.log(fn);
                console.log(ln);
                ret = token.createToken(fn,ln);
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
            console.log(e.message);
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

    app.post('/api/signUp', async (req,res,next) =>
    {
        // incoming: FirstName, LastName, Email, Login, Password;
        // outcoming: FirstName, LastName

        var error = '';
        const { firstname, lastname, email, login, password } = req.body;
        var newUser = new User({FirstName: firstname, LastName: lastname, Email: email, Login: login, Password: password});
        
        try
        {
            newUser.save().then(savedUser => {
                savedUser = newUser;
            });
            const token = require("./createJWT.js");
            ret = token.createToken(firstname, lastname);
        }
        catch(e)
        {
            ret = {error:e.message};
        }

        console.log(ret);

        res.status(200).json(ret);    
    });
}




