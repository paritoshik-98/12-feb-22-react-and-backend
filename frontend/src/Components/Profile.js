import React, { useEffect, useState } from 'react'
import './profile.css'
import axios from 'axios'
import '../Axios'
import Header from './Header'

import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom'
import { deletePic, updatePic } from '../REDUX/Actions/userActions';
import { useDispatch } from 'react-redux';

function Profile() {

  const dispatch = useDispatch()

  const [profile,setProfile] = useState({})


  useEffect(()=>{
    axios.get('/api/user/profile').then(res=>{
      setProfile(res.data)
      setDP(res.data.profile_pic)
    })
  },[])

//   const[image,setImage]=useState()

//     const [imageurl,seturl]=useState()

// const [Loader,setL] = useState(false)

// const [uploadI,setUpload] = useState()

// useEffect(()=>{


// // const uploader = async()=>{
//   if(image){
// try {
  

//   // console.log(res)
// seturl(data.url);
// setImage(data.url)
// })

// } catch (error) {
//   alert('image update failed')
// }
//   }
// },[uploadI])



const[loading,setLoading] = useState(false)

const upload = async() => {
  if(!selected){alert('select file before upload')}
  else{
    setLoading(true)
    try {
      
      const formData = new FormData()
      formData.append('file',selected)
      formData.append('upload_preset','tszhqchc')
      fetch("  https://api.cloudinary.com/v1_1/drzjynyvq/image/upload",{
    method:"post",
    body: formData
    })
    .then(resp => resp.json())
    .then(async (data) => {
      console.log(data.url)
      // const res = await axios.post('http://localhost:8080/api/user/updatePic',{id:profile._id,url:data.url},{
      const res = await axios.post('/api/user/updatePic',{id:profile._id,url:data.url},{
        withCredentials: true,
      })
      if(res.status===200){
        setLoading(false)
        setDP(data.url)
        dispatch(updatePic(data.url))
      }
      else{
        setLoading(false)
      alert('Update Failed')
      }
    })
    } catch (error) {
      setLoading(false)
      alert('Update Failed')
    }
  }
}

const RemoveImage = async()=>{
  try{
    setLoading(true)
    // const res = await axios.post('http://localhost:8080/api/user/updatePic',{id:profile._id,url:"https://res.cloudinary.com/drzjynyvq/image/upload/v1648718621/wdjpzij0wm5doew8oygm.png"},{
    const res = await axios.post('/api/user/updatePic',{id:profile._id,url:"https://res.cloudinary.com/drzjynyvq/image/upload/v1648718621/wdjpzij0wm5doew8oygm.png"},{
      withCredentials: true,
    })
    if(res.status===200){
    setLoading(false)
  setDP("https://res.cloudinary.com/drzjynyvq/image/upload/v1648718621/wdjpzij0wm5doew8oygm.png");
  dispatch(deletePic("https://res.cloudinary.com/drzjynyvq/image/upload/v1648718621/wdjpzij0wm5doew8oygm.png"))
    }
    else{
      setLoading(false)
    alert('image update failed')
    }
  }
  catch(error){
    setLoading(false)
    alert('image update failed')}
}

const [DP,setDP] = useState()

const [selected,setNew] = useState()

const [editD,setED] = useState(false)



  return (
    <>
    <Header/>
    <div className='profile'>

      

    {profile?<div className='d-flex justify-content-between'>
    <div className='d-flex'>

      <div>
      {loading?<h1>Loading...</h1>:<img  className='dp' src={DP} alt="" />}
      <div>
      <button className='icons' onClick={()=>setED(!editD)}><FaEdit size={32}/></button>
      <button className='icons'onClick={RemoveImage}><MdDelete size={32}/></button>
      </div>
      </div>

      <div>
        <h1><b>{profile.name}</b></h1>
        <h5 className='text-muted'>{profile.email}</h5>
      </div>

</div>

<div className='d-flex flex-column pl'>
  <Link to = '/myArticles'><button className='b btn btn-outline-dark'>My Articles</button></Link>
  <Link to = '/Favourites'><button className='b btn btn-outline-dark'>Favourites</button></Link>
  <Link to = '/Drafts'><button className='b btn btn-outline-dark'>My Drafts</button></Link>
  <Link to = '/ChangePassword'><button className='b btn btn-outline-dark'>Change Password</button></Link>
</div>



</div>

  :null}
  { editD ?
  <>
  <input type="file" name="" id="Fi" onChange={(e)=>setNew(e.target.files[0])}/>
  <div>
<button className='btn btn-outline-dark' onClick={upload}>Upload</button>
</div>
  </>
  :null
}
    </div>
    </>
    )
}

export default Profile

// import React, { useEffect,useState } from 'react';
// import { GoogleLogout } from 'react-google-login';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import Navbar from './Navbar';
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import { TailSpin } from  'react-loader-spinner'
// import axios from 'axios';
// function Dashboard() {
//   const userinfo = useSelector((state)=>state.user)
//   const [dashboard,setD] = useState({name:'',email:'',password:''})
//   const navigate = useNavigate()
//     useEffect(()=>{
//       if (userinfo) {setD(userinfo)}
      
//     },[userinfo])

    // const[image,setImage]=useState()
    // const [imageurl,seturl]=useState()


 
//   return <div>
//     {/* <Navbar/> */}
//     <h1>MY PROFILE</h1>
//     <div>
//       <h2>Profile Picture</h2>
//       {(imageurl)?<img src={imageurl}></img>:<img width='300px' height='300px'src={dashboard.profile_pic}></img>}
    
//     <button onClick={RemoveImage}>Remove profile pic</button>
//     </div>
//     <div><input type="file" id='Iupload' onChange={(event)=>{setImage(event.target.files[0])}}/></div>
//     <button onClick={uploadImage}>upload Image</button>
//     <div>
//       <h3>Name:{dashboard.name}</h3>
//       <h3>Email:{dashboard.email}</h3>
//     </div>
//   </div>
// }

// export default Dashboard;
