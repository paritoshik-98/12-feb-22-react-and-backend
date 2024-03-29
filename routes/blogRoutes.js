const express = require('express')
const router = express.Router()
const Blog = require('../models/blog')
const authuser = require('../middleware/authMiddleware')

const {comment,deleteBlog,updateBlog,geteditDraft,addNewBlog,getBlogByTag,getMostLikedBlog,getBlogByID,myBlogs,like,unlike} = require('../controllers/blogControllers')

router.get('/geteditDraft/:id',authuser,geteditDraft)

router.put('/Mark',authuser,async(req,res)=>{
  const {blogId} = req.body
  Blog.findOneAndUpdate({_id:blogId,draft:false},{$push: { markedby : req.userid }},{new:true}).then(doc=>res.status(200).send(doc.markedby)).catch(e=>res.status(500).send('internal server error'))
})
router.put('/unMark',authuser,async(req,res)=>{
  const {blogId} = req.body
  Blog.findOneAndUpdate({_id:blogId,draft:false},{$pull: { markedby : req.userid }},{new:true}).then(doc=>res.status(200).send(doc.markedby)).catch(e=>res.status(500).send('internal server error'))
})



router.get('/marked/:page?',authuser,async(req,res)=>{
  const PAGE_SIZE = 5
  const page = req.params.page||0
  const total = await Blog.countDocuments({markedby:req.userid,draft:false})
  const posts = await Blog.find({markedby:req.userid,draft:false}).populate("author", "_id name profile_pic").sort({date:-1})
  .limit(PAGE_SIZE)
  .skip(PAGE_SIZE*page)
  // console.log(total,posts)
  res.status(200).json({
    totalPages : Math.ceil(total/PAGE_SIZE),
    posts: posts
  })
}
)

router.get('/drafts/:page?',authuser,async(req,res)=>{
  const PAGE_SIZE = 5
  const page = req.params.page||0
  const total = await Blog.countDocuments({author: req.userid,draft:true})
  const posts = await Blog.find({author: req.userid,draft:true}).populate("author", "_id name profile_pic").sort({date:-1})
  .limit(PAGE_SIZE)
  .skip(PAGE_SIZE*page)
  // console.log(total,posts)
  res.status(200).json({
    totalPages : Math.ceil(total/PAGE_SIZE),
    posts: posts
  })
}
)

router.get('/cat/:cat/:page?',authuser,async(req,res)=>{
  const {cat} = req.params
  const PAGE_SIZE = 5
  const page = req.params.page||0
  if(cat=='all'){
  const total = await Blog.countDocuments({draft:false})
  const posts = await Blog.find({draft:false}).populate("author", "_id name profile_pic").sort({likeCount:-1})
  .limit(PAGE_SIZE)
  .skip(PAGE_SIZE*page)
  // console.log(total,posts)
  res.status(200).json({
    totalPages : Math.ceil(total/PAGE_SIZE),
    posts: posts
  })
}
else{
  const total = await Blog.countDocuments({tags:cat,draft:false})
  const posts = await Blog.find({tags:cat,draft:false}).populate("author", "_id name profile_pic").sort({likeCount:-1})
  .limit(PAGE_SIZE)
  .skip(PAGE_SIZE*page)
  // console.log(total,posts)
  res.status(200).json({
    totalPages : Math.ceil(total/PAGE_SIZE),
    posts: posts
  })
}
})

router.get('/search/:query/:page?',authuser,async(req,res)=>{
  const PAGE_SIZE = 5
  const page = req.params.page||0
  const string = req.params.query
  const regex = new RegExp(string, 'i') 
  const total = await Blog.countDocuments({title:{$regex:regex},draft:false})
  const posts = await Blog.find({title:{$regex:regex},draft:false}).populate("author", "_id name profile_pic").sort({likeCount:-1})
  .limit(PAGE_SIZE)
  .skip(PAGE_SIZE*page)
  // console.log(total,posts)
  res.status(200).json({
    totalPages : Math.ceil(total/PAGE_SIZE),
    posts: posts
  })
})

