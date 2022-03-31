import React, { useEffect, useState } from 'react'
import './profile.css'
import axios from 'axios'
import '../Axios'

function Profile() {

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
      const res = await axios.post('http://localhost:8080/api/user/updatePic',{id:profile._id,url:data.url},{
        withCredentials: true,
      })
      if(res.status===200){
        setLoading(false)
        setDP(data.url)
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

const [DP,setDP] = useState()

const [selected,setNew] = useState()

  return (
    <div className='profile'>
    {/* <button onClick={()=>{document.getElementById('Fi').click()}}>Select Image</button> */}
    <input type="file" name="" id="Fi" onChange={(e)=>setNew(e.target.files[0])}/>
    <button onClick={upload}>Upload</button>
    {profile?
    <>
      {loading?<h1>Loading...</h1>:<img src={DP} alt="" />}
</>
  :null}
    </div>
  // <div className="profile">
  //     {profile?
  //     <div className="display">
  //       {Loader?<h1>Loading...</h1>:<img className='dp'  src={profile.profile_pic} alt="Your_Profile_Picture" />}
  //       <div>
  //       <input type="file" id='Iupload' style={{display:'none'}} onChange={(event)=>{seturl(event.target.files[0])}}/>
  //       <button onClick={()=>{document.getElementById('Iupload').click()}}>Upload</button>
  //       </div>
  //       {JSON.stringify(profile)}
  //        <div className=" d-flex">
  //        <img src={profile.profile_pic} alt="" />
  //        {/* <div className="nameInfo"> */}
  //          <h1><b>{profile.name}</b></h1>
  //        {/* </div> */}
  //  </div>
  //      </div>
  //     :<h1>Loading...</h1>}
  // </div>
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


//     const RemoveImage = async()=>{
//       try{
//         const res = await axios.post('http://localhost:8000/api/updatePic',{id:userinfo._id,url:"https://res.cloudinary.com/drzjynyvq/image/upload/v1642930267/bt735mco7vvndpyr3icq.png"},{
//           withCredentials: true,
//         })
//         console.log(res)
//       seturl("https://res.cloudinary.com/drzjynyvq/image/upload/v1642930267/bt735mco7vvndpyr3icq.png");
//       document.getElementById('Iupload').value=null
//       }
//       catch(error){alert('image update failed')}
//     }
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
