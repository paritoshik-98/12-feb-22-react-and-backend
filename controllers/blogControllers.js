const blog = require("../models/blog");

const getAllBlogs = async (req, res) => {
  try {
    const doc = await blog.find({}).populate("author", "_id name profile_pic");
    res.status(200).send(doc);
  } catch (error) {
    res.status(500).send("Something went wrong !");
  }
};

const getBlogByID = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await blog
      .findOne({ _id: id })
      .populate("author", "_id name profile_pic");
    res.status(200).send(doc);
  } catch (error) {
    res.status(500).send("Something went wrong !");
  }
};

const addNewBlog = async (req, res) => {
  try {
    const { content, title, tags } = req.body;
    console.log(tags)
    if (!content) {
      res.send("blog cannot be blank");
    }
    const author = req.userid;
    console.log(author);
    const doc = new blog({
      title: title,
      content: content,
      author: author,
    });
    await doc.save();
    const update = { $push: { tags: ['pari','i'] } };
         blog.findOneAndUpdate({_id:doc._id}, update, {
            new: true,
          })
          .then((doc) => res.status(200).send(doc))
          .catch((e) => res.status(500).send("Something went wrong !"));
    
    // res.status(200).send("submitted")
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong !");
  }
};

const myBlogs = async (req, res) => {
  try {
    const user = req.userid;
    const doc = await blog.find({ author: user });
    res.status(200).send(doc);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const updateBlog = async (req, res) => {
  try {
    const { content, title } = req.body;
    if (!content) {
      res.send("blog cannot be blank");
    }
    const id = req.params.id;
    const filter = { _id: req.params.id };
    const update = {
      title: title,
      content: content,
      author: req.userid,
      date: Date.now(),
    };
    await blog
      .findOneAndUpdate(filter, update, {
        new: true,
      })
      .then(res.status(200).send("blog edited"));
  } catch (error) {
    res.status(500).send("Something went wrong !");
  }
};

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

const comment = (req,res) => {
  try {
    const id = req.params.id;
    const filter = { _id: req.params.id };
    const comment = { text:req.body.text,postedBy:req.userid }
        const update = { $push: {comments:comment}  };
         blog.findOneAndUpdate(filter, update, {
            new: true,
          })
          .then((doc) => res.status(200).send(doc.comments))
          .catch((e) => res.status(500).send("Something went wrong !"));
      }
   catch (error) {
    res.status(500).send("Something went wrong !");
  }
}

module.exports = {
  deleteBlog,
  updateBlog,
  addNewBlog,
  getAllBlogs,
  getBlogByID,
  myBlogs,
  like,
  unlike,
  comment
};
