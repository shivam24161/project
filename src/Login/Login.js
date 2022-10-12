import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
const Login = () => {
  return (
    <>
    <div className="main-div">
        <div className="sub-div">
            <div><input type="text" placeholder="Email address or phone number" className='login-input'/></div>
            <div><input type="password" placeholder="Password" className='login-input'/></div>
            <div><Button variant="contained" id='login-btn'>Login</Button></div>
            <div>Not have an account ? <Link to='/signup'><Button>Create Account</Button></Link></div>
        </div>
    </div>
    </>
  )
}
export default Login;
