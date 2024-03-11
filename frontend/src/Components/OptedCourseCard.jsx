import React from 'react'
import {
    Box,
    Button,
    Heading,
    Image,
    Text
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
const OptedCourseCard = ({data}) => {
    const navigate=useNavigate();

    function setCourseId(){
        localStorage.setItem("courseID-eduhub",JSON.stringify(data._id));
        navigate("/assignment");
    }

  return (
    <Box onClick={setCourseId} width={"20rem"} borderRadius={"0.5rem"} border={"1px solid"} >
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
        
        
    </Box>
  )
}

export default OptedCourseCard
