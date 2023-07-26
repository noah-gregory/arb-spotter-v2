const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createToken = function ( fn, ln, id)
{
    return _createToken( fn, ln, id);
}
exports.createToken1 = function ( fn, ln, email, username, password, id)
{
    return _createToken1(fn, ln, email, username, password, id);
}

_createToken = function ( fn, ln , id)
{
    try
    {

    const user = {firstName:fn,lastName:ln,id:id};
    const accessToken = jwt.sign( user, process.env.ACCESS_TOKEN_SECRET);
  
    // var ret = {accessToken:accessToken,fn:fn,ln:ln,id:id};
    var ret = {accessToken:accessToken};

    }
    catch(e)
    {
        var ret = {error:e.message};
    }
    return ret;
}
_createToken1 = function ( fn, ln , email, username, password, id)
{
    try
    {

    const user = {firstName:fn,lastName:ln,email:email,username:username,password:password,id:id};
    const accessToken = jwt.sign( user, process.env.ACCESS_TOKEN_SECRET);
  
    // var ret = {accessToken:accessToken,fn:fn,ln:ln,id:id};
    var ret = {accessToken:accessToken};

    }
    catch(e)
    {
        var ret = {error:e.message};
    }
    return ret;
}

exports.isExpired = function( token )
{
    var isError = jwt.verify( token, process.env.ACCESS_TOKEN_SECRET,
    (err, verifiedJwt) =>
    {
        if( err )
        {
            return true;
        }
        else
        {
            return false;
        }
    });
    return isError;
}

exports.refresh = function( token )
{
    let ud = jwt.decode(token,{complete:true});

    let firstName = ud.payload.firstName;
    let lastName = ud.payload.lastName;
    let Id = ud.payload._id;
    return _createToken( firstName, lastName ,Id);
}