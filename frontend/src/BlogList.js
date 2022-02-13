import React, { useEffect } from 'react'
import axios from 'axios'

import './Axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function BlogList() {

  const navigate = useNavigate()

    const LoginStatus = useSelector(state=>state.userLogin)

    useEffect(()=>{
        if(!LoginStatus.user){
            navigate('/')
        }
    },[LoginStatus.user])

    useEffect(() => {
        axios.get('/api/blog/all').then(res=>console.log(res.data))
    })
    

  return (
    <div>BlogList</div>
  )
}
