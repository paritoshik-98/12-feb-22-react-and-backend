const { addUser, getUser, loginUser, genToken, loginUserGoogle, updatePic, updatePassword, logout, refreshToken, emailPasswordLink } = require("../controllers/userControllers");
const authuser = require('../middleware/authMiddleware')
const express = require('express');
const user = require("../models/user");
const router = express.Router();
const bcrypt = require('bcrypt');

const saltRounds = 10;

router.put('/Mark',authuser,async(req,res)=>{
  const {blogId} = req.body
  user.findOneAndUpdate({_id:req.userid},{$push: { marked: blogId }},{new:true}).then(doc=>res.status(200).send(doc.marked)).catch(e=>res.status(500).send('internal server error'))
})

router.put('/unMark',authuser,async(req,res)=>{
  const {blogId} = req.body
  user.findOneAndUpdate({_id:req.userid},{$pull: { marked: blogId }},{new:true}).then(doc=>res.status(200).send(doc.marked)).catch(e=>res.status(500).send('internal server error'))
})

// get user details
// router.get('/profile',authuser,getUser)
router.get('/profile',authuser,async(req,res)=>{
  const u = await user.find({_id:req.userid})
  res.status(200).send(u)
})

// signup route = /api/user/signup
router.post('/signup',addUser)

// login route =  /api/user/login
router.post('/login',loginUser,genToken)

// logout route =  /api/user/logout
router.get('/logout',logout)

// google login route = /api/user/Glogin
router.post('/Googlelogin',loginUserGoogle,genToken)

// refresh route =  /api/user/refresh
router.get('/refresh',refreshToken)

// edit profile_pic = /api/user/updatePic
router.post('/updatePic',authuser,updatePic)

// follow route
router.put('/follow',authuser,(req,res)=>{
    user.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.userid}
    },{
        new:true
    },(err,result)=>{
        if(err){
             res.status(500).send(err)
        }
      user.findByIdAndUpdate(req.user.id,{
          $push:{following:req.body.followId}
          
      },{new:true}).select("-password").then(result=>{
          res.status(200).send(result)
      }).catch(err=>{
           res.status(500).send(err)
      })

    }
    )
})

// unfollow
router.put('/unfollow',authuser,(req,res)=>{
    user.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{followers:req.userid}
    },{
        new:true
    },(err,result)=>{
        if(err){
            res.status(500).send(err)
        }
      user.findByIdAndUpdate(req.userid,{
          $pull:{following:req.body.unfollowId}
          
      },{new:true}).select("-password").then(result=>{
        res.status(200).send(result)
      }).catch(err=>{
        res.status(500).send(err)
      })

    }
    )
})

// update password
router.post('/updatePassword',updatePassword)

// email password reset link 
router.post('/send_reset_link',emailPasswordLink)



router.post('/search-users',(req,res)=>{
    user.find({email:req.body.email})
    .select("_id email")
    .then(user=>{
        res.send(user)
    }).catch(err=>{
        console.log(err)
    })

})

///////////////////////// cloudinary multer
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "USER",
  },
});
///////////////////////////////////////////multer image handling////////////////
var multer = require('multer');
const { auth } = require("google-auth-library");

var upload = multer({ storage: storage });

/// rouute /api/blog/image_upload
router.post('/image_upload',upload.single('upload'),(req,res)=>{
  console.log('inside image upload')
  try{
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    console.log(req.file.path)
    res.json({url:req.file.path})
  }
  catch{
    res.status(500).send('Something went wrong !')
  }
    })


module.exports = router