router.get('/searchDrafts/:query/:page?',authuser,async(req,res)=>{
  const PAGE_SIZE = 5
  const page = req.params.page||0
  const string = req.params.query
  const regex = new RegExp(string, 'i') 
  const total = await Blog.countDocuments({title:{$regex:regex},draft:true,author:req.userid})
  const posts = await Blog.find({title:{$regex:regex},draft:true,author:req.userid}).populate("author", "_id name profile_pic").sort({likeCount:-1})
  .limit(PAGE_SIZE)
  .skip(PAGE_SIZE*page)
  // console.log(total,posts)
  res.status(200).json({
    totalPages : Math.ceil(total/PAGE_SIZE),
    posts: posts
  })
})

router.get('/searchMyfav/:query/:page?',authuser,async(req,res)=>{
  const PAGE_SIZE = 5
  const page = req.params.page||0
  const string = req.params.query
  const regex = new RegExp(string, 'i') 
  const total = await Blog.countDocuments({title:{$regex:regex},draft:false,markedby:req.userid})
  const posts = await Blog.find({title:{$regex:regex},draft:false,markedby:req.userid}).populate("author", "_id name profile_pic").sort({likeCount:-1})
  .limit(PAGE_SIZE)
  .skip(PAGE_SIZE*page)
  // console.log(total,posts)
  res.status(200).json({
    totalPages : Math.ceil(total/PAGE_SIZE),
    posts: posts
  })
})

router.get('/searchMyPosts/:query/:page?',authuser,async(req,res)=>{
  const PAGE_SIZE = 5
  const page = req.params.page||0
  const string = req.params.query
  const regex = new RegExp(string, 'i') 
  const total = await Blog.countDocuments({title:{$regex:regex},draft:false,author:req.userid})
  const posts = await Blog.find({title:{$regex:regex},draft:false,author:req.userid}).populate("author", "_id name profile_pic").sort({likeCount:-1})
  .limit(PAGE_SIZE)
  .skip(PAGE_SIZE*page)
  // console.log(total,posts)
  res.status(200).json({
    totalPages : Math.ceil(total/PAGE_SIZE),
    posts: posts
  })
})

// router.get('/all',authuser,getBlo);

router.get('/trending',authuser,getMostLikedBlog);

router.get('/trendingpage:page?',authuser,getMostLikedBlog);

router.get('/:tag',authuser,getBlogByTag);

router.get('/read/:id',getBlogByID);

router.get('/get/myblogs/:page?',authuser,async(req,res)=>{
  const user = req.userid;
  const PAGE_SIZE = 5
  const page = req.params.page||0
  const total = await Blog.countDocuments({ author: user,draft:false })
  const posts = await Blog.find({ author: user,draft:false }).populate("author", "_id name profile_pic").sort({date:-1})
  .limit(PAGE_SIZE)
  .skip(PAGE_SIZE*page)

  res.status(200).json({
    totalPages : Math.ceil(total/PAGE_SIZE),
    posts: posts
  })
});

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
  blog.findOneAndUpdate({_id:id},update,{new:true,safe:true,multi:false})
   
  .then(doc=>res.status(200).send(doc.comments))
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
const blog = require('../models/blog')

var upload = multer({ storage: storage });

/// rouute /api/blog/image_upload
router.post('/image_upload',upload.single('upload'),(req,res)=>{
  console.log('inside image upload')
  try{
    res.header('Access-Control-Allow-Origin', 'https://readblocs.herokuapp.com');
    console.log(req.file.path)
    res.json({url:req.file.path})
  }
  catch{
    res.status(500).send('Something went wrong !')
  }
    })

   

    router.get('/posts:page?',authuser,async(req,res)=>{
      console.log('route')
      const PAGE_SIZE = 5
      const page = req.params.page||0
      const total = await Blog.countDocuments({draft:false})
      const posts = await Blog.find({draft:false})
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE*page)
      // console.log(total,posts)
      res.status(200).json({
        totalPages : Math.ceil(total/PAGE_SIZE),
        posts
      })
    })


module.exports = router

