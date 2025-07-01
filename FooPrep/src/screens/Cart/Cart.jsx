import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import './Cart.css';

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    addToCart,
    getTotalCartAmount,
    url
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const [customizations, setCustomizations] = useState({});
  const [note, setNote] = useState("Send 4 ketchup packets");

  useEffect(() => {
    const storedCustomizations = localStorage.getItem("customizations");
    if (storedCustomizations) setCustomizations(JSON.parse(storedCustomizations));

    const storedNote = localStorage.getItem("globalNote");
    if (storedNote) setNote(storedNote);
  }, []);

  useEffect(() => {
    localStorage.setItem("customizations", JSON.stringify(customizations));
  }, [customizations]);

  useEffect(() => {
    localStorage.setItem("globalNote", note);
  }, [note]);

  const handleCustomizationChange = (itemId, option, value) => {
    setCustomizations(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [option]: value
      }
    }));
  };

  const getEstimatedDeliveryTime = () => {
    const now = new Date();
    const fastItems = ["salad", "sandwich", "noodles"];
    let allFast = true;

    for (let itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const item = food_list.find(food => food._id === itemId);
        if (!item) continue;

        const name = item.name.toLowerCase();
        const isFast = fastItems.some(f => name.includes(f)) || name.includes("pure veg");

        if (!isFast) {
          allFast = false;
          break;
        }
      }
    }

    const addedMinutes = allFast ? 15 : 30;
    const estimatedTime = new Date(now.getTime() + addedMinutes * 60000);
    return estimatedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className='cart-items'>
      <div className="cart-items-title">
        <p>Items</p> <p>Title</p> <p>Price</p> <p>Quantity</p> <p>Total</p> <p>Modify</p>
      </div>
      <hr />

      {food_list.map((food) => {
        if (cartItems[food._id] > 0) {
          const itemCustom = customizations[food._id] || {};
          const foodName = food.name.toLowerCase();
          const showCustomization = !/cake|dessert|ice\s?cream/i.test(foodName);
          return (
            <div key={food._id}>
              <div className="cart-items-title cart-items-item">
                <img className="food-image" src={`${url}/image/${food.image}`} alt={food.name} />
                <p>{food.name}</p>
                <p>₹{food.price}</p>
                <p>{cartItems[food._id]}</p>
                <p>₹{cartItems[food._id] * food.price}</p>
                <div className="cart-counter">
                  <img onClick={() => removeFromCart(food._id)} src={assets.remove_icon_red} alt="Remove" />
                  <p>{cartItems[food._id]}</p>
                  <img onClick={() => addToCart(food._id)} src={assets.add_icon_green} alt="Add" />
                </div>
              </div>

              {showCustomization && (
                <div className="customization-row">
                  <div></div>
                  <div className="customization-options">
                    <label>
                      <input
                        type="checkbox"
                        checked={itemCustom.addCheese || false}
                        onChange={(e) =>
                          handleCustomizationChange(food._id, 'addCheese', e.target.checked)
                        }
                      />
                      <span>🧀 Add Cheese</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={itemCustom.noOnion || false}
                        onChange={(e) =>
                          handleCustomizationChange(food._id, 'noOnion', e.target.checked)
                        }
                      />
                      <span>🧅 No Onion</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={itemCustom.extraSpicy || false}
                        onChange={(e) =>
                          handleCustomizationChange(food._id, 'extraSpicy', e.target.checked)
                        }
                      />
                      <span>🌶️ Extra Spicy</span>
                    </label>
                  </div>
                </div>
              )}
              <div style={{
                borderBottom: '1px solid #ddd',
                margin: '4px 0 0 0' // ✅ Removed bottom margin
              }} />
            </div>
          );
        }
        return null;
      })}

      {getTotalCartAmount() > 0 && (
        <>
          <div className="note-wrapper">
            <div className="note-box-global">
              <label htmlFor="order-note">
                📝 Special Request for Kitchen:
              </label>
              <textarea
                id="order-note"
                placeholder="e.g. Send 4 ketchup packets, make it extra crispy..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>

          <div className="delivery-estimate">
            <p>🕒 Expected Delivery Time: {getEstimatedDeliveryTime()}</p>
          </div>
        </>
      )}

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{!getTotalCartAmount() ? 0 : 20}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>₹{!getTotalCartAmount() ? 0 : getTotalCartAmount() + 20}</p>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>Proceed to CheckOut</button>
        </div>

        <div className="cart-promocode">
          <p>If you have any promo code; Enter here</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder='Enter promo code ' />
            <button>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
