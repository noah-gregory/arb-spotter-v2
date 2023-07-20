import React, { useState } from 'react';

function Signup()
{
    console.log("Signup.js Start");
    var signupFirstname;
    var signupLastname;
    var signupEmail;
    var signupLogin;
    var signupPassword;

    const [message,setMessage] = useState('');

    const app_name = 'arb-navigator-6c93ee5fc546'
    function buildPath(route)
    {
        console.log("Build Path");
        if (process.env.NODE_ENV === 'production') 
        {
            return 'https://' + app_name +  '.herokuapp.com/' + route;
        }
        else
        {        
            return 'http://localhost:5000/' + route;
        }
    }
    
    const doSignup = async event => 
    {
        event.preventDefault();

        let obj = {firstname:signupFirstname.value,lastname:signupLastname.value,email:signupEmail.value,login:signupLogin.value,password:signupPassword.value};
        let js = JSON.stringify(obj);

        try
        {    
            const response = await fetch(buildPath('api/signUp'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            let res = JSON.parse(await response.text());

            if( res.id <= 0 )
            {
                setMessage('Invalid Signup');
            }
            else
            {
                let user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));

                setMessage('');
                window.location.href = '/login';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };

    return(
      <div id="signupDiv">
        <form onSubmit={doSignup}>
        <span id="inner-title">PLEASE SIGN UP</span><br />
        <input type="text" id="signupFirstname" placeholder="First Name" 
            ref={(c) => signupFirstname = c} /> <br />
        <input type="text" id="signupLastname" placeholder="Last Name" 
            ref={(c) => signupLastname = c} /> <br />
        <input type="text" id="signupEmail" placeholder="Email" 
            ref={(c) => signupEmail = c} /> <br />
        <input type="text" id="signupLogin" placeholder="Username" 
            ref={(c) => signupLogin = c} /> <br />
        <input type="password" id="signupPassword" placeholder="Password" 
            ref={(c) => signupPassword = c} /> <br />
        <input type="submit" id="signupButton" class="buttons" value = "Sign up"
          onClick={doSignup} />
        </form>
        <span id="signupResult">{message}</span>
     </div>
    );
};

export default Signup;