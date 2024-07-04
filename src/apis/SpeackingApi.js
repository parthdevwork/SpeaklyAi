import axios from "axios";
import Config from "../Config";

export const getSpeakingVideo = () => {
  return axios.get(`${Config.Base_URl}${Config.Get_Video}`);
};