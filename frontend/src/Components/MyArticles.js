import React, { useEffect, useState } from 'react'
import './myarticles.css' 
import '../Axios'
import axios from 'axios'

export default function MyArticles() {

    const [articles, setarticles] = useState([])
    const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);

    useEffect(()=>{
         axios.get(`/api/blog/get/myblogs/${pageNumber}`).then(res=>res.data.posts).then(data=>{
        setarticles(prev=>[...prev,...data])
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
      if (pageNumber === numberOfPages-1){
          setLM(false)
      }
      // }
    };

    

  return (<>
{articles?<>{articles.map(a=>a.title)}
{LM?
<button onClick={gotoNext}>Load More</button>
:
null
}
</>:null}
</>
  )
}
