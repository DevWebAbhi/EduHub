import React from 'react'
import {
    Box,
    Button,
    Heading,
    Image,
    Text
} from '@chakra-ui/react'
import axios from 'axios';
const CourseCard = ({data}) => {


    async function handleApply(){
        try {
            const token=JSON.parse(localStorage.getItem("token-user-eduhub")).token;
            if(token){
                const data=await axios.post("",{
                    headers: {
                    Authorization: 'Bearer ' + token 
                    }
        
                    });
                    alert("uploaded sucessfully");
                    return;
            }
            alert("login first");
  
        } catch (error) {
            alert("something went wrong");
            console.log(error);
        }
    }

  return (
    <Box width={"20rem"} borderRadius={"0.5rem"} border={"1px solid"} >
        <Image width={"20rem"} height={"18rem"} borderRadius={"0.5rem 0.5rem 0 0"} src={data.image}  alt='course-image'/>
        <Box padding={"0.5rem"} height={"25rem"}>
        <Heading>{data.title}</Heading>
        <Text>
            {data.description}
        </Text>

        {
            data.checklist.split("@").map((e)=>(
                <Text>- {e}</Text>
            ))
        }
        
        </Box>
        <Button background={"#3498DB"} padding={"0.5rem 1rem"} border={"none"} borderRadius={"0.5rem"} marginLeft={"0.5rem"} marginBottom={"1rem"} onClick={handleApply}>Apply</Button>
        
    </Box>
  )
}

export default CourseCard
