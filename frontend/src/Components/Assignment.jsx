import React,{useState,useEffect} from 'react'
import {Box, Heading,Image,Text} from '@chakra-ui/react'
import EnrolledNavbar from './EnrolledNavbar';
import axios from 'axios';
const Assignment = () => {

    const [data,setData]=useState([]);
    async function getData(){
        try {
            const token = JSON.parse(localStorage.getItem("token-user-eduhub")).token;
            
            const config = {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            };
            const courseID=JSON.parse(localStorage.getItem("courseID-eduhub"));

            const info=await axios.get("https://eduhub-3oyx.onrender.com/assignment",{id:courseID},config);
            if(info.data.msg!="error"){
                setData(info.data.data);
                return;
            }
            alert("something went wrong");

        } catch (error) {
            alert("something went wrong");
        }
    }

    useEffect(()=>{
        getData();
    },[])

  return (
    <Box>
        <EnrolledNavbar/>
        {
            data.map((e,idx)=>(
               <Box display={"flex"} key={idx} justifyContent={"space-between"} marginBottom={"1.5rem"} padding={"0.5rem"}>
                <Image width="6rem" height="5rem"  src={e.image} alt="image"/>
                <Heading>{e.title}</Heading>
                <Text>{e.description}</Text>
               </Box> 
            ))
        }
    </Box>
  )
}

export default Assignment
