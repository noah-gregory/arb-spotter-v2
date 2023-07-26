// import {useState} from 'react';
// import axios from 'axios';

// const PasswordForgetPage = () => {
//     const [pwd, setPassword] = useState('');
//     const [pwdConfirm, setPasswordConfirm] = useState('');

//     const app_name = 'arb-navigator-6c93ee5fc546'
//     function buildPath(route)
//     {
//         console.log("Build Path");
//         if (process.env.NODE_ENV === 'production') 
//         {
//             return 'https://' + app_name +  '.herokuapp.com/' + route;
//         }
//         else
//         {        
//             return 'http://localhost:5000/' + route;
//         }
//     }

//     const [email, setEmail] = useState('');

//     const doReset = async (e) => {
//         e.preventDefault();

//         var obj = {email:email, password:pwd, newPassword:pwdConfirm};
//         var js = JSON.stringify(obj);

//         try {
//             const response = await axios.post(buildPath('api/passwordReset'), js, {
//                 headers: {
//                 'Content-Type': 'application/json',
//                 },
//             });
//             console.log('Password Reset Successfully:', response.data);
//             } catch (error) {
//             console.error('Error Resetting Password:', error);
//             }
//     }

//     return (
//             (
//                 <section className='login-section'>
//                     <h1>Password Reset</h1>
//                     <form onSubmit={doReset}>
//                         <label>Email:</label>
//                         <input
//                             type="text"
//                             id="email"
//                             autoComplete="off"
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                         <label>New Password:</label>
//                         <input
//                             type="text"
//                             id="password"
//                             autoComplete="off"
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                         <label>Confirm New Password:</label>
//                         <input
//                             type="text"
//                             id="passwordConfirm"
//                             autoComplete="off"
//                             onChange={(e) => setPasswordConfirm(e.target.value)}
//                             required
//                         />
//                         <button className='login-button'>Reset Password</button>
//                     </form>
//                 </section>
//             )
//     )
// }

// export default PasswordForgetPage;


import {useState} from 'react';
import axios from 'axios';

const PasswordForgetPage = () => {
    const [pwd, setPassword] = useState('');
    const [pwdConfirm, setPasswordConfirm] = useState('');

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

    const [email, setEmail] = useState('');

    const doReset = async (e) => {
        e.preventDefault();

        // var obj = {email:email, password:pwd, newPassword:pwdConfirm};
        var obj = {email:email};
        var js = JSON.stringify(obj);

        try {
            const response = await axios.post(buildPath('api/resetPassword'), js, {
                headers: {
                'Content-Type': 'application/json',
                },
            });
            console.log('Password Reset Successfully:', response.data);
            } catch (error) {
            console.error('Error Resetting Password:', error);
            }
            window.location.href = '/login';
    }

    return (
            (
                <section className='login-section'>
                    <h1>Password Reset</h1>
                    <form onSubmit={doReset}>
                        <label>Email:</label>
                        <input
                            type="text"
                            id="email"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button className='login-button'>Send Email</button>
                    </form>
                </section>
            )
    )
}

export default PasswordForgetPage;

