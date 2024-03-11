const express=require("express");

const emailCheck = require('email-check');

const userModel=require('../Models/userModel');

const bcrypt = require('bcrypt');

const saltRounds = 10;

const userRouter=express.Router();

const jwt = require('jsonwebtoken');

userRouter.post("/signup",async(req,res)=>{
    const {name,email,password}=req.body;
    try {
        const check =await userModel.findOne({email:email});
        if (check) {
            return res.status(200).send({ msg: "already register" });
        }
        const hash = await bcrypt.hashSync(password, saltRounds);

        const data=await userModel({
            name,email,userType:"student",password:hash,course:[]
        });

        await data.save();

        const token =await jwt.sign({ userID:data.id }, 'shhhhh');

       return res.status(200).send({msg:"sucessfull",token:token});
        

    } catch (error) {
        res.status(502).send({msg:"error"});
    }
})

userRouter.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    
    try {
        
        const check =await userModel.findOne({email:email});
       
        const pass=await bcrypt.compareSync(password, check.password);
       
        if(pass){
            const token =await jwt.sign({ userID:check.id }, 'shhhhh');
            if(check.userType=="admin"){
                return res.status(200).send({msg:"sucessfull",userType:"admin",token:token});
            }
           
           return res.status(200).send({msg:"sucessfull",token:token});
        }
      return res.status(200).send({msg:"not a user"});
       
    } catch (error) {
        res.status(500).send({msg:"error"});
    }
})

userRouter.get("/optedcourse",async(req,res)=>{
    const token=req.headers.authorization.split(" ")[1];
    try {

        const decoded = jwt.verify(token, 'shhhhh');
        
        const check =await userModel.findOne({_id:decoded.userID});
        console.log(check)
        if(check){
            return res.status(200).send({msg:"sucessfull",data:check.course});
        }
        res.status(200).send({msg:"error"});
    } catch (error) {
        res.status(500).send({msg:"error"});
    }
})

userRouter.post("/addcourse",async(req,res)=>{
    const{id}=req.body;
    const token=req.headers.authorization.split(" ")[1];
    console.log(id,token)
    try {
        const decoded = jwt.verify(token, 'shhhhh');
        
        const check =await userModel.findOne({_id:decoded.userID});
        console.log(check)
        if(check){
            const tempdata=[...check.course,id];
            await userModel.updateOne({_id:decoded.userID},{$set: {course:tempdata}});
            return res.status(200).send({msg:"sucessfull"});
        }
        return res.status(200).send({msg:"error"});
    } catch (error) {
        res.status(500).send({msg:"error"});
    }
})

module.exports=userRouter;