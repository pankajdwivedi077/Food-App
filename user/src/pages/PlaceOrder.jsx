import './PlaceOrder.css';
import { useContext, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import { calcaulateCartTotals } from '../utils/cartUtil';

const PlaceOrder = () => {
     
  const { foodList, increaseQty, decreaseQty, quantities, removeFromCart, clearCart } = useContext(StoreContext)

  const cartItems = foodList.filter(food => quantities[food.id] > 0);

  const { subTotal, tax, shippingCharge, grandTotal } = calcaulateCartTotals(cartItems, quantities)
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phone: '',
    country: '',
    state: '',
    zip: ''
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

   const handleChange = (e) => {
    setFormData({ 
      ...formData,
      [e.target.id]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const values = Object.values(formData);
    if (values.some(v => v === '')) {
      alert("Please fill in all fields.");
      return;
    }

    alert(" Order placed successfully!");

  // Clear the cart
   clearCart();

    // You can send this formData and cartItems to a backend or just log it
    console.log('Order Data:', { formData, cartItems, grandTotal });

    // Show confirmation
    setOrderPlaced(true);
   
  };

    if (orderPlaced) {
    return (
      <div className="container mt-5 text-center">
        <h2>🎉 Order Completed!</h2>
        <p>Thank you, {formData.firstName}! Your order has been placed successfully.</p>
        <p>Did only mock here. Because of Razorpay integration difficulties faced</p>
      </div>
    );
  }

 
  return (
    <div className='container mt-2'>
      <main>
        <div className="row g-5">

          {/* Cart Summary */}
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Your cart</span>
              <span className="badge bg-primary rounded-pill">{cartItems.length}</span>
            </h4>
            <ul className="list-group mb-3">
              {cartItems.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 className="my-0">{item.name}</h6>
                    <small className="text-body-secondary"> Qty: {quantities[item.id]} </small>
                  </div>
                  <span className="text-body-secondary">${item.price * quantities[item.id]}</span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between">
                <span className="text-body-secondary">Shipping</span>
                <span className="text-body-secondary">${subTotal === 0 ? 0.0 : shippingCharge.toFixed(2)}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span className="text-body-secondary">Tax</span>
                <span className="text-body-secondary">${tax.toFixed(2)}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>${grandTotal.toFixed(2)}</strong>
              </li>
            </ul>
          </div>

          {/* Billing Form */}
          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Billing address</h4>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="firstName" className="form-label">First name</label>
                  <input type="text" className="form-control" id="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">Last name</label>
                  <input type="text" className="form-control" id="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
                <div className="col-12">
                  <label htmlFor="email" className="form-label">Email</label>
                  <div className="input-group has-validation">
                    <span className="input-group-text">@</span>
                    <input type="email" className="form-control" id="email" placeholder="email" value={formData.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="col-12">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input type="text" className="form-control" id="address" placeholder="1234 Main St" value={formData.address} onChange={handleChange} required />
                </div>
                <div className="col-12">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input type="text" className="form-control" id="phone" placeholder="1234567890" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="col-md-5">
                  <label htmlFor="country" className="form-label">Country</label>
                  <select className="form-select" id="country" value={formData.country} onChange={handleChange} required>
                    <option value="">Choose...</option>
                    <option>United States</option>
                    <option>India</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="state" className="form-label">State</label>
                  <select className="form-select" id="state" value={formData.state} onChange={handleChange} required>
                    <option value="">Choose...</option>
                    <option>California</option>
                    <option>Madhya Pradesh</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label htmlFor="zip" className="form-label">Zip</label>
                  <input type="text" className="form-control" id="zip" value={formData.zip} onChange={handleChange} required placeholder='123456' />
                </div>
              </div>
              <hr className="my-4" />
              <button className="w-100 btn btn-primary btn-lg" type="submit" disabled={cartItems.length === 0}>
                Continue to checkout
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlaceOrder;
