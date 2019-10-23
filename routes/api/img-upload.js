const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

//get keys for aws s3 database and update it
//const key = require('../../config/s3');
aws.config.update({
    secretAccessKey: process.env.secretAccessKey,
    accessKeyId: process.env.accessKeyId,
    region: 'us-east-1'
});

//file validation, but since react frontend only accept image, this can be ignored.
/*
const fileFilter=(req, file, cb)=>{
  if(file.mimetype === 'image/jpeg'||file.mimetype=== 'image/png'||file.mimetype=== 'image/jpg'){
    cb(null, true)
  }else{
    cb(new Error('invalid type, only jpeg and png'), false);
  }
}
*/

//s3 database upload setup
const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'crud-profile-images',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    //set key to be date encoded
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  }),
  //file max size 5mb
  limits:{fileSize: 5000000}
})


const singleUpload = upload.single('image');//name of the file in HTML

//endpoint
router.post('/', function(req,res){
    singleUpload(req, res, function(err){
      //return uploaded s3 file's url 
        return res.json({'imageURL': req.file.location})
    })
})

module.exports = router;