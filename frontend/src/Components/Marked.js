import React, { useEffect, useState } from 'react'
import './marked.css' 
import '../Axios'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Header from './Header'
function Marked() {

    const [articles, setarticles] = useState([])
    const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);

  const [loader,setLoader]=useState(true)

    useEffect(()=>{
         axios.get(`/api/blog/marked/${pageNumber}`).then(res=>res.data.posts).then(data=>{
        setarticles(prev=>[...prev,...data])
        setLoader(false)
        if(articles.length>0){setLM(true);}

         })
         axios.get(`/api/blog/marked/${pageNumber}`).then(res=>res.data.totalPages).then(data=>{
        setNumberOfPages(data)
        // console.log(numberOfPages)
    })
    },[pageNumber])

  
  
    const [LM,setLM] = useState(false)
    const gotoNext = () => {
      setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
      if (pageNumber === numberOfPages-1){
          setLM(false)
      }
    };

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

    // const [loader,setLoader] = useState(true)
    const [searchLoader,setSearchLoader] = useState(false)
    const [sDisplay,setSdisplay] = useState(false)


  return (
    <>
    <Header/>
      <div className='marked'>
      {loader?<h1>Loading...</h1>:
    <>
     <div className="search d-flex mb-5">
      <input type="text" value={searchQuery} onChange={(e)=>setQuery(e.target.value)} className='w-50'/>
      <button onClick={()=>{
setSearchLoader(true)
        axios.get(`/api/blog/searchMyfav/${searchQuery}/${searchPage}`).then(res=>res.data).then(data=>{
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

{!searchLoader?<>
    {articles.length===0?<h1>You haven't marked any articles yet !</h1>:null}
{articles&&!sDisplay?<>{articles.map(a=>
    
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
<Link to ={`/read/${a._id}`} >Read More ..</Link>
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
</>:null}
</>
}
</div>
</>
  )
}

export default Marked