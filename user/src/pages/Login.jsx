import { Link, useNavigate } from "react-router-dom"
import "./Login.css"
import { useContext, useState } from "react"
import { login } from "../service/authService"
import { StoreContext } from "../context/StoreContext"
import { toast } from "react-toastify"

function Login() {

  const { token, setToken, loadCartData } = useContext(StoreContext)

  const navigate = useNavigate()

  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({...data, [name]: value}))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
   try{
     const response = await login(data);
     if (response.status === 200){
       setToken(response.data.token)
       localStorage.setItem("token", response.data.token);
      await loadCartData(response.data.token)
       navigate('/');
     }else{
      toast.error("unable to login please try agin")
     }
   }catch(e){
     console.log(e, "error in login function")
     toast.error("server problem")
   }
  }

  return (
   <div className="container login-container">
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
            <form onSubmit={onSubmitHandler} >
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name="email" onChange={onChangeHandler} value={data.email} />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="password" onChange={onChangeHandler} value={data.password} />
                <label htmlFor="floatingPassword">Password</label>
              </div>

             
              <div className="d-grid">
                <button className="btn btn-outline-primary btn-login text-uppercase " type="submit">Sign
                  in</button>
                <button className="btn btn-outline-danger btn-login text-uppercase mt-2" type="reset">Reset</button>
              </div>
            
             <div className="mt-4">
              Don't have an account <Link to="/signup" >Sign Up</Link> 
             </div>
           
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login