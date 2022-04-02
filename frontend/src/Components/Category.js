import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './category.css'
import '../Axios'
import { SchemaTypes } from 'mongoose'
import Header from './Header'

function Category() {

    const {tag} = useParams()

  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  // const [posts, setPosts] = useState();

    const [articles,setArticles] = useState()

    useEffect(async()=>{
      
      if(tag==='all'){
        axios.get(`/api/blog/cat/all/${pageNumber}`).then(res=>res.data).then(data=>{
          setArticles(prev=>[...prev,...data.posts])
          setNumberOfPages(data.totalPages)
          
        })
      }
      else{
        axios.get(`/api/blog/cat/${tag}/${pageNumber}`).then(res=>res.data).then(data=>{
          setArticles(data.posts)
          setNumberOfPages(data.totalPages)
      })
    }
    },[pageNumber])

    // const pages = new Array(numberOfPages).fill(null).map((value,index)=>index)

    // const gotoPrevious = () => {
    //   setPageNumber(Math.max(0, pageNumber - 1));
    // };
  
    const [LM,setLM] = useState(true)
    const gotoNext = () => {
      // if(pageNumber==numberOfPages-1){}
      // else{
      setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
      if (pageNumber === numberOfPages){
          setLM(false)
      }
      // }
    };

    // const comparePageNo = (index) => {
    //   if(pageNumber==0 && index<4){
    //     return true
    //   }
    //   if(pageNumber==1 && index<4){
    //     return true
    //   }
    //   if(pageNumber==2 && index<4){
    //     return true
    //   }
    //   if(pageNumber>2 && pageNumber!=numberOfPages && index<pageNumber+2 && index>=pageNumber-2){
    //     return true
    //   }
    //   if(pageNumber==numberOfPages-1 && index>=numberOfPages-4){
    //     return true
    //   }
    //   else return false
    // }
    
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
    <>
    <Header/>
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
      {articles?<>{articles.map(a=>

<div class=" cat_card card mb-3" >
<div class="row g-0">
<div class="col-md-4">
    <img src={a.coverImg} class=" cover  " alt="..."></img>
  </div>
  <div class="col-md-8">
    <div class="card-body">
    <h5 class="card-title">{a.title}</h5>
<div className="authorInfo  d-flex">
<img className='authorpic align-self-center' src={a.author.profile_pic}></img>
<h7 className='align-self-center'>{a.author.name}</h7>
</div>
<p class="card-text">{a.desc}</p>
<Link to ={`/read/${a._id}`} >Read More ..</Link>
    </div>
  </div>
  
</div>
</div>
    
    )}
{LM?
<button onClick={gotoNext}>Load More</button>
:
null
}
</>:null}
      {/* {sDisplay?totalSearchPages==0?<h1>Not found</h1>:<>{JSON.stringify(result)}</>:null}


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
        <div className="authorInfo  d-flex">
          <img className='authorpic align-self-center' src={blogs[0].author.profile_pic}></img>
          <h7 className='align-self-center'>{blogs[0].author.name}</h7>
        </div>
        <p class="card-text">{blogs[0].desc}</p>
        <Link to ={`/read/${blogs[0]._id}`} >Read More ..</Link>
              </div>
            </div>
            <div class="col-md-4">
              <img src={blogs[0].coverImg} class=" cover  " alt="..."></img>
            </div>
          </div>
        </div>
        { blogs[1]?
          <div class=" cat_card card mb-3" >
          <div class="row g-0">
            <div class="col-md-4">
              <img src={blogs[1].coverImg} class=" cover  " alt="..."></img>
            </div>
            <div class="col-md-8">
              <div class="card-body">
              <h5 class="card-title">{blogs[1].title}</h5>
        <div className="authorInfo  d-flex">
          <img className='authorpic align-self-center' src={blogs[1].author.profile_pic}></img>
          <h7 className='align-self-center'>{blogs[1].author.name}</h7>
        </div>
        <p class="card-text">{blogs[1].desc}</p>
        <Link to ={`/read/${blogs[1]._id}`} >Read More ..</Link>
              </div>
            </div>
          </div>
        </div>
        :null
}
{ blogs[2]?
          <div class=" cat_card card mb-3" >
          <div class="row g-0">
            <div class="col-md-8">
              <div class="card-body">
              <h5 class="card-title">{blogs[2].title}</h5>
        <div className="authorInfo  d-flex">
          <img className='authorpic align-self-center' src={blogs[2].author.profile_pic}></img>
          <h7 className='align-self-center'>{blogs[2].author.name}</h7>
        </div>
        <p class="card-text">{blogs[2].desc}</p>
        <Link to ={`/read/${blogs[2]._id}`} >Read More ..</Link>
              </div>
            </div>
            <div class="col-md-4">
              <img src={blogs[2].coverImg} class=" cover  " alt="..."></img>
            </div>
          </div>
        </div>
:null
}
{ blogs[3]?
          <div class=" cat_card card mb-3" >
          <div class="row g-0">
            <div class="col-md-4">
              <img src={blogs[3].coverImg} class=" cover  " alt="..."></img>
            </div>
            <div class="col-md-8">
              <div class="card-body">
              <h5 class="card-title">{blogs[3].title}</h5>
        <div className="authorInfo  d-flex">
          <img className='authorpic align-self-center' src={blogs[3].author.profile_pic}></img>
          <h7 className='align-self-center'>{blogs[3].author.name}</h7>
        </div>
        <p class="card-text">{blogs[3].desc}</p>
        <Link to ={`/read/${blogs[3]._id}`} >Read More ..</Link>
              </div>
            </div>
          </div>
        </div>
:null
}
        { blogs[4]?
          <div class=" cat_card card mb-3" >
          <div class="row g-0">
            <div class="col-md-8">
              <div class="card-body">
              <h5 class="card-title">{blogs[4].title}</h5>
        <div className="authorInfo  d-flex">
          <img className='authorpic align-self-center' src={blogs[4].author.profile_pic}></img>
          <h7 className='align-self-center'>{blogs[4].author.name}</h7>
        </div>
        <p class="card-text">{blogs[4].desc}</p>
        <Link to ={`/read/${blogs[4]._id}`} >Read More ..</Link>
              </div>
            </div>
            <div class="col-md-4">
              <img src={blogs[4].coverImg} class=" cover  " alt="..."></img>
            </div>
          </div>
        </div>
        :null
      }
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
      <button onClick={gotoNext}>Next</button> */}
    </div>
    </>
    
  )
}

export default Category

