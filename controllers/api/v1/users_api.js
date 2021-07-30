const User = require('../../../models/user');
const jwt = require('jsonwebtoken');


module.exports.createSession = async function(req, res){

    try{
        // look for the signing in user
        let user = await User.findOne({email: req.body.email});
// not valid or not found
        if (!user || user.password != req.body.password){
            return res.json(422, {
                message: "Invalid username or password"
            });
        }
        // found then sending it

        return res.json(200, {
            message: 'Sign in successful, here is your token, please keep it safe!',
            data:  {
                // sending the data object and the token using hte sign function of the  jwt nad the toJson , key to encrypt
                token: jwt.sign(user.toJSON(), 'codeial', {expiresIn:  '1000000'})
            }
        })

    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}