module.exports.home=function(req,res){
    // return res.end('<h1>Hi lalit here :-)</h1>');
    console.log(req.cookie);
    return res.render('home',{
        title:"Share Express"
    });
}; 