import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogListAction } from '../REDUX/Actions/blogActions'
import './home.css'
import '../Axios'

function Home() {

    const dispatch = useDispatch()

    const selector = useSelector(state=>state.blogList)

    const[trending,setTrending] = useState()
    const[code,setCode] = useState()
    const[music,setMusic] = useState()
    
  useEffect(()=>{
    // dispatch(getBlogListAction())
    axios.get('/api/blog/trending').then(res=>setTrending(res.data)).catch(e=>console.log(e))
    axios.get('/api/blog/code').then(res=>setCode(res.data)).catch(e=>console.log(e))
    axios.get('/api/blog/music').then(res=>setMusic(res.data)).catch(e=>console.log(e))
  },[])

  const[all,setAll]=useState(selector.blogs)

  


  return (
    <div className='home'>
      {trending&&music&&code?
      <>
      {/* style="max-width: 540px;" */}
      <h3>Top Article of the Day</h3>
      <div class="card mb-3" >
  <div class="row g-0">
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
    <div class="col-md-4">
      <img src={trending[0].coverImg} class="img-fluid rounded-start" alt="..."></img>
    </div>
  </div>
</div>
<h3>Most Popular </h3>
<div className="trending row row-cols-1 row-cols-sm-2 g-4">
<div class="col " style={{width:'40%'}}>
    <div class="card h-100" >
      <img src={trending[1].coverImg} class="card-img-top homeImage" alt="..."></img>
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">{trending[1].content}</p>
      </div>
    </div>
  </div>
<div class="col " style={{width:'60%'}}>
    <div class="card h-100">
      <img src={trending[2].coverImg} class="card-img-top homeImage" alt="..."></img>
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
<div class="col" style={{width:'60%'}}>
    <div class="card h-100">
      <img src={trending[3].coverImg} class="card-img-top homeImage" alt="..."></img>
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
<div class="col" style={{width:'40%'}}>
    <div class="card h-100">
      <img src={trending[4].coverImg} class="card-img-top homeImage" alt="..."></img>
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
</div>
      </>
      :<h1>Loading...</h1>}
    </div>
      
  )

}

export default Home