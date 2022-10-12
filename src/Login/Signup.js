import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';
const Signup = () => {
  return (
    <>
    <div className="main-div-signup">
        <div className="sub-div-signup">
            <div><input type="text" placeholder="First Name" className='signup-input'/></div>
            <div><input type="text" placeholder="Last Name" className='signup-input'/></div>
            <div><input type="text" placeholder="Email address or phone number" className='signup-input'/></div>
            <div><input type="password" placeholder="Password" className='signup-input'/></div>
            <div><Button variant="contained" id='signup-btn'>Sign Up</Button></div>
            <div>Have an account ? <Link to='/'><Button>Login</Button></Link></div>
        </div>
    </div>
    </>
  )
}
export default Signup;
