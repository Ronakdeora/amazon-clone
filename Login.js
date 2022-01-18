import React, { useState } from 'react'
import './Login.css'
import { Link ,useHistory } from 'react-router-dom';
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "firebase/auth"
import { auth } from './firebase';

function Login() {
    const history = useHistory() //allow us to change the url progamatically
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e =>{
        e.preventDefault();

        signInWithEmailAndPassword(auth , email , password).then( auths =>{
            history.push('/')
        }).catch(error => alert(error.message + ' you piece of shit'))
    }

    const register = e =>{

        e.preventDefault();

        createUserWithEmailAndPassword( auth ,email,password).then((auths) => {
            if(auths) {
                history.push('/')
            }
        }).catch(error => alert(error.message + ' you piece of shit'))
    }

    return (
        <div className='login'>
            <Link to='/'>
                <img  className='login_logo' 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" alt="" />
            </Link>

            <div className="login_container">
                <h1>
                    Sign-In
                </h1>
                <form>

                    <h5>E-mail</h5>
                    <input type="text" value={email} 
                    onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type="password" value={password}
                        onChange={e => setPassword(e.target.value)} />

                    <button onClick={signIn} type='submit' className='login_signInButton'>Sign In</button>
                </form>
                <p>
                    By signing-in you agre to Amazon's conditions of use & sale. 
                    Please see our Privacy Notice, our Cookies Notice and our
                     Interest-Based ads
                </p>
                
                <button onClick={register} className='login_registerButton'>
                    Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login
