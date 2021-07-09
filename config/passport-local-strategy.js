const passport =require('passport');
const LocalStrategy =require('passport-local').Strategy;
const User =require('../models/user');
// authentication
passport.use(new LocalStrategy({
    // what is to be looked form the schema for the authentication 
    usernameField:'email',
    // for enabaling req in the function
    passReqToCallback: true
    },
    // what to when input comes
    function(req,email,password,done){
        // look for the user with email in User db
        User.findOne({email:email},function(err,user){
            if(err){
                // console.log('Error in finding the user :: Passport');
                req.flash('error', err);
                return done(err);
            }
            if(!user||user.password!=password){
                // console.log('Invalid User or password');
                req.flash('error', 'Invalid Username/Password');
                return done(null,false);
            }
            return done(null,user);
        });
    }
));
// serializing the user to decide which kep to be stored in the cokkie and encripted
passport.serializeUser(function(user,done){
    done(null,user.id);
});
// deserializing the user from the key in the cookie
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding the user :: Passport-deserialize');
            return done(err);
        }
        return done(null,user);

    });
});

// check if the user is authenticated
// for putting the constraint on pages to load only when user is signed in
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
}
// to access info for the request if the  user is signin via locals
passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}

module.exports=passport;
