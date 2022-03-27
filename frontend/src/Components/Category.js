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

    const gotoPrevious = () => {
      setPageNumber(Math.max(0, pageNumber - 1));
    };
  
    const gotoNext = () => {
      setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
    };
    

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
      
      <button onClick={gotoPrevious}>Previous</button>
      {/* {pages.map((pageIndex) => (
        <button key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
          {pageIndex + 1}
        </button>
      ))} */}
      <button onClick={gotoNext}>Next</button>
    </div>
  )
}

export default Category