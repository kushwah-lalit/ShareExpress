const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    // ref to user who made
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    // ref to post to which it belongs
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
},
{
    timestamps:true
});
const Comment =mongoose.model('Comment',commentSchema);
module.exports = Comment;