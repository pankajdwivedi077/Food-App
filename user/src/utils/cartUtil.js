export const calcaulateCartTotals = (cartItems , quantities) => {
    
  const subTotal = cartItems.reduce((acc, food) => acc + food.price * quantities[food.id], 0);
  const shippingCharge = subTotal === 0? 0.0 : 10;
  const tax = subTotal * 0.1
  const grandTotal = subTotal + shippingCharge + tax;

  return {subTotal, shippingCharge, tax, grandTotal}
}