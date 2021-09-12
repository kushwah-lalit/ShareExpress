const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const env = require('./config/environment');
const logger = require('morgan');
// app.use(express.static('./assets'));@@@@
app.use(express.static(env.asset_path));
//should be before the routes
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// use express session and passport config
const session = require('express-session');
const passport =require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
// updated so cant use connect mongo
const MongoStore = require('connect-mongodb-session')(session);
// include sass middleware lib
const sassMiddleware = require('node-sass-middleware');
// including flash and the middleware to setup the flash message to local
const flash = require('connect-flash');
const customMware = require('./config/middleware');
// use before every as to have all css ready before run of all the files

// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');

const path = require('path');

// app.use(sassMiddleware({
//     // src: './assets/scss',
//     // dest: './assets/css',@@@@
//     src: path.join(__dirname, env.asset_path, 'scss'),
//     dest: path.join(__dirname, env.asset_path, 'css'),
//     debug: true,
//     outputStyle: 'extended',
//     prefix: '/css'
// }));
if (env.name == 'development'){
    app.use(sassMiddleware({
        src: path.join(__dirname, env.asset_path, 'scss'),
        dest: path.join(__dirname, env.asset_path, 'css'),
        debug: true,
        outputStyle: 'extended',
        prefix: '/css'
    }));
}
// to make upload path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use(logger(env.morgan.mode, env.morgan.options));

app.use(expressLayouts); 
app.use(express.urlencoded());
app.use(cookieParser());
// Putting the styles and scripts from pages to the correct place in the layout file

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// setup the view engine 
app.set('view engine', 'ejs');
app.set('views', './views');
// using session and passport middlewware before the routes creates in
//mongo store used to store the cookie in the db

app.use(session({
    name: 'ShareExpress',
    // todo change secret before the deployment
    // secret:'blahsomething',@@@
    secret: env.session_cookie_key,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
// before every request to check for signedin user details
app.use(passport.setAuthenticatedUser);
// using flash and the our middleware function after the session as we want it after the session as flash message gets installed in the sesssion cookie
app.use(flash());
app.use(customMware.setFlash);
// use routes for the req
app.use('/',require('./routes/index'));
app.listen(port,function(error){
    if(error){
        console.log(`Error occured while running the server: ${error}`);
    }
    console.log(`Server running on port: ${port}`);
}); 

