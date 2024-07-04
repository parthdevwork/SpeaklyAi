import axios from "axios"
import Config from "../../Config";

export const fetchQuestions=async(part, token)=>{
const respo=  await axios.get(`${Config.Base_URl + '/api/get-all-questions?part='}${part}`,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  console.log("Response",respo.data )
return respo.data
}

