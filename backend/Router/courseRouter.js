const express=require("express");

const courseRouter=express.Router();

const courseModel=require("../Models/courseModel");

const userModel=require('../Models/userModel');

const multer = require('multer');

const fs = require('fs');

const jwt = require('jsonwebtoken');

courseRouter.get("/",async(req,res)=>{
    try {
        const data= await courseModel.find();
        return res.status(200).send({msg:"sucessfull",data:data});
    } catch (error) {
        res.status(502).send({msg:"error"});
    }
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const destinationPath = './Assets/courseImages';
      if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath, { recursive: true });
      }
  
      cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const originalExtension = file.originalname.split('.').pop();
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + originalExtension);
    },
  });
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, 
    fileFilter: function (req, file, cb) {
      
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'));
      }
    },
  }).array('Images', 12);

courseRouter.post("/post",async(req,res)=>{
  if(req.headers.authorization==undefined || req.headers.authorization==null){
    return res.status(500).send({msg:"error"});
}
    const token=req.headers.authorization.split(" ")[1];
   
    
    try {
        const decoded = jwt.verify(token, 'shhhhh');
        
        const check =await userModel.findOne({_id:decoded.userID});
        
        if(check.userType=="admin"){
          

          upload(req, res,async function (err) {
            
            if (err) {
              console.error(err);
              return res.status(500).send({msg:"error"});
            }
            
            
             const image= "https://eduhub-3oyx.onrender.com/"+"files/courseImages/"+req.files[0].filename;
            
            const{title,description,checklist}=req.body;
           console.log(title,description,check)
            const data = await courseModel.create({
              title:title,
              image: image,
              description: description,
              checklist: checklist
          });
           console.log(5)
          });
            
            return res.status(200).send({msg:"sucessfull"});
        }
        return res.status(200).send({msg:"not a admin"});
    } catch (error) {
        res.status(500).send({msg:"error"});
    }
})

courseRouter.get("/coursecount",async(req,res)=>{
  try {
    const data=await courseModel.find();
    return res.status(200).send({msg:"sucessfull",data:data.length});
  } catch (error) {
    res.status(500).send({msg:"error"});
  }
})

module.exports=courseRouter;