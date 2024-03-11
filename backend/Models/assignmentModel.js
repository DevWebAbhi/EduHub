
const mongoose=require("mongoose");

const schema=mongoose.Schema({
    title:{type:String,required:true},
    image:{type:String,required:true},
    description:{type:String,required:true},
    courseID:{type:String,required:true}
});

const assignmentModel=mongoose.model("assignment",schema);

module.exports=assignmentModel;