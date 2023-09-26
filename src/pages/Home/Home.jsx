import './Home.css';

import discord from '../../assets/discord.svg';
import github from '../../assets/github.svg';
import lnkedIn from '../../assets/linkedIn.svg';
import twitter from '../../assets/twitter.svg';
import apple from '../../assets/apple.svg';
import google from '../../assets/google.svg';

import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';

import { useLogin } from '../../';

export const Home = () => {

    // const handleToken = async token => {
    //     console.log('hanldeToken triggered')
    //     try{
    //         const fetchUser = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token.access_token}`, {
    //             headers: {
    //                 Authorization: `Bearer ${token.access_token}`,
    //                 Accept: 'application/json'
    //             }
    //         })

    //         console.log(fetchUser);
           
    //     }

    //     catch(eror){
    //         throw eror;
    //     }
    // }

    
    const [ showRegisterUser, setShowRegisterUser ] = useState(false);

    const { navigate, setIsLoggedIn } = useLogin()

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        navigate('/dashboard');
    }

    const login = useGoogleLogin({
        onSuccess: tokenResponse => handleLoginSuccess(),
        onError: res => navigate('/error')
    })

    return <div className='home-container' >
        <nav>
            <span className='logo-text' > logo </span>
        </nav>

        <section>
        <div className='logo-text' > Logo </div>
        <h1> Board. </h1>
        <div className='socials' > 
            <a href='https://github.com/'  target='_blank' title='Gtihub' ><img src={github} alt='github' /> </a>
            <a href='https://discord.com/'  target='_blank' title='Discord' ><img src={discord} alt='discord' /> </a>
            <a href='https://www.linkedin.com/'target='_blank' title='Linked In' ><img src={lnkedIn} alt='github' /> </a>
            <a href='https://twitter.com/'  target='_blank' title='Twitter' ><img src={twitter} alt='twitter' /> </a>
        </div>
        </section>

        <section className='home-section2' >
            <div className={`signIn-login-parent ${showRegisterUser ? 'show-register' : ''} `} >
                <div className='sign-in-container' >
                    <div className='container-sign-in-text' >
                        <div className='head' > Sign In</div>
                        <div> Sign in into your account </div>
                    </div>
                    <div className='container-sign-in-with' >
                        <button onClick={ () => login() } > <img src={google} alt='google' /> Sign in with google </button>
                        <button> <img src={apple} alt='apple' /> Sign in with apple </button>
                    </div>
                    <form className='sign-in-form' >
                        <label> Email address <input type='text' required/> </label>
                        <label> Password <input type='password' required/> </label>
                        <div> Forgot Password? </div>
                        <button> Sign In </button>
                    </form>
                    <div className='container-no-account' > <span className='gray-font' > Dont have an account? </span> <span className='register-link' onClick={ () => setShowRegisterUser(true) } > Register here </span> </div>
                </div>

                <div className='register-container' >
                <div className='container-sign-in-text' >
                        <div className='head' > New User </div>
                        <div> Create New account </div>
                    </div>
                    <form className='sign-in-form' >
                        <label> Email address <input type='text' required/> </label>
                        <label> Password <input type='password' required/> </label>
                        <label> Confirm Password <input type='password' required/> </label>
                        <button> Create My Account </button>
                    </form>
                    <div className='container-no-account' > <span className='gray-font' > Already have an account? </span> <span className='register-link' onClick={ () => setShowRegisterUser(false) } > SignIn here </span> </div>
                </div>
            </div>
        </section>

        <footer>
            <h1> Bard. </h1>
            <div> Join us on our socials  </div>
            <div className='socials' > 
                <a href='https://github.com/' title='Gtihub' ><img src={github} alt='github' /> </a>
                <a href='https://discord.com/' title='Discord' ><img src={discord} alt='discord' /> </a>
                <a href='https://www.linkedin.com/' title='Linked In' ><img src={lnkedIn} alt='github' /> </a>
                <a href='https://twitter.com/' title='Twitter' ><img src={twitter} alt='twitter' /> </a>
            </div>
        </footer>
    </div>
}