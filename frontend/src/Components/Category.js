import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './category.css'
import '../Axios'

function Category() {

    const {tag} = useParams()

  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  // const [posts, setPosts] = useState();

    const [blogs,setBlogs] = useState()

    useEffect(()=>{
        axios.get(`/api/blog/all/${pageNumber}`).then(res=>res.data).then(data=>{
          setBlogs(data.posts)
          setNumberOfPages(data.totalPages)
        })
    },[pageNumber])
    

  return (
    <div className='category'>
      <h3>Page of {pageNumber + 1}</h3>
      {blogs?
      blogs.map(blog=>{
        return(
        <div  className='bloc'>
          <h7>{blog.title}</h7>
        </div>)
      }):<h1>Loading...</h1>}
      
        
    </div>
  )
}

export default Category