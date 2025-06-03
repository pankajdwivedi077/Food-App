import { useContext } from "react"
import { StoreContext } from "../context/StoreContext"
import FoodItem from "./FoodItem";

const FoodDisplay = ({ categorys, searchText }) => {

  const { foodList } = useContext(StoreContext);

const filteredFoods = foodList.filter(food => (
  (categorys.toLowerCase() === 'all' || food.category.toLowerCase() === categorys.toLowerCase() && food.name.toLowerCase().includes(searchText.toLowerCase()))
))

  return (
    <div className="container">
      <div className="row">
         {filteredFoods.length > 0 ? (
          filteredFoods.map((food, index) => (
            <FoodItem key={index} name={food.name} description={food.description} price={food.price} imageUrl={food.imageUrl} id={food.id} />
          ))
         ) : (
          <div className="text-center mt-4">
           <h4>No food found.</h4>
          </div>
         )}
      </div>
    </div>
  )
}

export default FoodDisplay