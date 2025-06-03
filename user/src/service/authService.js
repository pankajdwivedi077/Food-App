import axios from "axios";

const API_URL = 'https://food-app-production-ee63.up.railway.app/api'

export const register = async (data) => {
    try{
    const response = await axios.post(API_URL+"/register", data);
    return response
    }catch (e){
       throw e;
    }
}

export const login = async (data) => {
    try{
    const response = await axios.post(API_URL+"/login", data);
    return response
    }catch (e){
       throw e;
    }
}
