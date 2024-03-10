import { ADMIN_COURSE_UPLOAD_SET_TITLE,ADMIN_COURSE_UPLOAD_SET_IMAGE,ADMIN_COURSE_UPLOAD_SET_DESCRIPTION,ADMIN_COURSE_UPLOAD_SET_CHECKLIST,ADMIN_COURSE_UPLOAD_SET_ALERT_MSG } from "./actionType";

const initialstate={
    alertMSG:"Fill all credentials",
    Data:{
        title:"",
        image:"",
        description:"",
        checklist:""
    }
};

export const courseUploadReducer=(state=initialstate,{type,payload})=>{
    switch(type){
        case ADMIN_COURSE_UPLOAD_SET_TITLE:{return {...state,Data:{...state.Data,title:payload}}};
        case ADMIN_COURSE_UPLOAD_SET_IMAGE:{return {...state,Data:{...state.Data,image:payload}}};
        case ADMIN_COURSE_UPLOAD_SET_DESCRIPTION:{return {...state,Data:{...state.Data,description:payload}}};
        case ADMIN_COURSE_UPLOAD_SET_CHECKLIST:{return {...state,Data:{...state.Data,checklist:payload}}};
        case ADMIN_COURSE_UPLOAD_SET_ALERT_MSG:{return {...state,alertMSG:payload}};
        default:{return {...state}};
    }
}