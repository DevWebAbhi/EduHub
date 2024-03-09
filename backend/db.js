const mongoose=require('mongoose');

const MONGOURL=process.env.MONGOURL;

const connect=mongoose.connect("mongodb+srv://eduhub_app:eduhub_app@cluster0.xvwtng2.mongodb.net/");



module.exports={
    connect
}