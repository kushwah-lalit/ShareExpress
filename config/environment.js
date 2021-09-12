const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});

const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'ShareExpress_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'projectmailer.tester@gmail.com',
            pass: 'qwerty!@#$%'
        }
    },
    google_client_id: '1069161680142-m3osphflcik2bcvc8uiki246s43gfeb9.apps.googleusercontent.com',
    google_client_secret: 'zS0XsrCmch_mBidsp6bmPx3f',
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}


const production =  {
    name: 'production',
    asset_path: process.env.ShareExpress_ASSET_PATH,
    session_cookie_key: process.env.ShareExpress_SESSION_COOKIE_KEY,
    db: process.env.ShareExpress_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.ShareExpress_GMAIL_USERNAME,
            pass: process.env.ShareExpress_GMAIL_PASSWORD
        }
    },
    google_client_id: process.env.ShareExpress_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.ShareExpress_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.ShareExpress_GOOGLE_CALL_BACK_URL,
    jwt_secret: process.env.ShareExpress_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}



module.exports = eval(process.env.ShareExpress_ENVIRONMENT) == undefined ? development : eval(process.env.ShareExpress_ENVIRONMENT);