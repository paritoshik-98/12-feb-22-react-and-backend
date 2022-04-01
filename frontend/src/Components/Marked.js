import React, { useEffect, useState } from 'react'
import './marked.css' 
import '../Axios'
import axios from 'axios'

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


  return (
      <>
      {loader?<h1>Loading...</h1>:
    <>
    {articles.length===0?<h1>You haven't marked any articles yet !</h1>:null}
{articles?<>{articles.map(a=>a.title)}
{LM?
<button onClick={gotoNext}>Load More</button>
:
null
}
</>:<h1>No</h1>}
</>
}
</>
  )
}

export default Marked