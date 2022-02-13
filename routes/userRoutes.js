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

// update password
router.post('/updatePassword',authuser,updatePassword)

// email password reset link 
router.get('/reset',authuser,emailPasswordLink)

module.exports = router
