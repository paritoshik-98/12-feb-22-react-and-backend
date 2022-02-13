import React from 'react'
import {Link} from "react-router-dom";
import './landing.css'
export default function LandingPage() {
  return (
  <div className='outer'>
     <div className='inner'>
       <div className='login'></div>
       <div className='register'></div>
    {/* <button className='btn btn-light'><Link to={'/login'}>LOGIN</Link></button> 
    <button className='btn btn-light'><Link to={'/login'}>LOGIN</Link></button> 
    <button className='btn btn-light'><Link to={'/login'}>LOGIN</Link></button>  */}
{/* <button><Link to={'/signup'}>SIGNUP</Link></button> */}
    </div>
    </div>
  )
}
