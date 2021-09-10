const Post =require('../models/post');
const Comment =require('../models/comment');
const Like = require('../models/like');
module.exports.create = async function(req, res){
    // Post.create({
    //     content: req.body.content,
    //     user: req.user._id
    // }, function(err, post){
    //     if(err){console.log('error in creating a post'); return;}

    //     return res.redirect('back');
    // });
// *****************new
    try{
        // await Post.create({
        //     content: req.body.content,
        //     user: req.user._id
        // });
        // req.flash('success', 'Post published!');

        // return res.redirect('back');
    // modifed form of this for the ajax request
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        
        if (req.xhr){
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            post = await post.populate('user', 'name').execPopulate();
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }
        req.flash('success', 'Post published!');

        return res.redirect('back');

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
}
module.exports.destroy = async function(req,res){
    // Post.findById(req.params.id,function(err,post){
    //     if(post.user==req.user.id){
    //         post.remove();
    //         Comment.deleteMany({post:req.params.id},function(err){
    //             res.redirect('back');
    //         });
    //     }else{
    //         res.redirect('back');
    //     }
    // });
// ******************new
    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
            
            // CHANGE :: delete the associated likes for the post and all its comments' likes too
            await Like.deleteMany({likeable: post, onModel: 'Post'});
            await Like.deleteMany({_id: {$in: post.comments}});
            
            post.remove();

            await Comment.deleteMany({post: req.params.id});
            
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            req.flash('success', 'Post and associated comments deleted!');
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }

    }catch(err){
        // console.log('Error', err);
        req.flash('error', err);
        return res.redirect('back');
    }

}