import React, { useEffect, useState } from 'react'
import './profile.css'
import axios from 'axios'
import '../Axios'

function Profile() {

  const [loading,setLoading] = useState()
  const [profile,setProfile] = useState()

  useEffect(()=>{
    setLoading(true)
    axios.get('/api/user/profile').then(res=>{
      setLoading(false)
      setProfile(res.data)})
  },[])

  return (
    <div className="profile">
      {loading?<h1>Loading...</h1>:null}
      {profile?
      <div className="display">
        {JSON.stringify(profile)}
      </div>
      :null}
    </div>
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

//     const[image,setImage]=useState()
//     const [imageurl,seturl]=useState()
//     const uploadImage = async() => {
//       // console.log(files[0])
//       const formData = new FormData()
//       formData.append('file',image)
//       formData.append('upload_preset','tszhqchc')
//       // dr... vq -- cloud name
//       fetch("  https://api.cloudinary.com/v1_1/drzjynyvq/image/upload",{
//     method:"post",
//     body: formData
//     })
//     .then(resp => resp.json())
//     .then(async (data) => {
//     // seturl(data.url);
//     try{
//       const res = await axios.post('http://localhost:8000/api/updatePic',{id:userinfo._id,url:data.url},{
//         withCredentials: true,
//       })
//       console.log(res)
//     seturl(data.url);
//     document.getElementById('Iupload').value=null
//     }
//     catch(error){alert('image update failed')}
//     })
//     }

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
