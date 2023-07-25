import { useRef, useState, useEffect} from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Link} from "react-router-dom";

const LoginPage = () => {

    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const doLogin = async (e) => {
        e.preventDefault();

        var obj = {login:user,password:pwd};
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
        console.log(res.error);
    if (res.error == "Login/Password incorrect")
    {
        setErrMsg('User/Password combination incorrect');
    }else if (res.error === "Email is not verified")
    {
        setErrMsg('Email is not verified');
    }
    else
    {
        console.log("before jwt");
        storage.storeToken(res);

        var jwt = require("jwt-decode");
        var ud = jwt_decode(storage.retrieveToken(),{complete:true});

        var userId =ud.userId;
        var firstName = ud.firstName;
        var lastName = ud.lastName;

        var user = {firstName:firstName,lastName:lastName};
        localStorage.setItem('user_data', JSON.stringify(user));
        window.location.href = '/feed';
    }
    })
    .catch(function (error)
    {
    console.log(error);
    });
    }

    return (
        
            (
                <section className='login-section'>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={doLogin}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button className='login-button'>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            <Link to="/Signup">Sign Up</Link> 
                            <div><Link to="/reset">Reset Password</Link></div>
                        </span>
                    </p>
                </section>
            )
    )
}

export default LoginPage


