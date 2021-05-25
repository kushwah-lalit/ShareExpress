module.exports.home=function(req,res){
    // return res.end('<h1>Hi lalit here :-)</h1>');
    return res.render('home',{
        title:"Home Page"
    });
}; 