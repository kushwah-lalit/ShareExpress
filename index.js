const express = require('express');
const app = express();
const port = 8000;
app.use(express.static('./assets'));
//should be before the routes
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
// use routes for the req
app.use('/',require('./routes/index'));
// setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.listen(port,function(error){
    if(error){
        console.log(`Error occured while running the server: ${error}`);
    }
    console.log(`Server running on port: ${port}`);
});