const Post =require('../models/post');
const User =require('../models/user');
module.exports.home= async function(req,res){
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
// ***************************new********
    // populate the user of each post
    // Post.find({})
    // .populate('user')
    // .populate({
    //     // how to populate nested
    //     path: 'comments',
    //     populate: {
    //         path: 'user'
    //     }
    // })
    // .exec(function(err, posts){
    //     // populate user to show on friends
    //     User.find({},function(err,users){
    //         return res.render('home', {
    //             title: "ShareExpress | Home",
    //             posts:  posts,
    //             all_users: users
    //         });
    //     });
        
    // })
// ********************new code with async awaits*****************
        try{
        //  // populate the user of each post
        // CHANGE :: populate the likes of each post and comment
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
            // populate: {
            //     path: 'likes'
            // }
        });
        // .populate('likes');
        // .sort('-createdAt')
        // .populate('user')
        // .populate({
        //     path: 'comments',
        //     populate: {
        //         path: 'user'
        //     },
        //     populate: {
        //         path: 'likes'
        //     }
        // }).populate('comments')
        // .populate('likes');

        let users = await User.find({});

        return res.render('home', {
            title: "ShareExpress | Home",
            posts:  posts,
            all_users: users
        });

        }catch(err){
        console.log('Error', err);
        return;
        }


}; 