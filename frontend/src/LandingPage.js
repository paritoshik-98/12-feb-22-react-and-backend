import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./landing.css";
import GoogleLogin from "react-google-login";
import { login, LoginWithGoogle } from "./REDUX/Actions/userActions";
import { useDispatch, useSelector } from "react-redux";

export default function LandingPage() {
  const navigate = useNavigate();

  const LoginStatus = useSelector((state) => state.userLogin);

  // useEffect(()=>{
  //     if(LoginStatus.user){
  //         navigate('/all')
  //     }
  // },[LoginStatus.user])

  const dispatch = useDispatch();

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
    let userInfo = {
      name: response.profileObj.name,
      emailId: response.profileObj.email,
      profile_pic:response.profileObj.imageUrl
    };
    // check in backend and register if first google login 
    dispatch(LoginWithGoogle({email:userInfo.emailId,name:userInfo.name,profile_pic:userInfo.profile_pic}))
  };

// Error Handler
const responseGoogleError = (response) => {
console.log(response);
 };

  return (
    <div className="outer-container vh-100 ">
      {/* // process running  */}
      {LoginStatus.loading ? (
        //
        <h3>LOADING</h3>
      ) : (
        // before submitting or after process failed --- no loading atrr
        <div>
          <div className="inner-container bg-light">
            {LoginStatus.error ? (
              <p className="error">
                <h1>{LoginStatus.error}!!!!</h1>
              </p>
            ) : (
              <h1 className="text-center text-primary">Login</h1>
            )}

            <input
              type="email"
              name="email"
              onChange={inputsHandler}
              value={inputField.email}
              className="form-control input "
              placeholder="Email Address"
            ></input>
            <input
              type="password"
              name="password"
              onChange={inputsHandler}
              placeholder="password"
              value={inputField.password}
              className="form-control input"
            ></input>
            <button className="btn btn-primary w-100 " onClick={submitButton}>
              SignIn
            </button>
            <p className=" fp text-center">
              <a className="  text-decoration-none">Forgot Password</a>
            </p>
            <GoogleLogin className=" gl w-100 " 
            // clientId= {process.env.REACT_APP_CLIENTID_GOOGLE}
              clientId="149517402118-58t2a5ao3f8kqo9vn8bh5muf3ctbl5f3.apps.googleusercontent.com"
              buttonText="Sign In with Google"
              onSuccess={responseGoogleSuccess}
              onFailure={responseGoogleError}
            //   isSignedIn={true}
              cookiePolicy={"single_host_origin"}/>
            <p className=" sg text-center ">
              New User ? <a className="  text-decoration-none">signup</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
