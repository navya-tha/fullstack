import { useState, useEffect } from 'react';
import './Orders.css';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.post(url + "/api/order/list");
      setOrders(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  const statusHandler=async(e,orderId)=>{
    try{
      const response=await axios.post(url+"/api/order/status",{orderId,status:e.target.value})
      await fetchAllOrders()
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="screen order">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, itemIndex) => {
                  const itemText = `${item.name} X ${item.quantity}`;
                  return itemIndex === order.items.length - 1
                    ? itemText
                    : itemText + ', ';
                })}
              </p>
              <p className="order-item-name">
                {order.address.first_name} {order.address.last_name}
              </p>
              <div className="order-item-address">
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.street},{' '}
                  {order.address.country}, {order.address.zip_code}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>₹{order.amount}</p>
            <select onChange={(e)=>statusHandler(e,order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
