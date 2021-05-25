const express = require('express');
const app = express();
const port = 8000;
// use routes for the req
app.use('/',require('./routes/index'));
app.listen(port,function(error){
    if(error){
        console.log(`Error occured while running the server: ${error}`);
    }
    console.log(`Server running on port: ${port}`);
});