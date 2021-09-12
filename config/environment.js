

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
}


const production =  {
    name: 'production'
}



module.exports = development;