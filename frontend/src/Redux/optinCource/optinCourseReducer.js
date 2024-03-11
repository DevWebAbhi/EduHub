import { SET_DATA_OPTIN } from "./actionType";


const initialstate={
    Data:[]
};

export const optinCourseReducer=(state=initialstate,{type,payload})=>{
    switch(type){
        case SET_DATA_OPTIN:{return {Data:payload}};
        default:{return {...state}};
    }
}