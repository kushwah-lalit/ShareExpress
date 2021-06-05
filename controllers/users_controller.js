const User =require('../models/user');
module.exports.profile=function(req,res){
    // return res.end('<h1>User lalit here :-)</h1>');
    return res.render('user_profile',{
        title:"Profile Page"
    });
};
// render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_signUp', {
        title: "ShareExpress | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    return res.render('user_signIn', {
        title: "ShareExpress | Sign In"
    })
}

// // get the sign up data
module.exports.create = function(req, res){
    // TODO later
    if(req.body.password!=req.body.confirmpassword){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('Error while finding the user');
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('Error while creating the user');
                    return;
                }
                return res.redirect('/users/sign-in');
            });

        }else{
            return res.redirect('back');
        }
    });
}


// // sign in and create a session for the user
module.exports.createSession = function(req, res){
    // find user
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('Error while Signing In the user');
            return;
        }
        if(user){
            // user found
            if(user.password!=req.body.password){
                // password does not match
                return res.redirect('back');
            }
            // matches
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
        }else{
            // user not found
            return res.redirect('back');
        }
    });
}