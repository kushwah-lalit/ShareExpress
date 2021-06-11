const passport =require('passport');
const LocalStrategy =require('passport-local').Strategy;
const User =require('../models/user');
// authentication
passport.use(new LocalStrategy({
    // what is to be looked form the schema for the authentication 
    usernameField:'email'
    },
    // what to when input comes
    function(email,password,done){
        // look for the user with email in User db
        User.findOne({email:email},function(err,user){
            if(err){
                console.log('Error in finding the user :: Passport');
                return done(err);
            }
            if(!user||user.password!=password){
                console.log('Invalid User or password');
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
module.exports=passport;
