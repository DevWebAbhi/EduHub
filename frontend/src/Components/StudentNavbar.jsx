import React from 'react'
import {Box,
Heading
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
const StudentNavbar = () => {
  const navigate=useNavigate();
  return (
    <Box  padding={"0.5rem"} display={"flex"} background={"#3498DB"} >
      <Heading _hover={{boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"}} padding={"0.5rem 1rem"} color={"white"} onClick={()=>navigate("/allcources")}>All Cources</Heading>
      <Heading _hover={{boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"}} padding={"0.5rem 1rem"} color={"white"} onClick={()=>navigate("/opted")}>Enrolled Cources</Heading>
    </Box>
  )
}

export default StudentNavbar
