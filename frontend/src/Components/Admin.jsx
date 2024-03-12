import { Box } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect,useState } from 'react'
import DonutChart from 'react-donut-chart';
import { useNavigate } from 'react-router-dom';
const Admin = () => {
  const navigate=useNavigate();
  const [student,setStudent]=useState(0);
  const [course,setCourse]=useState(0);
async function getStudentCount(){
  try {
    const data=await axios.get("https://eduhub-3oyx.onrender.com/user/usercount");
    setStudent(data.data.data);
  } catch (error) {
    
  }
}

async function getCounrseCount(){
  try {
    const data=await axios.get("https://eduhub-3oyx.onrender.com/cources/coursecount");
    setCourse(data.data.data);
  } catch (error) {
    
  }
}
useEffect(()=>{
  getCounrseCount();
  getStudentCount();
},[])
  return (
    <>
    <Box display={"flex"} justifyContent={"space-around"}>
      <Box padding={"1rem 1.5rem"} background={"#3498DB"}>Toatal Cources {student}</Box>
      <Box padding={"1rem 1.5rem"} background={"#3498DB"}>Total Members {course}</Box>
    </Box>
    
    <Box width={"min-content"} margin={"auto"} borderColor="transparent" marginTop={"4rem"}  border={"1px solid transparent"}>
    <DonutChart
    width={500}
    height={500}
    
  data={[
    {
      label: 'Give you up',
      value: 25,
    },
    {
      label: '',
      value: 75,
      isEmpty: true,
    },
  ]}
/>;
    </Box>
    <Box display={"flex"} marginBottom={"3rem"} justifyContent={"space-around"}>
      <Box padding={"1rem 1.5rem"} background={"#3498DB"} onClick={()=>navigate("/admin/course_upload")}>Upload Cources </Box>
      <Box padding={"1rem 1.5rem"} background={"#3498DB"} onClick={()=>navigate("/uploadlecture")}>Upload Lectures </Box>


      
      <Box padding={"1rem 1.5rem"} background={"#3498DB"} onClick={()=>navigate("/uploadassignment")}>Upload Assignment </Box>
    </Box>
    </>
  )
}

export default Admin
