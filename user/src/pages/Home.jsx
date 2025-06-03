import { useState } from "react"
import ExploreMenu from "../components/ExploreMenu"
import FoodDisplay from "../components/FoodDisplay"
import Header from "../components/Header"


const Home = () => {

  const [categorys, setCategorys] = useState('All')

  return (
   <main className="container">
    <Header />
    <ExploreMenu categorys={categorys} setCategorys={setCategorys} />
    <FoodDisplay categorys={categorys} searchText={''} />
   </main>
  )
}

export default Home