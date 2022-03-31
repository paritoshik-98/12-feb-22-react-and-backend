import React, { useEffect, useState } from 'react'
import './myarticles.css' 
import '../Axios'
import axios from 'axios'

export default function MyArticles() {

    const [articles, setarticles] = useState([])

    useEffect(()=>{
         axios.get('/api/blog/get/myblogs/0').then(res=>res.data.posts).then(data=>{
        setarticles(data)
        console.log(articles)
    })
    },[])
  return (<>
{articles?<>{articles[0].title}</>:null}
</>
  )
}
