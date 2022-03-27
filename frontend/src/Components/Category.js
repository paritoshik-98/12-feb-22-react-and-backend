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

    const pages = new Array(numberOfPages).fill(null).map((value,index)=>index)

    const gotoPrevious = () => {
      setPageNumber(Math.max(0, pageNumber - 1));
    };
  
    const gotoNext = () => {
      setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
    };

    const comparePageNo = (index) => {
      if(pageNumber==0 && index<4){
        return true
      }
      if(pageNumber==1 && index<4){
        return true
      }
      if(pageNumber==2 && index<4){
        return true
      }
      if(pageNumber>2 && pageNumber!=numberOfPages && index<pageNumber+2 && index>=pageNumber-2){
        return true
      }
      if(pageNumber==numberOfPages-1 && index>=numberOfPages-4){
        return true
      }
      else return false
    }
    

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
      {pages.map(function(pageIndex){
        if(comparePageNo(pageIndex)){
        return(
        <button key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
          {pageIndex + 1}
        </button>
        )}
        else return null
})}
      <button onClick={gotoNext}>Next</button>
    </div>
  )
}

export default Category