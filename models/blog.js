const Mongoose =  require('mongoose')
const blogSchema = new Mongoose.Schema({
    title : {
        type: String,
        required : true
    },
    content:{
        type: String,
        required : true
    },
    date:{
        type: Date,
        default: Date.now
    },
    author: {
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
    }
})

module.exports = Mongoose.model('blog',blogSchema);
