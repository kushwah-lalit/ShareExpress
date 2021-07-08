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
         // populate the user of each post
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

        let users = await User.find({});

        return res.render('home', {
            title: "ShareExpress| Home",
            posts:  posts,
            all_users: users
        });

        }catch(err){
        console.log('Error', err);
        return;
        }


}; 