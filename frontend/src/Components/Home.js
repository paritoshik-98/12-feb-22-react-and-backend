import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogListAction } from '../REDUX/Actions/blogActions'
import './home.css'
import '../Axios'

function Home() {

    const dispatch = useDispatch()

    const selector = useSelector(state=>state.blogList)

    const[trending,setTrending] = useState()
    const[code,setCode] = useState()
  useEffect(()=>{
    // dispatch(getBlogListAction())
    axios.get('/api/blog/trending').then(res=>setTrending(res.data)).catch(e=>console.log(e))
    axios.get('/api/blog/code').then(res=>setCode(res.data)).catch(e=>console.log(e))
  },[])

  const[all,setAll]=useState(selector.blogs)


  return (
    <div className='home'>
  
    </div>
  )

}

export default Home