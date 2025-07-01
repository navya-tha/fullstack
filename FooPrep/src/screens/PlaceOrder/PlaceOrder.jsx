import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PlaceOrder.css';

const PlaceOrder = () => {
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
    phone: ""
  });

  const {
    getTotalCartAmount,
    food_list,
    cartItems,
    url,
    token
  } = useContext(StoreContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const orderItems = [];

    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({
          ...item,
          quantity: cartItems[item._id]
        });
      }
    });

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 20
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token }
      });
      const { session_url } = response.data;

      if (session_url) {
        window.location.replace(session_url);
      } else {
        alert("Error: No session URL received.");
      }
    } catch (error) {
      console.error("Stripe checkout error:", error);
      alert("Error placing order.");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input required name="first_name" value={data.first_name} onChange={onChangeHandler} type="text" placeholder='First Name' />
          <input required name="last_name" value={data.last_name} onChange={onChangeHandler} type="text" placeholder='Last Name' />
        </div>
        <input required name="email" value={data.email} onChange={onChangeHandler} type="email" placeholder='Email Address' />
        <input required name="street" value={data.street} onChange={onChangeHandler} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name="city" value={data.city} onChange={onChangeHandler} type="text" placeholder='City' />
          <input required name="state" value={data.state} onChange={onChangeHandler} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name="zip_code" value={data.zip_code} onChange={onChangeHandler} type="text" placeholder='Zip Code' />
          <input required name="country" value={data.country} onChange={onChangeHandler} type="text" placeholder='Country' />
        </div>
        <input required name="phone" value={data.phone} onChange={onChangeHandler} type="text" placeholder='Phone' />
      </div>

      <div className='place-order-right'>
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{getTotalCartAmount() === 0 ? 0 : 20}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Total</p>
            <p>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}</p>
          </div>
          <button type="submit">Proceed Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;