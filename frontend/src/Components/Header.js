import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Logout } from '../REDUX/Actions/userActions'
import './header.css'

function Header() {

  const userLogin = useSelector((state) => state.userLogin)

  const dispatch = useDispatch()

  const navigate = useNavigate()
  
  const logout = () => {
    dispatch(Logout())
  }
  const path = window.location.pathname

  return (
    <header className='mt-1 mt-sm-3 mb-sm-2 pb-sm-4'>
      
      <div className='brand w-25 w-sm-50'>
      <img className='logo' src='https://images.unsplash.com/photo-1532777946373-b6783242f211?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=8ac55cf3a68785643998730839663129'></img>

      <p className='name'><strong>ReadBloc.in</strong></p>
      </div>

      <div className='h-links'>
        <Link to='/home'>Home</Link>
        <Link to='/about'>About Us</Link>
        {/* <a href="" className='link'>About Us</a> */}
        <Link to='/add'>Write</Link>
        {userLogin.user?<Link to = '/profile'>My Profile</Link>:null}
        {userLogin.user?<button onClick={logout}>Logout</button>:<Link to = '/'>Login</Link>}
        {/* <a href="" className='link'>Login</a> */}
      </div>




    </header>
    )
}

export default Header