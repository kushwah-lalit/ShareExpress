const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res){
//     Post.findById(req.body.post, function(err, post){

//         if (post){
//             Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             }, function(err, comment){
//                 // handle error
//                 if(err){
//                     console.log('error while creating the comment')
//                 return;
// }
//                 post.comments.push(comment);
//                 post.save();

//                 res.redirect('/');
//             });
//         }

//     });
// ****************new
    try{
        let post = await Post.findById(req.body.post);

        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();
            req.flash('success', 'Comment published!');

            res.redirect('/');
        }
    }catch(err){
        // console.log('Error', err);
        req.flash('error', err);
        return;
    }
}
module.exports.destroy = async function(req,res){
    // Comment.findById(req.params.id,function(err,comment){
    //     if(comment.user==req.user.id){
    //         let postId = comment.post;
    //         comment.remove();
    //         Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err, post){
    //             return res.redirect('back');
    //         });
    //     }else{
    //         res.redirect('back');
    //     }
    // });
    // **************new
    try{
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});
            req.flash('success', 'Comment deleted!');


            return res.redirect('back');
        }else{
            req.flash('error', 'Unauthorized');

            return res.redirect('back');
        }
    }catch(err){
        // console.log('Error', err);
        req.flash('error', err);
        return;
    }

}
