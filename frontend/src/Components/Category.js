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

    const [articles,setArticles] = useState([])

    useEffect(async()=>{
      
      if(tag==='all'){
        axios.get(`/api/blog/cat/all/${pageNumber}`).then(res=>res.data).then(data=>{
          // if(articles){
            setLoader(false)
          setArticles(prev=>[...prev,...data.posts])
          // }
          // else{
            // setArticles([...data.posts])
          // }
          setNumberOfPages(data.totalPages)
          
        })
      }
      else{
        axios.get(`/api/blog/cat/${tag}/${pageNumber}`).then(res=>res.data).then(data=>{
          // if(articles){
            setLoader(false)
            setArticles(prev=>[...prev,...data.posts])
            // }
            // else{
              // setArticles([...data.posts])
            // }
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
      if (pageNumber == numberOfPages-1){
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

  return (
    <>
    <Header/>
    <div className='category'>
    {loader?<h1>Loading...</h1>:<>
    <h5>Looking for something else ?</h5>
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

      {sDisplay?<>
{!searchLoader?
      <>{result.map(r=>

<div class=" cat_card card mb-3" >
<div class="row g-0">
<div class="col-md-4">
    <img src={r.coverImg} class=" cover  " alt="..."></img>
  </div>
  <div class="col-md-8">
    <div class="card-body">
    <h5 class="card-title">{r.title}</h5>
<div className="authorInfo  d-flex">
<img className='authorpic align-self-center' src={r.author.profile_pic}></img>
<h7 className='align-self-center'>{r.author.name}</h7>
</div>
<p class="card-text">{r.desc}</p>
<Link to ={`/read/${r._id}`} >Read More ..</Link>
    </div>
  </div>
  
</div>
</div>
    
    )}
{LM?
<button onClick={gotoNextSearch}>Load More</button>
:
null
}
</>
:<h1>Loading..</h1>}</>
:null}




{!searchLoader?
      <>{articles&&!sDisplay?
      
      <>{articles.map(a=>

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
</>:null

}
</>

:<h1>Loading...</h1>}

      </>}
    </div>
    </>
    
  )
}

export default Category

