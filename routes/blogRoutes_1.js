const express = require('express');
const router = express.Router();
const blog = require('../models/blog');
const authuser = require('../middleware/authMiddleware');

const {deleteBlog,updateBlog,addNewBlog,getAllBlogs,getBlogByID, myBlog} = require('../controllers/blogControllers')
// myBlogs,
// get all blogs = /api/blog/all
router.get('/all',authuser,getAllBlogs);

                                                 // CRUD //
// get 1 blogs = /api/blog/:id
router.get('/:id',authuser,getBlogByID)

// --- add new article 'CREATE' 
router.post('/add',authuser,addNewBlog)                                                 

// get user blogs

// update blog by id
router.put('/:id/edit',authuser,updateBlog)

// delete blog by id
router.delete('/:id/delete',authuser,deleteBlog)

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
    folder: "BLOG",
  },
});
///////////////////////////////////////////multer image handling////////////////
var multer = require('multer');

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