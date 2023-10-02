import  axios from "axios";
const baseURL = `http://localhost:3000`;
const instance = axios.create({ baseURL });

export const getFoods = async () => {
    return await instance.get(`/foods`);
}