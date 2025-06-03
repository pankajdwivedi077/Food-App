import axios from "axios";

const API_URL = 'https://food-app-production-ee63.up.railway.app';

export const addFood = async (foodData, image) => {

    const formData = new FormData();
    formData.append('food', JSON.stringify(foodData));
    formData.append('file', image);

    try{
    const response = await axios.post(API_URL, formData, {headers: { "Content-Type": "multipart/form-data"}});
 
     } catch (error){
          console.log('Error', error)
          alert('Error adding food')    
     }
}

export const getFoodList = async () => {
     try{
     const response = await axios.get(API_URL);
   
     return response.data;
     }catch (error){
        console.log('error fetching food list', error)
        throw error;
     }
}

export const deleteFood = async (id) => {
       try{
           const response = await axios.delete(API_URL+"/" + id);
       
        return response.status === 204;
       }catch (error){
          console.log('error while deleting food', error)
       }

}
