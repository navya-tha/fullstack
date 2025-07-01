import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Cart from './screens/Cart/Cart';
import Home from './screens/Home/Home';
import Footer from './components/Footer/Footer';
import PlaceOrder from './screens/PlaceOrder/PlaceOrder';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Verify from './screens/Verify/Verify';
import MyOrders from './screens/MyOrders/MyOrders';
import Reviews from './screens/Reviews/Reviews';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation(); // ✅ capture location

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className="app">
        <Navbar showLogin={showLogin} setShowLogin={setShowLogin} />
        <Routes location={location} key={location.key}> 
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/reviews' element={<Reviews />} />
        </Routes>
        <ToastContainer />
      </div>
      <Footer />
    </>
  );
};

export default App;
