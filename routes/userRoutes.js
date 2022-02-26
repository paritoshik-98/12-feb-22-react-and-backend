const { addUser, loginUser, genToken, loginUserGoogle, updatePic, updatePassword, logout, refreshToken, emailPasswordLink } = require("../controllers/userControllers");
const authuser = require('../middleware/authMiddleware')
const express = require('express');
const user = require("../models/user");
const router = express.Router();
const bcrypt = require('bcrypt');

const saltRounds = 10;

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
router.post('/updatePassword',authuser,updatePassword)

// email password reset link 
router.get('/reset_link',authuser,emailPasswordLink)



router.post('/search-users',(req,res)=>{
    user.find({email:req.body.email})
    .select("_id email")
    .then(user=>{
        res.send(user)
    }).catch(err=>{
        console.log(err)
    })

})

module.exports = router
