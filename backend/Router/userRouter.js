const express=require("express");

const emailCheck = require('email-check');

const userModel=require('../Models/userModel');

const bcrypt = require('bcrypt');

const saltRounds = 10;

const userRouter=express.Router();

const jwt = require('jsonwebtoken');

userRouter.post("/post",async(req,res)=>{
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

userRouter.get('/',async(req,res)=>{
    const {email,password}=req.body;
    try {
       
        const check =await userModel.findOne({email:email});
        const pass=await bcrypt.compareSync(password, check.password);
        console.log(email,password);
        if(pass){
            const token =await jwt.sign({ userID:check.id }, 'shhhhh');
            if(pass.userType=="admin"){
                return res.status(200).send({msg:"sucessfull",userType:"admin",token:token});
            }
           
           return res.status(200).send({msg:"sucessfull",token:token});
        }
      return res.status(200).send({msg:"not a user"});
       
    } catch (error) {
        res.status(502).send({msg:"error"});
    }
})

module.exports=userRouter;