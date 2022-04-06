import React, { useState } from 'react'
import axios from 'axios'
import './Axios'
import Header from './Components/Header'

function ChangeP() {

    const[email,set] = useState('')

    const [resetLink,setLink] = useState(false)

    const [loading,setLoading] = useState(false)

    const [err,setErr] = useState()

    const emailSubmit = () => {
        setLoading(true)
        axios.post('/api/user/send_reset_link',{email:email}).then(res=>{
            if(res.status===200){
                setLoading(false)
                setLink(true)
            }
        }).catch(e=>{console.log(e);setErr(e)})
    }
    
  return (
    <div>
        <Header/>
        {err?<>{JSON.stringify(err)}</>:null}
        <div class="Pform" style={{'margin':'10vh 10vw 10vh 10vw'}}>
  <label for="exampleFormControlInput1" class="form-label ">Enter your registered email address</label>
  <input type="email" class="form-control mb-3" id="exampleFormControlInput1" onChange={(e)=>{set(e.target.value)}} value={email} placeholder="name@example.com"/>
  <button className='btn btn-outline-dark btn large' onClick={emailSubmit}>Submit</button>
  {loading?<h1>Loading....</h1>:null}
  <div className="reset">{resetLink?<h1>Check Your Email for reset link </h1>:null}</div>
</div>

    </div>
  )
}

export default ChangeP