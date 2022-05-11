import axios from 'axios'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogListAction } from '../REDUX/Actions/blogActions'
import { Link } from 'react-router-dom'
import './home.css'
import '../Axios'
import Header from './Header'
import portrait from '../portrait.jpg'
import p from '../cover-s.png'
import n from '../nick-morrison-FHnnjk1Yj7Y-unsplash.jpg'

function Home() {

    const dispatch = useDispatch()

    const selector = useSelector(state=>state.blogList)

    const[trending,setTrending] = useState()
    const[Technology,setTechnology] = useState()
    const[Health,setHealth] = useState()
    const[Food,setFood] = useState()
    const[Lifestyle,setLifestyle] = useState()
    const[Travel,setTravel] = useState()
    const[Spirituality,setSpirituality] = useState()
    const[Current_affairs,setCurrent_affairs] = useState()
    const[Books,setBooks] = useState()
    const[Politics,setPolitics] = useState()
    const[Finance,setFinance] = useState()
    
    // const[sw,setSW]=useState(window.innerWidth)
    // const[mv,setMV]=useState()
    // useLayoutEffect(()=>{
    //   if(window.innerWidth<600){
    //     setMV(true)
    //   }
    //   else{
    //     setMV(false)
    //   }
    // },[window.innerWidth])

  useEffect(()=>{
    // dispatch(getBlogListAction())
    axios.get('/api/blog/cat/all').then(res=>setTrending(res.data.posts)).catch(e=>console.log(e))
    axios.get('/api/blog/cat/Technology').then(res=>setTechnology(res.data.posts)).catch(e=>console.log(e))
    axios.get('/api/blog/cat/Health').then(res=>setHealth(res.data.posts)).catch(e=>console.log(e))
    axios.get('/api/blog/cat/Food').then(res=>setFood(res.data.posts)).catch(e=>console.log(e))
    axios.get('/api/blog/cat/Travel').then(res=>setTravel(res.data.posts)).catch(e=>console.log(e))
    axios.get('/api/blog/cat/Lifestyle').then(res=>setLifestyle(res.data.posts)).catch(e=>console.log(e))
    axios.get('/api/blog/cat/Spirituality').then(res=>setSpirituality(res.data.posts)).catch(e=>console.log(e))
    axios.get('/api/blog/cat/Current_affairs').then(res=>setCurrent_affairs(res.data.posts)).catch(e=>console.log(e))
    axios.get('/api/blog/cat/Books').then(res=>setBooks(res.data.posts)).catch(e=>console.log(e))
    axios.get('/api/blog/cat/Politics').then(res=>setPolitics(res.data.posts)).catch(e=>console.log(e))
    axios.get('/api/blog/cat/Finance').then(res=>setFinance(res.data.posts)).catch(e=>console.log(e))
    // axios.get('/api/blog/cat/Career_guidance').then(res=>setCareer_guidance(res.data.posts)).catch(e=>console.log(e))
  // alert(window.innerWidth)
  },[])

  const[all,setAll]=useState(selector.blogs)

  // alert(JSON.stringify(screen.width))


  return (<>
  <Header/>
    <div className='home'>
      {/* portrait - pc */}
      <div className='home-cover-img'>
      <img src={p} className='portrait' alt="" />
      </div>
      {/* <h1>Read</h1>
      <h1>Write</h1>
      <h1>Share</h1> */}
      {/* square - mobile */}
      {Technology&&Health&&Travel&&Food&&Lifestyle&&Spirituality&&Current_affairs&&Books&&Politics&&Finance?
      <>
      {/* style="max-width: 540px;" */}
      <h3 className=' top'>Top Article of the Day</h3>

      {trending[0]?<>
{/*  */}
        {/* <div class="mb-3" id='EXcard' >
  <div class="row row-cols-2 ">
    <div class="col-8">
      <div class="cbody">
        <h5 class="ctitle">{trending[0].title}</h5>
        <div className="authorInfo  d-flex">
          <img className='auth_pic align-self-center' src={trending[0].author.profile_pic}></img>
          <h7 className='align-self-center'>{trending[0].author.name}</h7>
        </div>
        <p class="ctext">{trending[0].desc}</p>
        <Link className='rl' to ={`/read/${trending[0]._id}`} >Read More ..</Link>
      </div>
    </div>
    <div class="col-4 top-a-img-ex">
      <img src={trending[0].coverImg} class=" " alt="..."></img>
    </div>
  </div>
</div> */}
{/*  */}
      <div class="topCRD mb-3" id='Lcard' >
  <div class="topIMG">
      <img src={trending[0].coverImg} class=" " alt="Loading..."></img>
    </div>
      <div class="tbody">
        <h5 class="">{trending[0].title}</h5>
        <div className="auth_info">
          <img className='auth_pic' src={trending[0].author.profile_pic}></img>
          <h7 className=''>{trending[0].author.name}</h7>
        </div>
        <p class="desc">{trending[0].desc}</p>
        <Link className='rl' to ={`/read/${trending[0]._id}`} >Read More ..</Link>
      </div>
</div>

{/* <div class="card mb-3" id='Pcard' >
  <div class="row g-0">
    <div class="col-md-4 top-a-img">
      <img src={trending[0].coverImg} class="img-fluid " alt="..."></img>
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{trending[0].title}</h5>
        <div className="authorInfo  d-flex">
          <img className='auth_pic align-self-center' src={trending[0].author.profile_pic}></img>
          <h7 className='align-self-center'>{trending[0].author.name}</h7>
        </div>
        <p class="card-text">{trending[0].desc}</p>
        <Link className='rl' to ={`/read/${trending[0]._id}`} >Read More ..</Link>
      </div>
    </div>
  </div>
</div> */}
</>
:null}
{/* mobile  screen */}
{/* {
  ()?{}
} */}
{/*  */}
<div className=" cat d-flex justify-content-between align-content-center mt-5">
<h3>Most Popular </h3>
<Link to='/cat/all' className='link' href=''>View More --></Link>
</div>
<div className="trending row row-cols-1 row-cols-sm-2 g-4">
<div class="col " id='p4'>
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
<Link className='rl' to ={`/read/${trending[1]._id}`} >Read More ..</Link>
      </div>
    </div>
    :null}
  </div>
<div class="col " id='p6'>
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
<Link className='rl' to ={`/read/${trending[2]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" id='p6e' >
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
<Link className='rl' to ={`/read/${trending[3]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" id='p4e'>
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
<Link className='rl' to ={`/read/${trending[4]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
</div>
<div className=" cat d-flex justify-content-between align-content-center mt-5">
<h3>Technology </h3>
<Link to='/cat/Technology' className='link'>View More --></Link>
</div>
<div className="trending row row-cols-1 row-cols-sm-2 g-4">
<div class="col " id='p4'>
{Technology[0]?
    <div class="card h-100" >
    <img src={Technology[0].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Technology[0].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Technology[0].author.profile_pic}></img>
        <h7 className='align-self-center'>{Technology[0].author.name}</h7>
      </div>
      <p class="card-text">{Technology[0].desc}</p>
<Link className='rl' to ={`/read/${Technology[0]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" id='p6' >
{Technology[1]?
    <div class="card h-100" >
    <img src={Technology[1].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Technology[1].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Technology[1].author.profile_pic}></img>
        <h7 className='align-self-center'>{Technology[1].author.name}</h7>
      </div>
      <p class="card-text">{Technology[1].desc}</p>
<Link className='rl' to ={`/read/${Technology[1]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" id='p6e'>
{Technology[2]?
    <div class="card h-100" >
    <img src={Technology[2].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Technology[2].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Technology[2].author.profile_pic}></img>
        <h7 className='align-self-center'>{Technology[2].author.name}</h7>
      </div>
      <p class="card-text">{Technology[2].desc}</p>
<Link className='rl' to ={`/read/${Technology[2]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" id='p4e'>
{Technology[3]?
    <div class="card h-100" >
    <img src={Technology[3].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Technology[3].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Technology[3].author.profile_pic}></img>
        <h7 className='align-self-center'>{Technology[3].author.name}</h7>
      </div>
      <p class="card-text">{Technology[3].desc}</p>
<Link className='rl' to ={`/read/${Technology[3]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
</div>
<div className=" cat d-flex justify-content-between align-content-center mt-5">
<h3>Travel </h3>
<Link to='/cat/Travel' className='link'>View More --></Link>
</div>
<div className="trending row row-cols-1 row-cols-sm-2 g-4">
<div class="col " id='p4'>
{Travel[0]?
    <div class="card h-100" >
    <img src={Travel[0].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Travel[0].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Travel[0].author.profile_pic}></img>
        <h7 className='align-self-center'>{Travel[0].author.name}</h7>
      </div>
      <p class="card-text">{Travel[0].desc}</p>
<Link className='rl' to ={`/read/${Travel[0]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" id='p6'>
{Travel[1]?
    <div class="card h-100" >
    <img src={Travel[1].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Travel[1].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Travel[1].author.profile_pic}></img>
        <h7 className='align-self-center'>{Travel[1].author.name}</h7>
      </div>
      <p class="card-text">{Travel[1].desc}</p>
<Link className='rl' to ={`/read/${Travel[1]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" id='p6e'>
{Travel[2]?
    <div class="card h-100" >
    <img src={Travel[2].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Travel[2].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Travel[2].author.profile_pic}></img>
        <h7 className='align-self-center'>{Travel[2].author.name}</h7>
      </div>
      <p class="card-text">{Travel[2].desc}</p>
<Link className='rl' to ={`/read/${Travel[2]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" id='p4e'>
{Travel[3]?
    <div class="card h-100" >
    <img src={Travel[3].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Travel[3].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Travel[3].author.profile_pic}></img>
        <h7 className='align-self-center'>{Travel[3].author.name}</h7>
      </div>
      <p class="card-text">{Travel[3].desc}</p>
<Link className='rl' to ={`/read/${Travel[3]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
</div>

<div className=" cat d-flex justify-content-between align-content-center mt-5">
<h3>Food </h3>
<Link to='/cat/Food' className='link'>View More --></Link>
</div>
<div className="trending row row-cols-1 row-cols-sm-2 g-4">
<div class="col " id='p4'>
{Food[0]?
    <div class="card h-100" >
    <img src={Food[0].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Food[0].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Food[0].author.profile_pic}></img>
        <h7 className='align-self-center'>{Food[0].author.name}</h7>
      </div>
      <p class="card-text">{Food[0].desc}</p>
<Link className='rl' to ={`/read/${Food[0]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" id='p6' >
{Food[1]?
    <div class="card h-100" >
    <img src={Food[1].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Food[1].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Food[1].author.profile_pic}></img>
        <h7 className='align-self-center'>{Food[1].author.name}</h7>
      </div>
      <p class="card-text">{Food[1].desc}</p>
<Link className='rl' to ={`/read/${Food[1]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" id='p6e'>
{Food[2]?
    <div class="card h-100" >
    <img src={Food[2].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Food[2].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Food[2].author.profile_pic}></img>
        <h7 className='align-self-center'>{Food[2].author.name}</h7>
      </div>
      <p class="card-text">{Food[2].desc}</p>
<Link className='rl' to ={`/read/${Food[2]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" id='p4e'>
{Food[3]?
    <div class="card h-100" >
    <img src={Food[3].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Food[3].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Food[3].author.profile_pic}></img>
        <h7 className='align-self-center'>{Food[3].author.name}</h7>
      </div>
      <p class="card-text">{Food[3].desc}</p>
<Link className='rl' to ={`/read/${Food[3]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
</div>



<div className=" cat d-flex justify-content-between align-content-center mt-5">
<h3>Health </h3>
<Link to='/cat/Health' className='link'>View More --></Link>
</div>
<div className="trending row row-cols-1 row-cols-sm-2 g-4">
<div class="col " id='p4'>
{Health[0]?
    <div class="card h-100" >
    <img src={Health[0].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Health[0].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Health[0].author.profile_pic}></img>
        <h7 className='align-self-center'>{Health[0].author.name}</h7>
      </div>
      <p class="card-text">{Health[0].desc}</p>
<Link className='rl' to ={`/read/${Health[0]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" id='p6' >
{Health[1]?
    <div class="card h-100" >
    <img src={Health[1].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Health[1].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Health[1].author.profile_pic}></img>
        <h7 className='align-self-center'>{Health[1].author.name}</h7>
      </div>
      <p class="card-text">{Health[1].desc}</p>
<Link className='rl' to ={`/read/${Health[1]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" id='p6e'>
{Health[2]?
    <div class="card h-100" >
    <img src={Health[2].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Health[2].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Health[2].author.profile_pic}></img>
        <h7 className='align-self-center'>{Health[2].author.name}</h7>
      </div>
      <p class="card-text">{Health[2].desc}</p>
<Link className='rl' to ={`/read/${Health[2]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" id='p4e'>
{Health[3]?
    <div class="card h-100" >
    <img src={Health[3].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Health[3].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Health[3].author.profile_pic}></img>
        <h7 className='align-self-center'>{Health[3].author.name}</h7>
      </div>
      <p class="card-text">{Health[3].desc}</p>
<Link className='rl' to ={`/read/${Health[3]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
</div>

<div className=" cat d-flex justify-content-between align-content-center mt-5">
<h3>Lifestyle</h3>
<Link to='/cat/Lifestyle' className='link'>View More --></Link>
</div>
<div className="trending row row-cols-1 row-cols-sm-2 g-4">
<div class="col " id='p4'>
{Lifestyle[0]?
    <div class="card h-100" >
    <img src={Lifestyle[0].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Lifestyle[0].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Lifestyle[0].author.profile_pic}></img>
        <h7 className='align-self-center'>{Lifestyle[0].author.name}</h7>
      </div>
      <p class="card-text">{Lifestyle[0].desc}</p>
<Link className='rl' to ={`/read/${Lifestyle[0]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" id='p6' >
{Lifestyle[1]?
    <div class="card h-100" >
    <img src={Lifestyle[1].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Lifestyle[1].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Lifestyle[1].author.profile_pic}></img>
        <h7 className='align-self-center'>{Lifestyle[1].author.name}</h7>
      </div>
      <p class="card-text">{Lifestyle[1].desc}</p>
<Link className='rl' to ={`/read/${Lifestyle[1]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" id='p6e'>
{Lifestyle[2]?
    <div class="card h-100" >
    <img src={Lifestyle[2].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Lifestyle[2].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Lifestyle[2].author.profile_pic}></img>
        <h7 className='align-self-center'>{Lifestyle[2].author.name}</h7>
      </div>
      <p class="card-text">{Lifestyle[2].desc}</p>
<Link className='rl' to ={`/read/${Lifestyle[2]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" id='p4e'>
{Lifestyle[3]?
    <div class="card h-100" >
    <img src={Lifestyle[3].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Lifestyle[3].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Lifestyle[3].author.profile_pic}></img>
        <h7 className='align-self-center'>{Lifestyle[3].author.name}</h7>
      </div>
      <p class="card-text">{Lifestyle[3].desc}</p>
<Link className='rl' to ={`/read/${Lifestyle[3]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
</div>

<div className=" cat d-flex justify-content-between align-content-center mt-5">
<h3>Spirituality </h3>
<Link to='/cat/Spirituality' className='link'>View More --></Link>
</div>
<div className="trending row row-cols-1 row-cols-sm-2 g-4">
<div class="col " id='p4'>
{Spirituality[0]?
    <div class="card h-100" >
    <img src={Spirituality[0].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Spirituality[0].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Spirituality[0].author.profile_pic}></img>
        <h7 className='align-self-center'>{Spirituality[0].author.name}</h7>
      </div>
      <p class="card-text">{Spirituality[0].desc}</p>
<Link className='rl' to ={`/read/${Spirituality[0]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" id='p6'>
{Spirituality[1]?
    <div class="card h-100" >
    <img src={Spirituality[1].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Spirituality[1].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Spirituality[1].author.profile_pic}></img>
        <h7 className='align-self-center'>{Spirituality[1].author.name}</h7>
      </div>
      <p class="card-text">{Spirituality[1].desc}</p>
<Link className='rl' to ={`/read/${Spirituality[1]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" id='p6e'>
{Spirituality[2]?
    <div class="card h-100" >
    <img src={Spirituality[2].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Spirituality[2].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Spirituality[2].author.profile_pic}></img>
        <h7 className='align-self-center'>{Spirituality[2].author.name}</h7>
      </div>
      <p class="card-text">{Spirituality[2].desc}</p>
<Link className='rl' to ={`/read/${Spirituality[2]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" id='p4e'>
{Spirituality[3]?
    <div class="card h-100" >
    <img src={Spirituality[3].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Spirituality[3].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Spirituality[3].author.profile_pic}></img>
        <h7 className='align-self-center'>{Spirituality[3].author.name}</h7>
      </div>
      <p class="card-text">{Spirituality[3].desc}</p>
<Link className='rl' to ={`/read/${Spirituality[3]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
</div>

<div className=" cat d-flex justify-content-between align-content-center mt-5">
<h3>Current Affairs </h3>
<Link to='/cat/Current_affairs' className='link'>View More --></Link>
</div>
<div className="trending row row-cols-1 row-cols-sm-2 g-4">
<div class="col " id='p4'>
{Current_affairs[0]?
    <div class="card h-100" >
    <img src={Current_affairs[0].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Current_affairs[0].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Current_affairs[0].author.profile_pic}></img>
        <h7 className='align-self-center'>{Current_affairs[0].author.name}</h7>
      </div>
      <p class="card-text">{Current_affairs[0].desc}</p>
<Link className='rl' to ={`/read/${Current_affairs[0]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" id='p6'>
{Current_affairs[1]?
    <div class="card h-100" >
    <img src={Current_affairs[1].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Current_affairs[1].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Current_affairs[1].author.profile_pic}></img>
        <h7 className='align-self-center'>{Current_affairs[1].author.name}</h7>
      </div>
      <p class="card-text">{Current_affairs[1].desc}</p>
<Link className='rl' to ={`/read/${Current_affairs[1]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" id='p6e'>
{Current_affairs[2]?
    <div class="card h-100" >
    <img src={Current_affairs[2].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Current_affairs[2].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Current_affairs[2].author.profile_pic}></img>
        <h7 className='align-self-center'>{Current_affairs[2].author.name}</h7>
      </div>
      <p class="card-text">{Current_affairs[2].desc}</p>
<Link className='rl' to ={`/read/${Current_affairs[2]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" id='p4e'>
{Current_affairs[3]?
    <div class="card h-100" >
    <img src={Current_affairs[3].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Current_affairs[3].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Current_affairs[3].author.profile_pic}></img>
        <h7 className='align-self-center'>{Current_affairs[3].author.name}</h7>
      </div>
      <p class="card-text">{Current_affairs[3].desc}</p>
<Link className='rl' to ={`/read/${Current_affairs[3]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
</div>

<div className=" cat d-flex justify-content-between align-content-center mt-5">
<h3>Books </h3>
<Link to='/cat/Books' className='link'>View More --></Link>
</div>
<div className="trending row row-cols-1 row-cols-sm-2 g-4">
<div class="col " id='p4'>
{Books[0]?
    <div class="card h-100" >
    <img src={Books[0].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Books[0].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Books[0].author.profile_pic}></img>
        <h7 className='align-self-center'>{Books[0].author.name}</h7>
      </div>
      <p class="card-text">{Books[0].desc}</p>
<Link className='rl' to ={`/read/${Books[0]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" id='p6' >
{Books[1]?
    <div class="card h-100" >
    <img src={Books[1].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Books[1].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Books[1].author.profile_pic}></img>
        <h7 className='align-self-center'>{Books[1].author.name}</h7>
      </div>
      <p class="card-text">{Books[1].desc}</p>
<Link className='rl' to ={`/read/${Books[1]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" id='p6e'>
{Books[2]?
    <div class="card h-100" >
    <img src={Books[2].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Books[2].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Books[2].author.profile_pic}></img>
        <h7 className='align-self-center'>{Books[2].author.name}</h7>
      </div>
      <p class="card-text">{Books[2].desc}</p>
<Link className='rl' to ={`/read/${Books[2]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" id='p4e'>
{Books[3]?
    <div class="card h-100" >
    <img src={Books[3].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Books[3].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Books[3].author.profile_pic}></img>
        <h7 className='align-self-center'>{Books[3].author.name}</h7>
      </div>
      <p class="card-text">{Books[3].desc}</p>
<Link className='rl' to ={`/read/${Books[3]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
</div>


<div className=" cat d-flex justify-content-between align-content-center mt-5">
<h3>Finance</h3>
<Link to='/cat/Finance' className='link'>View More --></Link>
</div>
<div className="trending row row-cols-1 row-cols-sm-2 g-4">
<div class="col " id='p4'>
{Finance[0]?
    <div class="card h-100" >
    <img src={Finance[0].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Finance[0].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Finance[0].author.profile_pic}></img>
        <h7 className='align-self-center'>{Finance[0].author.name}</h7>
      </div>
      <p class="card-text">{Finance[0].desc}</p>
<Link className='rl' to ={`/read/${Finance[0]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" id='p6'>
{Finance[1]?
    <div class="card h-100" >
    <img src={Finance[1].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Finance[1].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Finance[1].author.profile_pic}></img>
        <h7 className='align-self-center'>{Finance[1].author.name}</h7>
      </div>
      <p class="card-text">{Finance[1].desc}</p>
<Link className='rl' to ={`/read/${Finance[1]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" id='p6e'>
{Finance[2]?
    <div class="card h-100" >
    <img src={Finance[2].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Finance[2].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Finance[2].author.profile_pic}></img>
        <h7 className='align-self-center'>{Finance[2].author.name}</h7>
      </div>
      <p class="card-text">{Finance[2].desc}</p>
<Link className='rl' to ={`/read/${Finance[2]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" id='p4e'>
{Finance[3]?
    <div class="card h-100" >
    <img src={Finance[3].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Finance[3].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Finance[3].author.profile_pic}></img>
        <h7 className='align-self-center'>{Finance[3].author.name}</h7>
      </div>
      <p class="card-text">{Finance[3].desc}</p>
<Link className='rl' to ={`/read/${Finance[3]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
</div>


<div className=" cat d-flex justify-content-between align-content-center mt-5">
<h3>Politics</h3>
<Link to='/cat/Politics' className='link'>View More --></Link>
</div>
<div className="trending row row-cols-1 row-cols-sm-2 g-4">
<div class="col " id='p4'>
{Politics[0]?
    <div class="card h-100" >
    <img src={Politics[0].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Politics[0].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Politics[0].author.profile_pic}></img>
        <h7 className='align-self-center'>{Politics[0].author.name}</h7>
      </div>
      <p class="card-text">{Politics[0].desc}</p>
<Link className='rl' to ={`/read/${Politics[0]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" id='p6' >
{Politics[1]?
    <div class="card h-100" >
    <img src={Politics[1].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Politics[1].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Politics[1].author.profile_pic}></img>
        <h7 className='align-self-center'>{Politics[1].author.name}</h7>
      </div>
      <p class="card-text">{Politics[1].desc}</p>
<Link className='rl' to ={`/read/${Politics[1]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" id='p6e'>
{Politics[2]?
    <div class="card h-100" >
    <img src={Politics[2].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Politics[2].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Politics[2].author.profile_pic}></img>
        <h7 className='align-self-center'>{Politics[2].author.name}</h7>
      </div>
      <p class="card-text">{Politics[2].desc}</p>
<Link className='rl' to ={`/read/${Politics[2]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
<div class="col" id='p4e'>
{Politics[3]?
    <div class="card h-100" >
    <img src={Politics[3].coverImg} class="card-img-top homeImage" alt="..."></img>
    <div class="card-body">
      <h5 class="card-title">{Politics[3].title}</h5>
      <div className="authorInfo  d-flex">
        <img className='auth_pic align-self-center' src={Politics[3].author.profile_pic}></img>
        <h7 className='align-self-center'>{Politics[3].author.name}</h7>
      </div>
      <p class="card-text">{Politics[3].desc}</p>
<Link className='rl' to ={`/read/${Politics[3]._id}`} >Read More ..</Link>
    </div>
  </div>
    :null}
  </div>
</div>

<div className='hv'>

      {/* <button className=' mt-3 btn btn-outline-dark'><Link to='/cat/all' className='link' href=''>Explore</Link></button> */}
      </div>
      </>
      :<div class="loader"></div>}
      
    </div>
    </>
  )

}

export default Home