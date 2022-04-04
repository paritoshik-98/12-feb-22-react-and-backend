import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogListAction } from '../REDUX/Actions/blogActions'
import { Link } from 'react-router-dom'
import './home.css'
import '../Axios'
import Header from './Header'
function Home() {

    const dispatch = useDispatch()

    const selector = useSelector(state=>state.blogList)

    const[trending,setTrending] = useState()
    const[code,setCode] = useState()
    const[music,setMusic] = useState()
    
  useEffect(()=>{
    // dispatch(getBlogListAction())
    axios.get('/api/blog/cat/all').then(res=>setTrending(res.data.posts)).catch(e=>console.log(e))
    axios.get('/api/blog/cat/code').then(res=>setCode(res.data.posts)).catch(e=>console.log(e))
    axios.get('/api/blog/cat/music').then(res=>setMusic(res.data.posts)).catch(e=>console.log(e))
  },[])

  const[all,setAll]=useState(selector.blogs)

  


  return (<>
  <Header/>
    <div className='home'>
      {trending&&music&&code?
      <>
      {/* style="max-width: 540px;" */}
      <h3 className=' top'>Top Article of the Day</h3>

      {trending[0]?
      <div class="card mb-3" >
  <div class="row g-0">
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{trending[0].title}</h5>
        <div className="authorInfo  d-flex">
          <img className='auth_pic align-self-center' src={trending[0].author.profile_pic}></img>
          <h7 className='align-self-center'>{trending[0].author.name}</h7>
        </div>
        <p class="card-text">{trending[0].desc}</p>
        <Link to ={`/read/${trending[0]._id}`} >Read More ..</Link>
        {/* <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
      </div>
    </div>
    <div class="col-md-4 top-a-img">
      <img src={trending[0].coverImg} class="img-fluid rounded-start" alt="..."></img>
    </div>
  </div>
</div>
:null}

<div className=" cat d-flex justify-content-between align-content-center mt-5">
<h3>Most Popular </h3>
<Link to='/cat/all' className='link' href=''>View More --></Link>
</div>
<div className="trending row row-cols-1 row-cols-sm-2 g-4">
<div class="col " style={{width:'40%'}}>
{trending[1]?
    <div class="card h-100" >
      <img src={trending[1].coverImg} class="card-img-top homeImage" alt="..."></img>
      <div class="card-body">
        <h5 class="card-title">{trending[1].title}</h5>
        <p class="card-text">{trending[1].desc}</p>
      </div>
    </div>
    :null}
  </div>
<div class="col " style={{width:'60%'}}>
{trending[2]?
    <div class="card h-100">
      <img src={trending[2].coverImg} class="card-img-top homeImage" alt="..."></img>
      <div class="card-body">
        <h5 class="card-title">{trending[2].title}</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
    :null}
  </div>
<div class="col" style={{width:'60%'}}>
{trending[3]?
    <div class="card h-100">
      <img src={trending[3].coverImg} class="card-img-top homeImage" alt="..."></img>
      <div class="card-body">
        <h5 class="card-title">{trending[3].title}</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
    :null}
  </div>
<div class="col" style={{width:'40%'}}>
{trending[4]?
    <div class="card h-100">
      <img src={trending[4].coverImg} class="card-img-top homeImage" alt="..."></img>
      <div class="card-body">
        <h5 class="card-title">{trending[4].title}</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
    :null}
  </div>
</div>
<div className=" cat d-flex justify-content-between align-content-center mt-5">
<h3>Code </h3>
<Link to='/cat/code' className='link'>View More --></Link>
</div>
<div className="trending row row-cols-1 row-cols-sm-2 g-4">
<div class="col " style={{width:'40%'}}>
{trending[0]?
    <div class="card h-100" >
      <img src={trending[0].coverImg} class="card-img-top homeImage" alt="..."></img>
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">{trending[0].content}</p>
      </div>
    </div>
    :null}
  </div>
<div class="col" style={{width:'60%'}}>
{trending[1]?
    <div class="card h-100">
      <img src={trending[1].coverImg} class="card-img-top homeImage" alt="..."></img>
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
    :null}
  </div>
<div class="col" style={{width:'60%'}}>
{trending[2]?
    <div class="card h-100">
      <img src={trending[2].coverImg} class="card-img-top homeImage" alt="..."></img>
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
    :null}
  </div>
<div class="col" style={{width:'40%'}}>
{trending[3]?
    <div class="card h-100">
      <img src={trending[3].coverImg} class="card-img-top homeImage" alt="..."></img>
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
    :null}
  </div>
</div>
      </>
      :<h1>Loading...</h1>}
    </div>
    </>
  )

}

export default Home