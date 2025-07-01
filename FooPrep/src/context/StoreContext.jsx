import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState("");
  const url = import.meta.env.VITE_API_URL;

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data);
    } catch (err) {
      console.error("Failed to load food list", err);
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.get(`${url}/api/cart/get`, {
        headers: { token }
      });
      setCartItems(response.data.cartData);
    } catch (err) {
      console.error("Failed to load cart data", err);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const localToken = localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
        await loadCartData(localToken);
      }
    }
    loadData();
  }, []);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems({ ...cartItems, [itemId]: 1 });
    } else {
      setCartItems({ ...cartItems, [itemId]: cartItems[itemId] + 1 });
    }

    if (token) {
      try {
        await axios.post(`${url}/api/cart/add`, { itemId }, {
          headers: { token }
        });
      } catch (error) {
        console.log("Add to cart error:", error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems({ ...cartItems, [itemId]: cartItems[itemId] - 1 });

    if (token) {
      try {
        await axios.delete(`${url}/api/cart/remove?itemId=${itemId}`, {
          headers: { token }
        });
      } catch (error) {
        console.log("Remove from cart error:", error);
      }
    }
  };


  const getTotalCartAmount = () => {
    let total = 0;
    for (let item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find(food => food._id === item);
        if (!itemInfo) continue; 
        total += itemInfo.price * cartItems[item];
      }
    }
    return total;
  };
  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };
  const contextValues = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    logout
  };

  return (
    <StoreContext.Provider value={contextValues}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;