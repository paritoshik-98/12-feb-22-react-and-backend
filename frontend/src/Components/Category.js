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
    
    const[searchQuery,setQuery] = useState('')
    const[searchPage,setSearchPage] = useState(0)
    const[result,setResult] = useState([])
    const[totalSearchPages,setTotalSearchPages] = useState()

    const search = () => {
      axios.get(`/api/blog/search/${searchQuery}/${searchPage}`).then(res=>res.data).then(data=>{
        setResult(data.posts)
        setTotalSearchPages(data.totalPages)
      })
    }

    const [sDisplay,setSdisplay] = useState(false)

  return (
    <div className='category'>
      <div className="search d-flex">
      <input type="text" value={searchQuery} onChange={(e)=>setQuery(e.target.value)} className='w-50'/>
      <button onClick={()=>{
        axios.get(`/api/blog/search/${searchQuery}/${searchPage}`).then(res=>res.data).then(data=>{
          setSdisplay(true)
          setResult(data.posts)
          setTotalSearchPages(data.totalPages)
        })
      }}>Search</button>
      <button onClick={()=>{
        setSdisplay(false)
      }}>X</button>
      </div>
      {sDisplay?totalSearchPages==0?<h1>Not found</h1>:<>{JSON.stringify(result)}</>:null}


      {!sDisplay?
      <>
      
      <h3>Page of {pageNumber + 1}</h3>
      {blogs?
      <>
          <div class=" cat_card card mb-3" >
          <div class="row g-0">
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{blogs[0].title}</h5>
                <p class="card-text">{blogs[0].desc}</p>
                {/* <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
              </div>
            </div>
            <div class="col-md-4">
              <img src={blogs[0].coverImg} class="img-fluid " alt="..."></img>
            </div>
          </div>
        </div>
          <div class=" cat_card card mb-3" >
          <div class="row g-0">
            <div class="col-md-4">
              <img src={blogs[1].coverImg} class="img-fluid " alt="..."></img>
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{blogs[1].title}</h5>
                <p class="card-text">{blogs[1].desc}</p>
                {/* <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
              </div>
            </div>
          </div>
        </div>
          <div class=" cat_card card mb-3" >
          <div class="row g-0">
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{blogs[2].title}</h5>
                <p class="card-text">{blogs[2].desc}</p>
                {/* <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
              </div>
            </div>
            <div class="col-md-4">
              <img src={blogs[2].coverImg} class="img-fluid " alt="..."></img>
            </div>
          </div>
        </div>
          <div class=" cat_card card mb-3" >
          <div class="row g-0">
            <div class="col-md-4">
              <img src={blogs[3].coverImg} class="img-fluid " alt="..."></img>
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{blogs[3].title}</h5>
                <p class="card-text">{blogs[3].desc}</p>
                {/* <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
              </div>
            </div>
          </div>
        </div>
          <div class=" cat_card card mb-3" >
          <div class="row g-0">
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{blogs[4].title}</h5>
                <p class="card-text">{blogs[4].desc}</p>
                {/* <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
              </div>
            </div>
            <div class="col-md-4">
              <img src={blogs[4].coverImg} class="img-fluid " alt="..."></img>
            </div>
          </div>
        </div>
        </>
      :<h1>Loading...</h1>}

      </>
      :null}

      
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

