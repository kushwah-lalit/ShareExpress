const Post =require('../models/post');
const Comment =require('../models/comment');
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
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        return res.redirect('back');

    }catch(err){
        console.log('Error', err);
        return;
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
            post.remove();

            await Comment.deleteMany({post: req.params.id});
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }

    }catch(err){
        console.log('Error', err);
        return;
    }

}