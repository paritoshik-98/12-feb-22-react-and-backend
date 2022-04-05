import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./landing.css";
import GoogleLogin from "react-google-login";
import { login, LoginWithGoogle } from "./REDUX/Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { FcGoogle } from 'react-icons/fc';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon
} from "react-share";


export default function LandingPage() {


  const navigate = useNavigate();
// useDispatch()
const dispatch = useDispatch();
  
  const LoginStatus = useSelector((state) => state.userLogin);

  const redirect = useSelector(state=>state.redirect)

  useEffect(()=>{
    if(LoginStatus.user){
      if(redirect.path){
        let p = redirect.path
        dispatch({
          type:'CLEAR_REDIRECT'
        })
      navigate(p)
      }
      else{
        navigate('/home')
      }
    }
  },[LoginStatus.user])
  
 


  const [inputField, setInputField] = useState({
    email: "",
    password: "",
  });

  const inputsHandler = (e) => {
    const { name, value } = e.target;
    setInputField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitButton = (e) => {
    e.preventDefault();
    dispatch(login(inputField));
    // axios.post('/api/user/login',inputField).then(res=>{console.log(res.data);localStorage.setItem('accessToken',res.data.at)}).catch(e=>console.log(e))
  };

  const responseGoogleSuccess = (response) => {
    console.log(response)
    // let userInfo = {
    //   name: response.profileObj.name,
    //   emailId: response.profileObj.email,
    //   profile_pic: response.profileObj.imageUrl,
    // };
    // check in backend and register if first google login
    dispatch(
      LoginWithGoogle(response.tokenId)
    );
  };

  // Error Handler
  const responseGoogleError = (response) => {
    console.log(response);
  };

  const responseFacebook = (response) => {
    console.log(response);
  }
 

  return (
    <div className="outer container-fluid vh-100 d-flex justify-content-center align-items-center">
{LoginStatus.loading ? (<h3>LOADING....</h3>) : (
      <div className="container-fluid">
        <div className="row justify-content-center mb-3 ">
          <div className=" col-8 col-sm-4 text-center">
            {LoginStatus.error?<div className="alert alert-danger"><strong>{LoginStatus.error}</strong></div>:null}
          </div>
        </div>
        <div className="row justify-content-center mb-3 ">
          <div className=" col-8 col-sm-4 text-center">
            <h1 className="">Login</h1>
          </div>
        </div>
        <div className="row justify-content-center ">
          <div className="col-8 col-sm-4 text-center">
            <input className="form-control" type="email"
              name="email"
              onChange={inputsHandler}
              value={inputField.email}
              placeholder="Email Address"></input>
          </div>
        </div>
        <div className="row justify-content-center mb-3 ">
          <div className="col-8 col-sm-4 text-center">
            <input className="form-control" type="password"
              name="password"
              onChange={inputsHandler}
              placeholder="password"
              value={inputField.password}
              ></input>
          </div>
        </div>
        <div className="row justify-content-center mb-3 ">
          <div className=" col-8 col-sm-4 text-center">
            <button className="btn btn-large btn-outline-dark w-100 "onClick={submitButton}>SignIn</button>
          </div>
        </div>
        <div className="row justify-content-center mb-3 ">
          <div className="col-6 col-sm-4 text-center">
            <Link to = '/recoverPassword'>Forgot Password ?</Link>
            {/* <a href="" >Forgot Password ?</a> */}
          </div>
        </div>
        <div className="row justify-content-center mb-3 ">
          <div className="col-8 col-sm-4 text-center">
          <GoogleLogin className=" w-100 "
            // clientId= {process.env.REACT_APP_CLIENTID_GOOGLE}
            render={renderProps => (
              <button className="btn btn-large btn-outline-dark w-100 d-flex align-items-center justify-content-center" onClick={renderProps.onClick} disabled={renderProps.disabled}><FcGoogle className="g"/><span className="m-4 mt-2 mb-2 m-sm-2 m-lg-4 mt-lg-2 mb-lg-2">Sign in with Google</span>  </button>
            )}
              clientId="92920275652-tqg9eads4vhhm0cn4emei20ccolgtv55.apps.googleusercontent.com"
              buttonText="Sign In with Google"
              onSuccess={responseGoogleSuccess}
              onFailure={responseGoogleError}
              prompt='consent'
            //   isSignedIn={true}
              cookiePolicy={"single_host_origin"}/>
          </div>
        </div>
        {/* <FacebookLogin
  appId="504910991006215"
  callback={responseFacebook}
  autoLoad={true}
  render={renderProps => (
    <button onClick={renderProps.onClick}>This is my custom FB button</button>
  )}
/> */}
        <div className="row justify-content-center mb-3 ">
          <div className="col-6 text-center">
            New User ? <a  href="">Register</a>
          </div>
        </div>
      </div>
)}
<LinkedinShareButton url={window.location.href} title='readbloc'><LinkedinIcon/></LinkedinShareButton>
 <WhatsappShareButton url={window.location.href} title='readbloc' image='dcdcdcd'><WhatsappIcon/></WhatsappShareButton>
 <EmailShareButton><EmailIcon/></EmailShareButton>
 <MailruShareButton><MailruIcon/></MailruShareButton>

    </div>
 
  );
}
