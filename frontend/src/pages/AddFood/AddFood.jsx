import axios from "axios";
import {  useState } from "react";
import { addFood } from "../../services/foodService";
import { toast } from "react-toastify";

const AddFood = () => {

  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Biryani'
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({...data, [name]: value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!image){
      toast.error('please select an image')
      return;
    }

     try{
       await addFood(data, image)
       toast.success('food added successfully')
       setData({name: '', description: '', category: 'Biryani', price: ''})
       setImage(null)
     }catch (error){
        toast.error('error adding food')
     }

  }

  return (
    <div className="mx-2 mt-2 ">
      <div className="row ">
        <div className="card col-md-4">
          <div className="card-body">
            <h2 className="mb-4">Add Food</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                <label htmlFor="image" className="form-label">
                   <img src={image ? URL.createObjectURL(image) : "File" } alt="" width={98} />
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  name="name"
                  onChange={onChangeHandler}
                  value={data.name}
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  rows="5"
                  required
                  name="description"
                  onChange={onChangeHandler}
                  value={data.description}
                ></textarea>
              </div>
                    <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select name="category" id="category" className="form-control" onChange={onChangeHandler} value={data.category}>
                  <option value="birtayani" >Biryani</option>
                  <option value="burger" >Burger</option>
                  <option value="cake" >Cake</option>
                  <option value="pizza" >Pizza</option>
                  <option value="rolls" >Rolls</option>
                  <option value="salad" >Salad</option>
                  <option value="icrecream" >IceCream</option>
                </select>
              </div>
                   <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  required
                  name="price"
                  onChange={onChangeHandler}
                  value={data.price}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
