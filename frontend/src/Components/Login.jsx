import React, { useEffect } from 'react'
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
    Heading
  } from '@chakra-ui/react';
  import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
  } from '@chakra-ui/react'
import { useMediaQuery } from '@chakra-ui/react'
import {useSelector,useDispatch} from 'react-redux';
import { LOGIN,SET_NAME,SET_EMAIL,SET_PASSWORD,SET_ALERT_MSG } from '../Redux/login/actionType';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const navigate=useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen:isvisible, onOpen:isSet, onClose:isUnset } = useDisclosure()
    const cancelRef = React.useRef()
    const [isSmallerThan1600] = useMediaQuery('(max-width: 1600px)');
    const [isSmallerThan1300] = useMediaQuery('(max-width: 1300px)');
    const [isSmallerThan900] = useMediaQuery('(max-width: 900px)');
    const [isSmallerThan600] = useMediaQuery('(max-width: 600px)');
    const [isSmallerThan400] = useMediaQuery('(max-width: 400px)');
    const selector=useSelector(store=>store.loginReducer);
    const dispatch=useDispatch();


    async function handleAuthentication(){
      console.log(selector)
      const email=selector.Data.email,password=selector.Data.password,name=selector.Data.name;
      if(!selector.login){
        if(email.length==0 || password.length==0 || name.length==0){
          dispatch({type:SET_ALERT_MSG,payload:"Fill all credentials"});
        isSet();
        return;
        }
  
      }else{
        if(email.length==0 || password.length==0){
          dispatch({type:SET_ALERT_MSG,payload:"Fill all credentials"});
          isSet();
          return;
        }
      }
      try {

        if(selector.login){
          
          console.log(email,password)
          const data=await axios.post("https://eduhub-3oyx.onrender.com/user/login",{email:email,password:password})
          if(data.data.msg=="error"){
            dispatch({type:SET_ALERT_MSG,payload:"something went wrong"});
              isSet();
              return;
           }
          if(data.data.userType=="admin"){
            console.log("admin");
            localStorage.setItem("token-user-eduhub",JSON.stringify({token:data.data.token,userType:"admin"}));
            navigate("/admin/courses");
            return;
          }
          if(data.data.msg=="not a user"){
            dispatch({type:SET_ALERT_MSG,payload:"Not a user please login"});
            isSet();
            return;
          }
          localStorage.setItem("token-user-eduhub",JSON.stringify({token:data.data.token,userType:"student"}));
          navigate("/student");
          console.log(data)
        }else{
          const data=await axios.post("https://eduhub-3oyx.onrender.com/user/signup",{name:name,email:email,password:password})
         if(data.data.msg=="error"){
          dispatch({type:SET_ALERT_MSG,payload:"something went wrong"});
            isSet();
            return;
         }
          if(data.data.msg=="already register"){
            dispatch({type:SET_ALERT_MSG,payload:"Already Registred"});
            isSet();
            return;
          }
          localStorage.setItem("token-user-eduhub",JSON.stringify({token:data.data.token,userType:"student"}));
          navigate("/student");

        }
        
      } catch (error) {
        console.log(error);
      }
    }

    function handleInput(e){
      console.log(e.target.name,e.target.value)
      dispatch({type:e.target.name,payload:e.target.value});
    }





    useEffect(()=>{
        const loginCheck=JSON.parse(localStorage.getItem("token-user-eduhub"));
        if(loginCheck==undefined || loginCheck==null){
            onOpen();
        }else{
          if(loginCheck.userType=="admin"){
            navigate("/admin/course_upload");
          }else{
            navigate("/student");
          }
        }
    },[])


  return (
   <Box width={"100%"} height={"100vh"} backgroundColor={"#3498DB"} opacity={"0.1"} overflow={"auto"} >
    
   <Modal isOpen={isOpen} width="max-content">
  
  <ModalContent margin={"auto"} 
  width={isSmallerThan400?"85%":isSmallerThan600?"80%":isSmallerThan900?"50%":isSmallerThan1300?"40%":isSmallerThan1600?"35%":"30%"}
  maxW={"1000px"}
  padding={"0.5rem"}
  marginTop={"4rem"}
  borderRadius={"1rem"}
  shadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
  backgroundColor={"white"}
  >
     <ModalHeader textAlign={"center"} marginBottom={"0.5rem"} fontSize={"xx-large"} color={"#3498DB"} fontFamily={"Arial, Helvetica, sans-serif"}>Welcome To EduHub</ModalHeader>
    <ModalHeader textAlign={"center"} marginBottom={"1rem"} fontSize={"xx-large"} color={"#3498DB"} fontFamily={"Arial, Helvetica, sans-serif"}>{selector.login?"Login":"Signup"}</ModalHeader>
    <ModalBody>
     {
      !selector.login?<>
      <Input type='text' placeholder='Full Name' name={SET_NAME}  width={"80%"} display={"block"} height={"1.7rem"} margin={"auto"} marginBottom={"1.6rem"} borderWidth={"thin"} borderRadius={"0.5rem"} onChange={handleInput}/>
      </>:<></>
     }
     <Input type='email' placeholder='Email' name={SET_EMAIL}  width={"80%"} display={"block"} height={"1.7rem"} margin={"auto"} marginBottom={"1.6rem"}  borderWidth={"thin"} borderRadius={"0.5rem"} onChange={handleInput}/>
     <Input type='password' placeholder='Password'  name={SET_PASSWORD} width={"80%"} display={"block"} height={"1.7rem"} margin={"auto"} marginBottom={"1.6rem"}  borderWidth={"thin"} borderRadius={"0.5rem"} onChange={handleInput}/>
    </ModalBody>

    <ModalFooter display={"block"}>
      
      
      <Button display={"block"} margin={"auto"} padding={"0.35rem 0.9rem"} border={"none"} borderRadius={"0.4rem"} backgroundColor={"#3498DB"} onClick={handleAuthentication}> {!selector.login?"Signup":"Login"}</Button>
      
      <Box display={"flex"} width={"max-content"} margin={"auto"} marginTop={"1.2rem"}><Box>{selector.login?"New user? ":"Already a user? "}</Box><Button onClick={()=>{selector.login?dispatch({type:LOGIN}):dispatch({type:"SIGNUP"})}} color={"#3498DB"} background={"transparent"} border={"none"} >{selector.login?"Signup":"Login"}</Button></Box>
    </ModalFooter>
  </ModalContent>
</Modal>
<>
      

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

   </Box>
  )
}

export default Login
