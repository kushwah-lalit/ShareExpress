const passport = require('passport');
// include the jwt strategy
const JWTStrategy = require('passport-jwt').Strategy;
// include the jwt taoken from the strategy
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

const env = require('./environment');

let opts = {
    // in order to extratct the jwt token from the header
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    // encryption key
    secretOrKey: env.jwt_secret
}


passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){
// jwt strategy and getting the jwtpayload
    User.findById(jwtPayLoad._id, function(err, user){
        // seacrhing in the user
        if (err){console.log('Error in finding user from JWT'); return;}
// if found
        if (user){
            return done(null, user);
            // not found
        }else{
            return done(null, false);
        }
    })

}));
// export
module.exports = passport;
