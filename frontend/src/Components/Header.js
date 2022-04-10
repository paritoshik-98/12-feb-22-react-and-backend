import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
// import { Logout } from '../REDUX/Actions/userActions'
import './header.css'
function Header() {

  const [Uname,setUname] = useState()

  useEffect(()=>{
    const name = localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')).name:null
    setUname(name)
  },[])

  const userLogin = useSelector((state) => state.userLogin)
  

  const dispatch = useDispatch()

  const navigate = useNavigate()
  
 
  const path = window.location.pathname

  const [dropDown,setDropDown] = useState(false)

  const toggle = () => {
    setDropDown(!dropDown)
  }

  const Logout = () => {
    setDropDown(!dropDown)
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("DP");
    dispatch({type:'DP_REMOVED',payload:''})
    dispatch({type:'LOGOUT'})
    // axios.get('/api/user/logout').then(res=>{if(res.status===200){
      navigate('/login')
  // }})
    // .catch(e=>console.log(e))
  };

  const Login = () => {
    console.log(window.location.pathname);
    dispatch({
      type:'REDIRECT',
      payload: window.location.pathname
    })
    navigate('/login')
  }


  const DP = useSelector(state=>state.DP)

  // const Uname = useSelector(state=>state.userLogin.user.name)

  return (
    <header className='mt-1 mt-sm-3 mb-sm-2 pb-sm-4 '>
      
      <div className='brand w-25 w-sm-50'>
      <img className='logo' src='https://images.unsplash.com/photo-1532777946373-b6783242f211?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=8ac55cf3a68785643998730839663129'></img>

      <p className='name'><strong>ReadBloc.in</strong></p>
      </div>

      <div className='h-links'>
        <Link to='/'>Home</Link>
        <Link to='/about'>About Us</Link>
        {/* <a href="" className='link'>About Us</a> */}
        <button className='btn btn-outline-primary' onClick={(e)=>{
          e.preventDefault()
          if(!userLogin.user){alert('login to write')}
          else{
            navigate('/add')
          }
        }}>Write</button>
        






        {userLogin.user?
        
  <img  src={DP.pic} alt='' class=" h-pic "onClick={toggle} ></img>
   
        
        // :<Link to = '/'>Login</Link>}
        :<a onClick={Login}>Login</a>}


      </div>
      {dropDown ?
        <ul className='d_ul'>
          <li id='n' className='text-muted fw-bold'>{Uname?Uname:<h1>''</h1>}</li>
          <li className='d_l'><Link style={{textDecoration:'none',color:'#2E0300'}} to='/profile'>Profile</Link></li>
          <li className='d_l'><Link style={{textDecoration:'none',color:'#2E0300'}} to='/myArticles'>My Articles</Link></li>
          <li className='d_l'><Link style={{textDecoration:'none',color:'#2E0300'}} to='/drafts'>Draft</Link></li>
          <li className='d_l'><Link style={{textDecoration:'none',color:'#2E0300'}} to='/Favourites'>Favourites</Link></li>
          <li className='d_l'><a onClick={Logout} style={{color:'#2E0300'}}>Logout</a></li>
        </ul>
:null}



    </header>
    )
}

export default Header