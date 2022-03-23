import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogListAction } from '../REDUX/Actions/blogActions'
import './home.css'

function Home() {

    const dispatch = useDispatch()

    const selector = useSelector(state=>state.blogList)

  useEffect(()=>{
    dispatch(getBlogListAction())
    
  },[])

  const[all,setAll]=useState(selector.blogs)


  return (
    <div className='home'>
  
    </div>
  )

}

export default Home