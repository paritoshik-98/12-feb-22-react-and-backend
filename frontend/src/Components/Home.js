import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogListAction } from '../REDUX/Actions/blogActions'
import { Link } from 'react-router-dom'
import './home.css'
import '../Axios'
import Header from './Header'
import portrait from '../portrait.jpg'
import p from '../jess-bailey-q10VITrVYUM-unsplash.jpg'
import n from '../nick-morrison-FHnnjk1Yj7Y-unsplash.jpg'

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
      {/* portrait - pc */}
      <img src={p} className='portrait' alt="" />
      {/* <h1>Read</h1>
      <h1>Write</h1>
      <h1>Share</h1> */}
      {/* square - mobile */}
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
        <div className="authorInfo  d-flex">
          <img className='auth_pic align-self-center' src={trending[1].author.profile_pic}></img>
          <h7 className='align-self-center'>{trending[1].author.name}</h7>
        </div>
        <p class="card-text">{trending[1].desc}</p>
<Link to ={`/read/${trending[1]._id}`} >Read More ..</Link>
      </div>
    </div>
    :null}
  </div>
<div class="col " style={{width:'60%'}}>
{trending[2]?
    <div class="card h-100" >
    <img src={trending[2].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{trending[2].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={trending[2].author.profile_pic}></img>
        <h7 className='align-self-center'>{trending[2].author.name}</h7>
      </div>
      <p class="card-text">{trending[2].desc}</p>
<Link to ={`/read/${trending[2]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" style={{width:'60%'}}>
{trending[3]?
    <div class="card h-100" >
    <img src={trending[3].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{trending[3].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={trending[3].author.profile_pic}></img>
        <h7 className='align-self-center'>{trending[3].author.name}</h7>
      </div>
      <p class="card-text">{trending[3].desc}</p>
<Link to ={`/read/${trending[3]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" style={{width:'40%'}}>
{trending[4]?
    <div class="card h-100" >
    <img src={trending[4].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{trending[4].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={trending[4].author.profile_pic}></img>
        <h7 className='align-self-center'>{trending[4].author.name}</h7>
      </div>
      <p class="card-text">{trending[4].desc}</p>
<Link to ={`/read/${trending[4]._id}`} >Read More ..</Link>
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
{code[0]?
    <div class="card h-100" >
    <img src={code[0].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{code[0].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={code[0].author.profile_pic}></img>
        <h7 className='align-self-center'>{code[0].author.name}</h7>
      </div>
      <p class="card-text">{code[0].desc}</p>
<Link to ={`/read/${code[0]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" style={{width:'60%'}}>
{code[1]?
    <div class="card h-100" >
    <img src={code[1].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{code[1].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={code[1].author.profile_pic}></img>
        <h7 className='align-self-center'>{code[1].author.name}</h7>
      </div>
      <p class="card-text">{code[1].desc}</p>
<Link to ={`/read/${code[1]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" style={{width:'60%'}}>
{code[2]?
    <div class="card h-100" >
    <img src={code[2].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{code[2].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={code[2].author.profile_pic}></img>
        <h7 className='align-self-center'>{code[2].author.name}</h7>
      </div>
      <p class="card-text">{code[2].desc}</p>
<Link to ={`/read/${code[2]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" style={{width:'40%'}}>
{code[3]?
    <div class="card h-100" >
    <img src={code[3].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{code[3].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={code[3].author.profile_pic}></img>
        <h7 className='align-self-center'>{code[3].author.name}</h7>
      </div>
      <p class="card-text">{code[3].desc}</p>
<Link to ={`/read/${code[3]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
</div>
<div className=" cat d-flex justify-content-between align-content-center mt-5">
<h3>Music </h3>
<Link to='/cat/music' className='link'>View More --></Link>
</div>
<div className="trending row row-cols-1 row-cols-sm-2 g-4">
<div class="col " style={{width:'40%'}}>
{music[0]?
    <div class="card h-100" >
    <img src={music[0].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{music[0].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={music[0].author.profile_pic}></img>
        <h7 className='align-self-center'>{music[0].author.name}</h7>
      </div>
      <p class="card-text">{music[0].desc}</p>
<Link to ={`/read/${music[0]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" style={{width:'60%'}}>
{music[1]?
    <div class="card h-100" >
    <img src={music[1].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{music[1].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={music[1].author.profile_pic}></img>
        <h7 className='align-self-center'>{music[1].author.name}</h7>
      </div>
      <p class="card-text">{music[1].desc}</p>
<Link to ={`/read/${music[1]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" style={{width:'60%'}}>
{music[2]?
    <div class="card h-100" >
    <img src={music[2].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{music[2].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={music[2].author.profile_pic}></img>
        <h7 className='align-self-center'>{music[2].author.name}</h7>
      </div>
      <p class="card-text">{music[2].desc}</p>
<Link to ={`/read/${music[2]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" style={{width:'40%'}}>
{music[3]?
    <div class="card h-100" >
    <img src={music[3].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{music[3].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={music[3].author.profile_pic}></img>
        <h7 className='align-self-center'>{music[3].author.name}</h7>
      </div>
      <p class="card-text">{music[3].desc}</p>
<Link to ={`/read/${music[3]._id}`} >Read More ..</Link>
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