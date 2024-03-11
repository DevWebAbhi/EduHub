import { SET_DATA } from "./actionType";

const initialstate={
  Data :[]
};

export const allCourcesReducer=(state=initialstate,{type,payload})=>{
    switch(type){
       case SET_DATA:{return {...state,Data:payload}}
        default:{return {...state}};
    }
}