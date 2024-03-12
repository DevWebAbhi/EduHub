const express=require("express");

const lectureRouter=express.Router();

const lectureModel=require("../Models/lectureModel");

const userModel=require('../Models/userModel');

const multer = require('multer');

const fs = require('fs');

const jwt = require('jsonwebtoken');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const destinationPath = './Assets/lectureImages';
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


  lectureRouter.get("/",async(req,res)=>{
    const{id}=req.body;
    const token=req.headers.authorization.split(" ")[1];
    try {

        const decoded = jwt.verify(token, 'shhhhh');
        
        const check =await userModel.findOne({_id:decoded.userID});

        if(check){
            const data=await lectureModel.find({_id:id});
            if(data.length==0){
                return res.status(200).send({msg:"no data"});
            }
            return res.status(200).send({msg:"sucessfull",data:data});
        }
        return res.status(200).send({msg:"error"});
        
    } catch (error) {
        res.status(500).send({msg:"error"});
    }
  })


lectureRouter.post('/post',async(req,res)=>{
    console.log(token)
    if(req.headers.authorization==undefined || req.headers.authorization==null){
        return res.status(500).send({msg:"error"});
    }
    const token=req.headers.authorization.split(" ")[1];
    console.log(token)
    try {
        const decoded = jwt.verify(token, 'shhhhh');
        console.log(decoded)
        const check =await userModel.findOne({_id:decoded.userID});
        console.log(check)
        if(check.userType=="admin"){
            upload(req, res,async function (err) {
            console.log(1)
                if (err) {
                  console.error(err);
                  return res.status(500).send({msg:"error"});
                }
                console.log(2)
                
                 const image= "https://eduhub-3oyx.onrender.com/"+"files/lectureImages/"+req.files[0].filename;
                
                const{title,description,courseID}=req.body;
                console.log(title,description,courseID)
               
                const data = await lectureModel.create({
                  title:title,
                  image: image,
                  description: description,
                  courseID: courseID
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

module.exports=lectureRouter;