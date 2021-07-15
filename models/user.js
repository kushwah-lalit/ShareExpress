const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    // adding new filed
    avatar:{
        type: String
    }
},
{
    timestamps:true
});
// setup the destination and the filename
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });
//   static functions
userSchema.statics.uploadedAvatar = multer({storage : storage}).single('avatar');
// single to upload the single file as many can also be uploaded
userSchema.statics.avatarPath = AVATAR_PATH;

const User =mongoose.model('User',userSchema);
module.exports = User;