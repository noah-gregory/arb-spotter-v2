import { useRef, useState, useEffect} from "react";
import { Container, Col, Row } from "react-bootstrap";
import { faCheck , faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import axios from 'axios';
import { Link} from "react-router-dom";

const FNAME_REGEX = /^[A-Za-z]+$/;
// must contain only letters
const LNAME_REGEX = /^[A-Za-z]+$/;
// must contain only letters
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// must start with a letter.
// must be 4 to 24 characters.
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// must have 1 lower case letter.
// must have 1 upper case letter.
// must have 1 digit.
// must have 1 special character.
// must have 8 to 24 characters.

const SignupPage = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [fname, setFname] = useState('');
    const [validFname, setValidfName] = useState(false);
    const [fnameFocus, setFnameFocus] = useState(false);

    const [lname, setLname] = useState('');
    const [validLname, setValidlName] = useState(false);
    const [lnameFocus, setLnameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidfName(FNAME_REGEX.test(fname));
    }, [fname])

    useEffect(() => {
        setValidlName(LNAME_REGEX.test(lname));
    }, [lname])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
    }, [pwd])

    useEffect(() => {
        setErrMsg('');
    }, [fname, lname, email, user, pwd])

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

    const doSignup = async (e) => {
        setErrMsg('');
        e.preventDefault();
        console.log("doSignup");

        let obj = {firstname:fname,lastname:lname, email:email,login:user,password:pwd};
        let js = JSON.stringify(obj);

        // if button enabled with JS hack
        const v1 = FNAME_REGEX.test(fname);
        const v2 = LNAME_REGEX.test(lname);
        const v3 = EMAIL_REGEX.test(email);
        const v4 = USER_REGEX.test(user);
        const v5 = PWD_REGEX.test(pwd);
        if (!v1 || !v2 || !v3 || !v4 || !v5) {
            setErrMsg("Invalid Entry");
            return;
        }
            
        try
        {    
            const response = await fetch(buildPath('api/signUp'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            let res = JSON.parse(await response.text());

            if(res.accessToken){
                let thisUser = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                localStorage.setItem('user_data', JSON.stringify(thisUser));

                window.location.href = '/checkemail';
            }
            else
            {
                setErrMsg("Email or Username already in use");
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };
    
    return (
            (   
                <section className="login-section">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form>
                        <label htmlFor="firstname">
                            First name:
                            <FontAwesomeIcon icon={faCheck} className={validFname ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validFname|| !fname ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setFname(e.target.value)}
                            value={fname}
                            required
                            aria-invalid={validFname ? "false" : "true"}
                            aria-describedby="fnamenote"
                            onFocus={() => setFnameFocus(true)}
                            onBlur={() => setFnameFocus(false)}
                        />
                         <p id="fnamenote" className={fnameFocus && fname && !validFname ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must contain letters only.<br />
                        </p>

                        <label htmlFor="lastname">
                            Last name:
                            <FontAwesomeIcon icon={faCheck} className={validLname ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validLname || !lname ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="lasttname"
                            autoComplete="off"
                            onChange={(e) => setLname(e.target.value)}
                            value={lname}
                            required
                            aria-invalid={validLname? "false" : "true"}
                            aria-describedby="lnamenote"
                            onFocus={() => setLnameFocus(true)}
                            onBlur={() => setLnameFocus(false)}
                        />
                        <p id="lnamenote" className={lnameFocus && lname && !validLname ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must contain letters only.<br />
                        </p>

                        <label htmlFor="email">
                            Email:
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="email"
                            id="email"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="emailnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must be a vaild email address.
                        </p>

                        <label htmlFor="username">
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>


                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>

                        <button onClick={doSignup} className="login-button" disabled={!validName || !validPwd || !validEmail || !validFname ? true : false}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            <Link to="/">Login</Link>
                        </span>
                    </p>
                </section>
            )
    )
}

export default SignupPage;

