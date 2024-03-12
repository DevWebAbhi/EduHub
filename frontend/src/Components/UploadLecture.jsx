import React, { useEffect,useState } from 'react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Box,
    Input,
    Heading,
    Textarea,
    Select
  } from '@chakra-ui/react';
  import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton
  } from '@chakra-ui/react';
  import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
import { useMediaQuery } from '@chakra-ui/react'
import {useSelector,useDispatch} from 'react-redux';
import { ADMIN_COURSE_UPLOAD_SET_TITLE,ADMIN_COURSE_UPLOAD_SET_IMAGE,ADMIN_COURSE_UPLOAD_SET_DESCRIPTION,ADMIN_COURSE_UPLOAD_SET_CHECKLIST,ADMIN_COURSE_UPLOAD_SET_ALERT_MSG } from "../Redux/courseUpload/actionType";
import axios from 'axios';

const UploadLecture = () => {


    const { isOpen:isvisible, onOpen:isSet, onClose:isUnset } = useDisclosure();
    const cancelRef = React.useRef();
    const [isSmallerThan1600] = useMediaQuery('(max-width: 1600px)');
    const [isSmallerThan1300] = useMediaQuery('(max-width: 1300px)');
    const [isSmallerThan900] = useMediaQuery('(max-width: 900px)');
    const [isSmallerThan600] = useMediaQuery('(max-width: 600px)');
    const [isSmallerThan400] = useMediaQuery('(max-width: 400px)');
    const selector=useSelector(store=>store.courseUploadReducer);
    const dispatch=useDispatch();
    const[option,setOption]=useState([]);
    const[info,setInfo]=useState({
        title:"",description:"",id:""
    });
    async function handleSubmit(e){
        console.log(info)
        e.preventDefault();
        try {

            const title=info.title,image=info.image,description=info.description;
            if(title.length==0 || description.length==0){
                dispatch({type:ADMIN_COURSE_UPLOAD_SET_ALERT_MSG,payload:"Fill all credentials"});
                isSet();
                return;
            }

            const token=JSON.parse(localStorage.getItem("token-user-eduhub")).token;
            console.log(token)
            if(!token){
                dispatch({type:ADMIN_COURSE_UPLOAD_SET_ALERT_MSG,payload:"Login First"});
                isSet();
                return;
            }
            const formData = new FormData();
            formData.append('Images', image);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("courseID", info.id);
            
            
                const config = {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                };
            const data=await axios.post('https://eduhub-3oyx.onrender.com/lecture/post',config,formData)
            
            if(data.data.msg=="not a admin"){
                dispatch({type:ADMIN_COURSE_UPLOAD_SET_ALERT_MSG,payload:"Unauthorized access"});
                isSet();
                return;
            }

            if(data.data.msg=="error"){
                dispatch({type:ADMIN_COURSE_UPLOAD_SET_ALERT_MSG,payload:"Error occured"});
                isSet();
                return;
            }

            dispatch({type:ADMIN_COURSE_UPLOAD_SET_ALERT_MSG,payload:"Posted Sucessfully"});
                isSet();
                return;


            
        } catch (error) {
            console.log(error)
            dispatch({type:ADMIN_COURSE_UPLOAD_SET_ALERT_MSG,payload:"Something went wrong"});
                isSet();
        }
    }

    function handleInput(e){
        setInfo({...info,[e.target.name]:e.target.value})
    }

    function handleFile(e){
        setInfo({...info,image:e.target.files[0]});
    }

    async function getCources(){
        try {
            const data=await axios.get("https://eduhub-3oyx.onrender.com/courses/");
            console.log(data)
            setOption(data.data.data); 
        } catch (error) {
            alert();
        }
    }

    function handleSelect(e){
        setInfo({...info,id:e.target.value});
    }

    useEffect(()=>{
        getCources();
    },[])


  return (
    <>
    <FormControl
    width={isSmallerThan400?"55%":isSmallerThan600?"60%":isSmallerThan900?"50%":isSmallerThan1300?"40%":isSmallerThan1600?"35%":"30%"}
    maxW={"1000px"}
    margin={"auto"}
    padding={"1.5rem"}
    marginTop={"4rem"}
    borderRadius={"1rem"}
    shadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
    backgroundColor={"white"}
    action="/stats"
    encType="multipart/form-data"
    method="post"
    
       
    >
        <FormLabel marginBottom={"2rem"} color={"#3498DB"} fontSize={"xx-large"} fontWeight={"500"}>Upload Assignment</FormLabel>
        <FormLabel  marginBottom={"1rem"} color={"#3498DB"} fontSize={"large"} fontWeight={"500"}>Title</FormLabel>
        <Input type='text' name={"title"} onChange={handleInput} placeholder='Course Title'   width={"100%"} display={"block"} height={"1.7rem"} margin={"auto"} marginBottom={"1.6rem"}  borderWidth={"thin"} borderRadius={"0.5rem"} />
        <FormLabel  marginBottom={"1rem"} color={"#3498DB"} fontSize={"large"} fontWeight={"500"}>Upload Image</FormLabel>
        <Input type='file' name="monfichier" onChange={handleFile} placeholder='Image'   width={"100%"} display={"block"} height={"1.7rem"} margin={"auto"} marginBottom={"1.6rem"}  borderWidth={"thin"}  />
        <FormLabel  marginBottom={"1rem"} color={"#3498DB"} fontSize={"large"} fontWeight={"500"}>Description</FormLabel>
        <Textarea width={"100%"} name="description" onChange={handleInput} marginBottom={"1rem"}>Description</Textarea>
        <FormLabel  marginBottom={"1rem"} color={"#3498DB"} fontSize={"large"} fontWeight={"500"}>Select Course</FormLabel>
       
        <select onChange={handleSelect} name=''>
            {
                option.map((e)=>(
                    <option value={e._id}>{e.title}</option>
                ))
            }
        </select>
        <Input type='submit' value={"submit"} onClick={handleSubmit} padding={"0.35rem 0.9rem"} border={"none"} borderRadius={"0.4rem"} backgroundColor={"#3498DB"} display={"block"} margin={"auto"}/>
    </FormControl>
    <AlertDialog
        isOpen={isvisible}
        leastDestructiveRef={cancelRef}
        onClose={isUnset}
      >
        <AlertDialogOverlay>
          <AlertDialogContent 
          margin={"auto"}
          width={isSmallerThan400?"75%":isSmallerThan600?"60%":isSmallerThan900?"40%":isSmallerThan1300?"30%":isSmallerThan1600?"23%":"19%"}
          maxW={"1000px"}
          padding={"0.5rem"}
          marginTop={"2rem"}
          borderRadius={"1rem"}
          shadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
          backgroundColor={"white"}
          >
            

            <AlertDialogBody textAlign={"center"}>
             {selector.alertMSG}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={isUnset} display={"block"} margin={"auto"} padding={"0.5rem"} border={"none"}>
                OK
              </Button>
              
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default UploadLecture
