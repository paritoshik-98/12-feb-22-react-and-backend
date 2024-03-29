const blog = require("../models/blog");
const user = require("../models/user");

// most liked blog
const getMostLikedBlog = async (req, res) => {
  console.log(req.params.page)
  try {
    const doc = await blog.find({draft:false}).populate("author", "_id name profile_pic").sort({likeCount:-1})
    let i=0
    let array = []
    while(i<5){
      array[i]=doc[i]
      i+=1
    }
    res.status(200).send([doc[0],doc[1],doc[2],doc[3],doc[4]]);
  } catch (error) {
    console.log(error)
    res.status(500).send("Something went wrong !");
  }
};

// blogs by tag

const getBlogByTag = async (req, res) => {
  try {
    const doc = await blog.find({tags:req.params.tag,draft:false}).populate("author", "_id name profile_pic").sort({date:-1})
    res.status(200).send(doc);
  } catch (error) {
    console.log(error)
    res.status(500).send("Something went wrong !");
  }
};




const getBlogByID = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await blog
      .findOne({ _id: id ,draft:false})
      .populate("author", "_id name profile_pic");
    res.status(200).send(doc);
  } catch (error) {
    res.status(500).send("Something went wrong !");
  }
};

const addNewBlog = async (req, res) => {
  // console.log(req.body)
  // res.send(req.body)
  try {
    const { coverImg,blogTitle,content,tagArr,draft,desc } = req.body;
    if(!coverImg || !blogTitle || !content || !tagArr || !desc ){
      res.status(500).send("Please fill all fields")
    }
    else
    {
    // console.log(tags)
    // if (!content) {
    //   res.status(500).send("content cannot be blank");
    // }
    tags = JSON.parse(tagArr)
    // if(tags.length===0){
      
    //   res.status(500).send("select atleast 1 tag");
    // }
    // if(!coverImg){
    //   res.status(500).send('select cover image')
    // }
    const author = req.userid;
    // console.log(author);
    const doc = new blog({
      title: blogTitle,
      content: content,
      author: author,
      coverImg: coverImg,
      draft:draft,
      desc:desc
    });
    await doc.save();
    const update = { $push: { tags: tags } };
         blog.findOneAndUpdate({_id:doc._id}, update, {
            new: true,
          })
          .then((doc) => res.status(200).json({id:doc._id}))
          .catch((e) => {console.log(e);res.status(500).send("Internal Server Error")});
        }
    // res.status(200).send("submitted")
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const myBlogs = async (req, res) => {
  try {
    const user = req.userid;
    const doc = await blog.find({ author: user ,draft:false});
    res.status(200).send(doc);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// const updateBlog = async (req, res) => {
//   try {
//     const { content, title } = req.body;
//     if (!content) {
//       res.send("blog cannot be blank");
//     }
//     const id = req.params.id;
//     const filter = { _id: req.params.id };
//     const update = {
//       title: title,
//       content: content,
//       author: req.userid,
//       date: Date.now(),
//     };
//     await blog
//       .findOneAndUpdate(filter, update, {
//         new: true,
//       })
//       .then(res.status(200).send("blog edited"));
//   } catch (error) {
//     res.status(500).send("Something went wrong !");
//   }
// };

const like = async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: req.params.id };
    blog.findOne({ _id: req.params.id }).then((doc) => {
      if (doc.likes.includes(req.userid)) {
        res.status(200).send(doc.likes);
      } else {
        const update = { $push: { likes: req.userid } };
         blog.findOneAndUpdate(filter, update, {
            new: true,
          })
          .then((doc) => res.status(200).send(doc.likes))
          .catch((e) => res.status(500).send("Something went wrong !"));
      }
    });
  } catch (error) {
    res.status(500).send("Something went wrong !");
  }
};

const unlike = async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: req.params.id };
    blog.findOne({ _id: req.params.id }).then((doc) => {
      if (doc.likes.includes(req.userid)) {
        const update = { $pull: { likes: req.userid } };
         blog.findOneAndUpdate(filter, update, {
            new: true,
          })
          .then((doc) => res.status(200).send(doc.likes))
          .catch((e) => res.status(500).send("Something went wrong !"));
      } else {
        res.status(200).send(doc.likes)
      }
    });
  } catch (error) {
    res.status(500).send("Something went wrong !");
  }
};

const deleteBlog = async (req, res) => {
  await blog.deleteOne({ _id: req.params.id }, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send("Something went wrong !");
    } else {
      res.status(200).send("deleted");
    }
  });
};

const comment = async(req,res) => {
  // console.log(req.body)
  try {
    const id = req.params.id;
    const filter = { _id: req.params.id };
    const comment = { text:req.body.text,userName:req.name,userId:req.userid }
        const update = { $push: {comments:comment}  };
         blog.findOneAndUpdate(filter, update, {
            new: true,
          })
          .then((doc) =>{
          console.log(doc.comments);
          res.status(200).send(doc.comments)
          }
          )
          .catch((e) => res.status(500).send("Something went wrong !"));
      }
   catch (error) {
    res.status(500).send("Something went wrong !");
  }
}

const updateBlog = async (req, res) => {
  try {
    const { coverImg,blogTitle,content,tagArr,draft,id,desc} = req.body;
    if(!coverImg || !blogTitle || !content || !tagArr || !desc ){
      res.status(500).send("Please fill all fields")
    }
    else
    {
    // const id = req.params.id;
    // const filter = { _id: req.params.id };

    console.log(tagArr)

    const b = await blog.findOne({ _id: id })
    console.log(b)
    const filter = { _id: id };
    const update = {
      title: blogTitle,
      content: content,
      author: req.userid,
      draft: draft,
      coverImg: coverImg,
      date: Date.now(),
      $pullAll : {tags:b.tags},
      desc:desc
      // $push:{}
    };
    await blog.findOneAndUpdate(filter, update, {
        new: true,
      })
    
      const Tupdate = { $push: { tags: JSON.parse(tagArr) } };
      await blog.findOneAndUpdate({_id:id}, Tupdate, {
         new: true,
       })

      
      res.status(200).send("blog edited")
    }
  } catch (error) {
    console.log(error)
    res.status(500).send("Something went wrong !");
  }
}

const geteditDraft = async(req,res)=>{
  try {
    const {id} = req.params
    const author = req.userid
    const doc = await blog
      .findOne({ _id: id ,draft:true,author:author})
      .populate("author", "_id name profile_pic");
      if (doc ==null){
        res.status(404).send('404 not found');
      }
      else{
        res.status(200).send(doc);
      }
  } catch (error) {
    res.status(500).send("Something went wrong !");
  }
};


module.exports = {
  deleteBlog,
  updateBlog,
  addNewBlog,
  getBlogByTag,
  getMostLikedBlog,
  getBlogByID,
  myBlogs,
  like,
  unlike,
  comment,
  geteditDraft
};
