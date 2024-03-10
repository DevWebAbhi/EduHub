const express=require("express");
const app=express();
const PORT=process.env.PORT;
const cors = require('cors')
const userRouter=require("./Router/userRouter");
const courseRouter=require("./Router/courseRouter");
require('dotenv').config();
app.use(cors("https://edu-mgvwklcaj-devwebabhis-projects.vercel.app"));
const {connect}=require("./db");
app.use(express.json());

app.use("/files", express.static(__dirname + '/Assets'));
app.get("/",(req,res)=>{
    res.status(200).send({msg:"This is EduHub backend application"});
})

app.use("/user",userRouter);

app.use("/courses",courseRouter);



app.get('*', (req, res) => {
    res.sendStatus(501).send({ message: 'Not Implemented' });
  });
  
  app.post('*', (req, res) => {
    res.sendStatus(501).send({ message: 'Not Implemented' });
  });
  
  app.delete('*', (req, res) => {
    res.sendStatus(501).send({ message: 'Not Implemented' });
  });
  
  app.put('*', (req, res) => {
    res.sendStatus(501).send({ message: 'Not Implemented' });
  });
  
  app.head('*', (req, res) => {
    res.sendStatus(501).send({ message: 'Not Implemented' });
  });
  
  app.options('*', (req, res) => {
    res.sendStatus(501).send({ message: 'Not Implemented' });
  });
  
  app.listen(8080, async () => {
    try {
      await connect;
      console.log('Connected to mongodb atlas');
    } catch (error) {
      console.log(error);
    }
  });