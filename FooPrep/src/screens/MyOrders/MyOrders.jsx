import { useState, useEffect, useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';
import { assets } from '../../assets/assets';
import './MyOrders.css'

const MyOrders = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { url, token, setToken } = useContext(StoreContext);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/userorders`, {
        headers: { token }
      });
      if (Array.isArray(response.data.data)) {
        setData(response.data.data);
      } else {
        setData([]);
        console.warn("Expected array in response.data.data, got:", response.data.data);
      }

    } catch (error) {
      console.error("Error fetching orders", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  if (isLoading) return <Loader />;

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.length > 0 ? (
          data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="parcel" />
              <p>
                {Array.isArray(order.items) &&
                  order.items.map((item, itemIndex) => {
                    const text = `${item.name}X${item.quantity}`;
                    return itemIndex === order.items.length - 1 ? text : text + ", ";
                  })}
              </p>
              <p>₹{order.amount}</p>
              <p>Items: {Array.isArray(order.items) ? order.items.length : 0}</p>
              <p><span>&#x25cf;</span> <b>{order.status}</b></p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          ))
        ) : (
          <p>No Orders Found</p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
