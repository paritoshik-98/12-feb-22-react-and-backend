const blog = require('../models/blog')

const getAllBlogs = async(req,res)=> {
    try {
      const doc = await blog.find({});
      res.status(200).send(doc);
    } catch (error) {
      res.status(500).send('Something went wrong !')
    }
    }

const getBlogByID = async(req,res)=>{
    try {
      const id = req.params.id
      const doc =  await blog.findOne({_id:id});
      res.status(200).send(doc);
    } catch (error) {
      res.status(500).send('Something went wrong !')
    }
  }

const addNewBlog = async(req,res)=>{
    try {
      const {content,title}=req.body
      if(!content){res.send('blog cannot be blank')}
      const author = req.userid
      console.log(author)
      const doc = new blog({
          title:title,
          content:content,
          author:author
      })
      await doc.save()
      res.status(200).send('submitted')
    } catch (error) {
      console.log(error)
      res.status(500).send('Something went wrong !')
    }
  }

const myBlogs = async(req,res)=>{
    try {
        const user = req.userid
        const doc = await blog.find({author:user})
        res.status(200).send(doc);
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}



const updateBlog = async(req,res)=>{
    try {
      const{content,title}=req.body
      if(!content){res.send('blog cannot be blank')}
      const id = req.params.id
      const filter = {_id:req.params.id};
      const update = {title:title,content:content,author:req.userid,date:Date.now()};
      await blog.findOneAndUpdate(filter, update, {
          new: true
        }).then(res.status(200).send('blog edited'))  
    } catch (error) {
      res.status(500).send('Something went wrong !')
    }
      }

const deleteBlog = async(req,res)=>{
    
      await blog.deleteOne({ _id: req.params.id }, function(err, result) {
        if (err) {
          console.log(err);
          res.status(500).send('Something went wrong !')
        } else {
          res.status(200).send('deleted');
        }
      });
    }


module.exports = {deleteBlog,updateBlog,addNewBlog,getAllBlogs,getBlogByID,myBlogs}