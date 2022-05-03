import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi';

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

  const[category,setCat]=useState(false)

  // const Uname = useSelector(state=>state.userLogin.user.name)

  return (
    <header className=' '>
      
      <div className=' d-flex'>
      <img className='logo' src='https://images.unsplash.com/photo-1532777946373-b6783242f211?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=8ac55cf3a68785643998730839663129'></img>

      {/* <p className='name'><strong>ReadBloc.in</strong></p> */}
      <div className='name'>ReadBlocs</div>
      </div>
      <div className='drop'>DROPDOWN</div>
      <div className='mb-nav'>
<div className='h_nav'>
  {/* <div className=' justify-content-around'> */}
        <Link className='hl'  style={{textDecoration:'underline',color:'#2E0300'}} to='/'>Home</Link>
        <Link className='hl ab' style={{textDecoration:'underline',color:'#2E0300'}} to='/about'>About Us</Link>
        <a className='hl catmb' style={{textDecoration:'underline',color:'#2E0300'}} onClick={()=>setCat(!category)} >Categories</a>
        <Link className='hl writeL' style={{textDecoration:'underline',color:'#2E0300'}} to='/add'>Write</Link>
        {/* </div> */}
        {userLogin.user?
  <img  src={DP.pic} alt='' class="h-pic"onClick={toggle} ></img>
        :<a onClick={Login} style={{'marginLeft':'2vw',textDecoration:'underline',color:'#2E0300'}}>Login</a>}
</div>
{userLogin.user?
  <img  src={DP.pic} alt='' class="h-pic-mb"onClick={toggle} ></img>
        :null}
        </div>
{/* <div className='hamb'>
<button className='btn btn-sm  btn-outline-dark'><GiHamburgerMenu size={20}/></button>
</div> */}
      {dropDown ?
        <ul className='d_ul'>
          <li id='n' className='text-muted fw-bold'>{Uname?Uname:<h1>''</h1>}</li>
          <li className='d_l wd'><Link style={{textDecoration:'none',color:'#2E0300'}} to='/add'>Write</Link></li>  
          <li className='d_l'><Link style={{textDecoration:'none',color:'#2E0300'}} to='/profile'>My Profile</Link></li>

          <li className='d_l'><Link style={{textDecoration:'none',color:'#2E0300'}} to='/myArticles'>My Articles</Link></li>
          <li className='d_l'><Link style={{textDecoration:'none',color:'#2E0300'}} to='/drafts'>Draft</Link></li>
          <li className='d_l'><Link style={{textDecoration:'none',color:'#2E0300'}} to='/Favourites'>Favourites</Link></li>
          <li className='d_l'><a onClick={Logout} style={{color:'#2E0300'}}>Logout</a></li>
        </ul>
:null}

{/* <div class="btn-group">
  <button type="button" class="btn btn-primary dropdown-toggle" data-mdb-toggle="dropdown" aria-expanded="false">
    Right-aligned menu
  </button>
  <ul class="dropdown-menu">
  <li><a class="dropdown-item" href="#">Action</a></li>
  <li><a class="dropdown-item" href="#">Another action</a></li>
  <li><a class="dropdown-item" href="#">Something else here</a></li>
  <li><hr class="dropdown-divider" /></li>
  <li><a class="dropdown-item" href="#">Separated link</a></li>
</ul>
</div> */}
{category?


  <ul className='cat_ul'>
          <li className='d_l'><Link style={{textDecoration:'none',color:'#2E0300'}} to='/cat/:tag'>cat 1</Link></li>
          <li className='d_l'><Link style={{textDecoration:'none',color:'#2E0300'}} to='/cat/:tag'>cat 1</Link></li>
          <li className='d_l'><Link style={{textDecoration:'none',color:'#2E0300'}} to='/cat/:tag'>cat 1</Link></li>
          <li className='d_l'><Link style={{textDecoration:'none',color:'#2E0300'}} to='/cat/:tag'>cat 1</Link></li>
        </ul>
:null}

    </header>
    )
}

export default Header