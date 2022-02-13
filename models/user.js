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
        default:"https://res.cloudinary.com/drzjynyvq/image/upload/v1642930267/bt735mco7vvndpyr3icq.png"
    }
})

  
module.exports = User = mongoose.model('user',userSchema)