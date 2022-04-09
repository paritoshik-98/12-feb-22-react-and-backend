import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import GoogleLogin from "react-google-login";
import { login, LoginWithGoogle } from "../REDUX/Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { FcGoogle } from 'react-icons/fc';
import { signup } from "../REDUX/Actions/userActions";

function Register() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
  
  const RegisterStatus = useSelector((state) => state.userRegister);

  const redirect = useSelector(state=>state.redirect)

const LoginStatus = useSelector((state) => state.userLogin);


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
      name:"",
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
    dispatch(signup(inputField));
    // axios.post('/api/user/login',inputField).then(res=>{console.log(res.data);localStorage.setItem('accessToken',res.data.at)}).catch(e=>console.log(e))
  };

  const responseGoogleSuccess = (response) => {
    // console.log(response)
    dispatch(
      LoginWithGoogle(response.tokenId)
    );
  };

  // Error Handler
  const responseGoogleError = (response) => {
    console.log(response);
  };


    return (
        <div className="outer container-fluid vh-100 d-flex justify-content-center align-items-center">
    {RegisterStatus.loading ? (<h3>LOADING....</h3>) : (
          <div className="container-fluid">
            <div className="row justify-content-center mb-3 ">
              <div className=" col-8 col-sm-4 text-center">
                {RegisterStatus.error?<div className="alert alert-danger alert-dismissible"><strong>{RegisterStatus.error}</strong></div>:null}
                {RegisterStatus.success?<><div className="alert  alert-success alert-dismissible"><strong>Registered Successfully</strong></div><Link to = '/'>Login</Link><div></div></>:null}
              </div>
            </div>
            <div className="row justify-content-center mb-3 ">
              <div className=" col-8 col-sm-4 text-center">
                <h1 className="">Register</h1>
              </div>
            </div>
            <div className="row justify-content-center ">
              <div className="col-8 col-sm-4 text-center">
                <input className="form-control" type="text"
                  name="name"
                  onChange={inputsHandler}
                  value={inputField.name}
                  placeholder="Name"></input>
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
                <button className="btn btn-large btn-outline-dark w-100 "onClick={submitButton}>Register</button>
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
          </div>
    )}
        </div>
      );
}

export default Register





  
 


