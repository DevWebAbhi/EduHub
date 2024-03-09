
const mongoose=require("mongoose");

const schema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    userType:{type:String,default:"student",enums:["student","admin"]},
    password:{type:String,required:true},
    course:{type:Array,required:true}
});

const userModel=mongoose.model("users",schema);

module.exports=userModel;