import { Route, Routes } from "react-router-dom"
import MenuBar from "./components/MenuBar"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import Explore from "./pages/Explore"
import FoodDetails from "./pages/FoodDetails"
import Cart from "./pages/Cart"
import PlaceOrder from "./pages/PlaceOrder"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { ToastContainer } from "react-toastify"
import { Orders } from "./pages/Orders"
import { useContext } from "react"
import { StoreContext } from "./context/StoreContext"

const App = () => {

  const { token } = useContext(StoreContext)

  return (
    <div>
      <MenuBar />
       <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/food/:id" element={<FoodDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={token ? <PlaceOrder /> : <Login />} />
        <Route path="/login" element={token ? <Home /> : <Login />} />
        <Route path="/signup" element={token ? <Home /> : <Register />} />
        <Route path="/myorders" element={token ? <Orders /> : <Login />} />

      </Routes>
    </div>
  )
}

export default App