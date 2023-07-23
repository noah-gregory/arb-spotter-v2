import { useRef, useState, useEffect} from 'react';
import { Link, useHistory} from "react-router-dom";

export const verifyEmailPage = () => {
    const history = useHistory();

    useEffect( () => {
        setTimeout( () => {
            history.push('/');

        }, 3000);

    }, [history]);

    return (
        <div className = "content-container">
            <h1>Please verify your email adres</h1>
        </div>
    )
}
