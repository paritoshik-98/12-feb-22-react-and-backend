import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './category.css'
import '../Axios'

function Category() {

    const {tag} = useParams()

    const [blogs,setBlogs] = useState()

    useEffect(()=>{
        axios.get(`/api/blog/${tag}`).then(res=>setBlogs(res.data))
    },[])

  return (
    <div className='category'>
        {blogs?
        <div>{JSON.stringify(blogs)}</div>
        :null}
    </div>
  )
}

export default Category