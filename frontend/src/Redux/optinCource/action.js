
import { SET_DATA } from "./actionType";
import axios from "axios";
export const getData=()=>async(dispatch)=>{
    try {
        const data=await axios.get("https://eduhub-3oyx.onrender.com/user/optedcourse");
        console.log(data,"all");
        dispatch({type:SET_DATA,payload:data.data.data});
    } catch (error) {
        console.log(error)
    }
}