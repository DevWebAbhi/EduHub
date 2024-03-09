import { LOGIN, SET_ALERT_MSG, SET_DATA, SET_EMAIL, SET_NAME, SET_PASSWORD } from "./actionType"
const initialstate={
    login:true,
    alertMSG:"Fill all credentials",
    Data:{
        name:"",
        email:"",
        password:""
    }
}

export const loginReducer=(state=initialstate,{type,payload})=>{
    if(type==LOGIN){
        return {...state,login:false};
    }else if(type==SET_NAME){
        return{...state,Data:{...state.Data,name:payload}}
    }else if(type==SET_EMAIL){
        return{...state,Data:{...state.Data,email:payload}}
    }else if(type==SET_PASSWORD){
        return{...state,Data:{...state.Data,password:payload}}
    }else if(type==SET_ALERT_MSG){
        return{...state,alertMSG:payload}
    }else{
        return {...state,login:true};
    }
}