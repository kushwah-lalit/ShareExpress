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
// module.exports.create = function(req, res){
//     // TODO later
// }


// // sign in and create a session for the user
// module.exports.createSession = function(req, res){
//     // TODO later
// }