
import { SET_DATA_OPTIN } from "./actionType";
import axios from "axios";
export const getData=()=>async(dispatch)=>{
    try {
        const token = JSON.parse(localStorage.getItem("token-user-eduhub")).token;
            
                const config = {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                };
        const data=await axios.get("https://eduhub-3oyx.onrender.com/user/optedcourse",config);
        console.log(data,"allact");
        dispatch({type:SET_DATA_OPTIN,payload:data.data.data});
    } catch (error) {
        console.log(error)
    }
}