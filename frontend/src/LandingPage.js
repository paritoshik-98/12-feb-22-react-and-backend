import React from 'react'
import {Link} from "react-router-dom";
export default function LandingPage() {
  return (
  <>
    <button><Link to={'/login'}>LOGIN</Link></button>
    {/* <button><Link to={'/signup'}>SIGNUP</Link></button> */}
  </>
  )
}
