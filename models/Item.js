const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema 
const ItemSchema = new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    picture:{
        type:String, //s3 url
        required:false
    }
});

module.exports = Item = mongoose.model('item', ItemSchema); 