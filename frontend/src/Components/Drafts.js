import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Header from './Header'
import '../Axios'

function Drafts() {

    const [articles, setarticles] = useState([])
    const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);

    useEffect(()=>{
         axios.get(`/api/blog/drafts/${pageNumber}`).then(res=>res.data.posts).then(data=>{
        setarticles(prev=>[...prev,...data])
        setLoader(false)
         })
         axios.get(`/api/blog/drafts/${pageNumber}`).then(res=>res.data.totalPages).then(data=>{
        setNumberOfPages(data)
        console.log(numberOfPages)
    })
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

    // const [loader,setLoader] = useState(true)

    const[searchQuery,setQuery] = useState('')
    const[searchPage,setSearchPage] = useState(0)
    const[result,setResult] = useState([])
    const[totalSearchPages,setTotalSearchPages] = useState()

    const gotoNextSearch = () => {
      // if(pageNumber==numberOfPages-1){}
      // else{
      setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
      if (pageNumber === numberOfPages-1){
          setLM(false)
      }
    };

    const [loader,setLoader] = useState(true)
    const [searchLoader,setSearchLoader] = useState(false)
    const [sDisplay,setSdisplay] = useState(false)

  return (
    <>
    <Header/>
      <div className='marked'>
      {loader?<h1>Loading...</h1>:
    <>
    {articles.length===0?<h1>You haven't marked any drafts !</h1>:null}

    <div className="search d-flex mb-5">
      <input type="text" value={searchQuery} onChange={(e)=>setQuery(e.target.value)} className='w-50'/>
      <button onClick={()=>{
setSearchLoader(true)
        axios.get(`/api/blog/search/${searchQuery}/${searchPage}`).then(res=>res.data).then(data=>{
          setSdisplay(true)
          setResult(data.posts)
          setTotalSearchPages(data.totalPages)
          setSearchLoader(false)
          if(data.totalPages==0){
            setLM(false)
          }
        })
      }}>Search</button>
      <button onClick={()=>{
        setSdisplay(false);
        setQuery('')
      }}>X</button>
      </div>


{articles?<>{articles.map(a=>
    
    <div class=" cat_card card mb-3" >
<div class="row g-0">
  <div class="col-md-8">
    <div class="card-body">
    <h5 class="card-title">{a.title}</h5>
<div className="authorInfo  d-flex">
<img className='authorpic align-self-center' src={a.author.profile_pic}></img>
<h7 className='align-self-center'>{a.author.name}</h7>
</div>
<p class="card-text">{a.desc}</p>
<Link to ={`/editDraft/${a._id}`} >Edit ..</Link>
    </div>
  </div>
  <div class="col-md-4">
    <img src={a.coverImg} class=" cover  " alt="..."></img>
  </div>
</div>
</div>
    
    )}
{LM?
<button onClick={gotoNext}>Load More</button>
:
null
}
</>:<h1>No</h1>}
</>
}
</div>
</>
  )
}

export default Drafts