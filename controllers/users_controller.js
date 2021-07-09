const User =require('../models/user');
module.exports.profile=function(req,res){
    // return res.end('<h1>User lalit here :-)</h1>');
    // return res.render('user_profile',{
    //     title:"Profile Page"
    // });
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });
};
// update the user
module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            req.flash('success', 'Updated!');
            return res.redirect('back');
        });
    }else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}
// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_signUp', {
        title: "ShareExpress | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('user_signIn', {
        title: "ShareExpress | Sign In"
    })
}

// // get the sign up data
module.exports.create = function(req, res){
    // TODO later
    if(req.body.password!=req.body.confirmpassword){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            // console.log('Error while finding the user');
            req.flash('error', err); 
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    // console.log('Error while creating the user');
                    req.flash('error', err); 
                    return;
                }
                return res.redirect('/users/sign-in');
            });

        }else{
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }
    });
}


// // sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}
// signout
module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out!');
    return res.redirect('/');
}