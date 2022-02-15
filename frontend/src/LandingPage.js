import React from 'react'
import {Link} from "react-router-dom";
import './landing.css'
export default function LandingPage() {
  return (
    <div className='container'>
      <div className='row custom justify-content-center align-content-center'>
        <div className='col-12  col-md-6'>
          <div className='p-2 border bg-light'>col 1</div>
        </div>
        <div className='col-12  col-md-6'>
          <div className='p-2 border bg-light'>col 2</div>
        </div>
      </div>
    </div>
//   <div className='outer'>
//      <div className='inner'>
//        <div className='login'></div>
//        <div className='register'></div>
//     {/* <button className='btn btn-light'><Link to={'/login'}>LOGIN</Link></button> 
//     <button className='btn btn-light'><Link to={'/login'}>LOGIN</Link></button> 
//     <button className='btn btn-light'><Link to={'/login'}>LOGIN</Link></button>  */}
// {/* <button><Link to={'/signup'}>SIGNUP</Link></button> */}
//     </div>
//     </div>
  )
}
