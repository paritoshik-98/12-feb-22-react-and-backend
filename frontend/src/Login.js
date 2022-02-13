import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import './Axios'
import { login } from "./REDUX/Actions/userActions";

function Login(){
    
    const navigate = useNavigate()

    const LoginStatus = useSelector(state=>state.userLogin)

    useEffect(()=>{
        if(LoginStatus.user){
            navigate('/all')
        }
    },[LoginStatus.user])

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

            <input 
            type="email" 
            name="email" 
            onChange={inputsHandler} 
            placeholder="email" 
            value={inputField.email}/>
    
            <br/>
    
            <input 
            type="password" 
            name="password" 
            onChange={inputsHandler} 
            placeholder="password" 
            value={inputField.password}/>
    
            <br/>
    
            <button onClick={submitButton}>LOGIN</button>

            <br/>

      
            </div>
            
            
        )
}

export default Login