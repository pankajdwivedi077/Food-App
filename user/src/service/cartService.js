import axios from "axios";

const API_URL = "https://food-app-production-ee63.up.railway.app/api/cart";

export const addToCart = async (foodId, token) => {
  try{
      await axios.post(API_URL, { foodId }, {headers: {"Authorization": `Bearer ${token}`}})
  }catch (error){
    console.error("error adding the in cart", error)
  }
}

export const removeQtyFromCart = async (foodId, token) => {
  try{
     await axios.post(API_URL+"/remove", { foodId }, {headers: {"Authorization": `Bearer ${token}`}})
  }catch (error){
    console.error("error in removing cart qty data", error)
  }
}

export const getCartData = async (token) => {
  try{
     const response = await axios.get(API_URL, { headers: {"Authorization": `Bearer ${token} `}})
     return response.data.items;
  }catch (error){
     console.error("error fetching cart data", error)
  }
}
