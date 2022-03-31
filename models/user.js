const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    profile_pic:{
        type:String,
        default:"https://res.cloudinary.com/drzjynyvq/image/upload/v1648718621/wdjpzij0wm5doew8oygm.png"
    },
    marked:[{type: mongoose.Schema.Types.ObjectId, ref: "blog"}]
    // followers:[{type: mongoose.Schema.Types.ObjectId, ref: "user"}],
    // following:[{type: mongoose.Schema.Types.ObjectId, ref: "user"}]
})

  
module.exports = User = mongoose.model('user',userSchema)