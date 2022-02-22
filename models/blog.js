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
  author: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: [{ type: Mongoose.Schema.Types.ObjectId, ref: "user" }],
  unlikes: [{ type: Mongoose.Schema.Types.ObjectId, ref: "user" }],
  comments: [
    {
      text: { type: String },
      postedBy: { type: Mongoose.Schema.Types.ObjectId, ref: "user" },
    },
  ],
});

module.exports = Mongoose.model("blog", blogSchema);
