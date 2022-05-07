import React, { useState } from 'react'
import './reset.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './Axios'

function Reset() {

  const {jwt} = useParams()

  const[pswd,set] = useState('')
  const[pswdC,setC] = useState('')

  const[nomatch,smatch] = useState(false)

  const[state,setState] = useState(false)

  const submit = async() => {
      if(pswd!==pswdC){
        // smatch(true)
        alert('passwords do not match')
      }
      else{
        // smatch(false)
        setState(true)
        axios.post('/api/user/updatePassword',{jwt:jwt,pswd:pswdC}).then(res=>{
          if(res.status===200){
            setState(false)
            alert('Password Reset Successfully')
          window.location('/login')
          }
        }).catch(e=>{
          setState(false)
          setState('This Link is expired')})
      }
  }

  return (
    <div class="reset">
  <label for="exampleFormControlInput1" class="form-label ">Enter new password </label>
  <input type="password" class="form-control mb-3" id="exampleFormControlInput1" onChange={(e)=>{set(e.target.value)}} value={pswd} placeholder="enter password"/>
  <label for="exampleFormControlInput1" class="form-label ">Enter new password </label>
  <input type="password" class="form-control mb-3" id="exampleFormControlInput1" onChange={(e)=>{setC(e.target.value)}} value={pswdC} placeholder="confirm password"/>
  <button className='btn btn-outline-dark btn large' onClick={submit}>Submit</button>
  {nomatch?<div className='alert alert-danger'><h3>Passwords do not match</h3></div>:null}
  {/* {state==?<div>{state}</div>:null} */}
  {state?<div class="loader"></div>:null}
</div>
  )
}

export default Reset