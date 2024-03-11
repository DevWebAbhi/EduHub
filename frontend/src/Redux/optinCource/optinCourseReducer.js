import { SET_DATA } from "./actionType";


const initialstate={
    Data:[]
};

export const optinCourseReducer=(state=initialstate,{type,payload})=>{
    switch(type){
        case SET_DATA:{return {Data:payload}};
        default:{return {...state}};
    }
}