const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
app.use(express.static('./assets'));
//should be before the routes
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// use express session and passport config
const session = require('express-session');
const passport =require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(expressLayouts); 
app.use(express.urlencoded());
app.use(cookieParser());
// Putting the styles and scripts from pages to the correct place in the layout file
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// setup the view engine 
app.set('view engine', 'ejs');
app.set('views', './views');
// using session ans passport middlewware before the routes creates in
app.use(session({
    name: 'ShareExpress',
    // todo change secret before the deployment
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }
}));
app.use(passport.initialize());
app.use(passport.session());
// before every request to check for signedin user details
app.use(passport.setAuthenticatedUser);

// use routes for the req
app.use('/',require('./routes/index'));
app.listen(port,function(error){
    if(error){
        console.log(`Error occured while running the server: ${error}`);
    }
    console.log(`Server running on port: ${port}`);
}); 