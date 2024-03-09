const mongoose=require('mongoose');

const MONGOURL=process.env.MONGOURL;

const connect=mongoose.connect(MONGOURL);



module.exports={
    connect
}