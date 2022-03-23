const express = require('express')
const router = express.Router()
const blog = require('../models/blog')
const authuser = require('../middleware/authMiddleware')

const {comment,deleteBlog,updateBlog,addNewBlog,getBlogByTag,getMostLikedBlog,getBlogByID,myBlogs,like,unlike} = require('../controllers/blogControllers')

// router.get('/all',authuser,getBlo);

router.get('/trending',authuser,getMostLikedBlog);

router.get('/:tag',authuser,getBlogByTag);

router.get('/:id',authuser,authuser,getBlogByID);

router.get('/get/myBlogs',authuser,myBlogs);

router.post('/add',authuser,addNewBlog);
// router.post('/add',addNewBlog);

router.put('/:id/edit',authuser,updateBlog);

router.put('/:id/like',authuser,like);

router.put('/:id/unlike',authuser,unlike);

router.post('/:id/comment',authuser,comment); /////////// post

router.put('/:id/comment/delete',(req,res)=>{
  const {cid} = req.body;
  const {id} = req.params;
  const update = { $pull: { comments : {_id:cid} } };
  blog.findOneAndUpdate({_id:id},update,{new:true,safe:true,multi:false}).then(doc=>res.status(200).send(doc.comments))
})

// router.delete('/:bid/comment/delete',(req,res)=>{
//   console.log(req.body)
//   const id = req.body.cid
//   blog.findOneAndUpdate({_id:req.params.bid},{$pull:{comments:{_id:id}}},{
//     new: true,
//   }).then(doc=>{res.status(200).send(doc.comments);})
// })

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

