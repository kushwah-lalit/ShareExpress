const Post =require('../models/post');
module.exports.home=function(req,res){
    // return res.end('<h1>Hi lalit here :-)</h1>');
    // console.log(req.cookie);
    // return res.render('home',{
    //     title:"Share Express"
    // });
    // ********old******
    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "ShareExpress | Home",
    //         posts:  posts
    //     });
    // });

    // populate the user of each post
    // Post.find({}).populate('user').exec(function(err, posts){
    //     return res.render('home', {
    //         title: "ShareExpress | Home",
    //         posts:  posts
    //     });
    // })
    // populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        // how to populate nested
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        return res.render('home', {
            title: "ShareExpress | Home",
            posts:  posts
        });
    })
}; 