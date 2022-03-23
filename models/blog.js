const Mongoose = require("mongoose");
const blogSchema = new Mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  draft:{
    type:Boolean,
    default:false
  },
  author: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: [{ type: Mongoose.Schema.Types.ObjectId, ref: "user" }],
  // unlikes: [{ type: Mongoose.Schema.Types.ObjectId, ref: "user" }],
  comments: [
    {
      text: { type: String },
      postedBy: { type: Mongoose.Schema.Types.ObjectId, ref: "user" },
    },
  ],
  tags: [{type:String}],
  coverImg : {
    type: String,
    required:true
  },
  likeCount:{
    type: Number
  }
});

/// like count

blogSchema.post('findOneAndUpdate', async (doc) => {
  console.log(doc.likes.length)
  doc.likeCount = doc.likes.length
  await doc.save()
  console.log('saved')
});

module.exports = Mongoose.model("blog", blogSchema);
