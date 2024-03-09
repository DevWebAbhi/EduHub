
const mongoose=require("mongoose");

const schema=mongoose.Schema({
    name:{type:String,required:true},
    image:{type:String,required:true},
    description:{type:String,required:true},
    checklist:{type:String,required:true},
});

const courseModel=mongoose.model("courses",schema);

module.exports=courseModel;