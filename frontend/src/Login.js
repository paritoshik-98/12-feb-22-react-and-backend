import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import './Axios'
import { login } from "./REDUX/Actions/userActions";
import GoogleLogin from 'react-google-login'
import './login.css'

function Login(){
    
    const navigate = useNavigate()

    const LoginStatus = useSelector(state=>state.userLogin)

    // useEffect(()=>{
    //     if(LoginStatus.user){
    //         navigate('/all')
    //     }
    // },[LoginStatus.user])

    const dispatch = useDispatch()


    const [inputField , setInputField] = useState({
        email: '',
        password: ''
    })
    
    const inputsHandler = (e) =>{
        const { name, value } = e.target;
       setInputField((prevState) => ({
         ...prevState,
         [name]: value,
       }));
    }

    const submitButton =  (e) =>{
        e.preventDefault()  
        dispatch(login(inputField))
        // axios.post('/api/user/login',inputField).then(res=>{console.log(res.data);localStorage.setItem('accessToken',res.data.at)}).catch(e=>console.log(e))
    }

    

   

        return(
            // process running 
            (LoginStatus.loading)?
            // 
            <h3>LOADING</h3>
            :
            // before submitting or after process failed --- no loading atrr 
            <div>

            {(LoginStatus.error)?<div class="alert alert-danger">
            <strong>{LoginStatus.error}</strong> 
            </div>:null}

            <form>
            <div className="email">
            <label>Email :</label>

            <input 
            type="email" 
            name="email" 
            onChange={inputsHandler} 
            placeholder="email" 
            value={inputField.email}/>

            </div>

            <div className="password">
            <label>Password :</label>

            <input 
            type="password" 
            name="password" 
            onChange={inputsHandler} 
            placeholder="password" 
            value={inputField.password}/>
            </div>
            <button type="button" className="b" onClick={submitButton}>LOGIN</button>

            <div ><GoogleLogin/></div>
            </form>
            </div>
            
            
        )
}

export default Login