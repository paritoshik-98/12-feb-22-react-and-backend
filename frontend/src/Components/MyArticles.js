import React, { useEffect, useState } from 'react'
import './myarticles.css' 
import '../Axios'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Header from './Header'
export default function MyArticles() {

    const [articles, setarticles] = useState([])
    const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);

    useEffect(()=>{
         axios.get(`/api/blog/get/myblogs/${pageNumber}`).then(res=>res.data.posts).then(data=>{
        setarticles(prev=>[...prev,...data])
        setLoader(false)
         })
         axios.get(`/api/blog/get/myblogs/${pageNumber}`).then(res=>res.data.totalPages).then(data=>{
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
      if (pageNumber == numberOfPages-1){
          setLM(false)
      }
      // }
    };
    const[searchQuery,setQuery] = useState('')
    const[searchPage,setSearchPage] = useState(0)
    const[result,setResult] = useState([])
    const[totalSearchPages,setTotalSearchPages] = useState()

    const gotoNextSearch = () => {
      // if(pageNumber==numberOfPages-1){}
      // else{
        setSearchPage(Math.min(totalSearchPages - 1, searchPage + 1));
      if (searchPage == totalSearchPages-1){
          setLM(false)
      }
    };

    const [loader,setLoader] = useState(true)
    const [searchLoader,setSearchLoader] = useState(false)
    const [sDisplay,setSdisplay] = useState(false)
    
    // const [loader,setLoader] = useState(true)
  return (
  <>
  <Header/>
  <div className='my'>
    {loader?<div class="loader"></div>:<>

    <div className="search d-flex mb-5">
      <input type="text" value={searchQuery} onChange={(e)=>setQuery(e.target.value)} className='w-50 '/>
      <button  className='btn btn-outline-dark mx-2' onClick={()=>{
setSearchLoader(true)
        axios.get(`/api/blog/searchMyPosts/${searchQuery}/${searchPage}`).then(res=>res.data).then(data=>{
          setSdisplay(true)
          setResult(data.posts)
          setTotalSearchPages(data.totalPages)
          setSearchLoader(false)
          if(data.totalPages==0){
            setLM(false)
          }
        })
      }}>Search</button>
      <button
      className='btn btn-outline-dark'
      onClick={()=>{
        setSearchLoader(false)
        setSdisplay(false);
        setQuery('')
      }}>X</button>
      </div>

      {sDisplay?<>
{!searchLoader?
      <>{result.map(r=>
        

<div class="topCRD mb-3" id='Lcard' >
  <div class="topIMG">
      <img src={r.coverImg} class=" " alt="Loading..."></img>
    </div>
      <div class="tbody">
        <h5 class="">{r.title}</h5>
        <div className="auth_info">
          <img className='auth_pic' src={r.author.profile_pic}></img>
          <h7 className=''>{r.author.name}</h7>
        </div>
        <p class="desc">{r.desc}</p>
        <Link className='rl' to ={`/read/${r._id}`} >Read More ..</Link>
      </div>
</div>

    
    )}
{LM?
<button  className='btn btn-outline-dark' onClick={gotoNextSearch}>Load More</button>
:
null
}
</>
:<div class="loader"></div>}</>
:null}

{!searchLoader?<>
{articles&&!sDisplay?<>{articles.map(a=>

<div class="topCRD mb-3" id='Lcard' >
  <div class="topIMG">
      <img src={a.coverImg} class=" " alt="Loading..."></img>
    </div>
      <div class="tbody">
        <h5 class="">{a.title}</h5>
        <div className="auth_info">
          <img className='auth_pic' src={a.author.profile_pic}></img>
          <h7 className=''>{a.author.name}</h7>
        </div>
        <p class="desc">{a.desc}</p>
        <Link className='rl' to ={`/read/${a._id}`} >Read More ..</Link>
      </div>
</div>
    
    )}
{LM?
<button  className='btn btn-outline-dark' onClick={gotoNext}>Load More</button>
:
null
}
</>:null}
</>:null}
</>}
</div>
</>
  )
}
