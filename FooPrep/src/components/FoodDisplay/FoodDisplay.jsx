import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodCard from '../FoodCard/FoodCard';
import './FoodDisplay.css';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const filteredList = category.trim().toLowerCase() === 'all'
    ? food_list
    : food_list.filter(item => item.category.trim().toLowerCase() === category.trim().toLowerCase());

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {filteredList.length > 0 ? (
          filteredList.map(item => (
            <FoodCard
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.image}
            />
          ))
        ) : (
          <p style={{ padding: '2rem', color: 'gray' }}>
            No items available in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;