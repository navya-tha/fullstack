import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useContext, useEffect, useRef } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import './Navbar.css';

const Navbar = ({ showLogin, setShowLogin }) => {
  const [menu, setMenu] = useState('home');
  const { getTotalCartAmount, token, logout } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [showDropdown, setShowDropdown] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const menuSection = document.getElementById('explore-menu');
      const reviewSection = document.getElementById('reviews');
      const contactSection = document.getElementById('footer');

      if (contactSection && scrollTop >= contactSection.offsetTop - 80) {
        setMenu('contact-us');
      } else if (reviewSection && scrollTop >= reviewSection.offsetTop - 80) {
        setMenu('reviews');
      } else if (menuSection && scrollTop >= menuSection.offsetTop - 80) {
        setMenu('menu');
      } else {
        setMenu('home');
      }
    };

    if (location.pathname === '/') {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  const handleSectionLink = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='navbar'>
      <Link to='/' onClick={() => setMenu('home')}>
        <span className="brand-name">Blush & Bite</span>
      </Link>

      <ul className='navbar-menu'>
        <li onClick={() => { setMenu('home'); handleSectionLink('top'); }} className={menu === "home" ? "active" : ""}>Home</li>
        <li onClick={() => { setMenu('menu'); handleSectionLink('explore-menu'); }} className={menu === "menu" ? "active" : ""}>Menu</li>
        <li className={menu === "reviews" ? "active" : ""}>
          <Link to="/reviews" onClick={() => setMenu('reviews')}>Reviews</Link>
        </li>
        <li onClick={() => { setMenu('contact-us'); handleSectionLink('footer'); }} className={menu === "contact-us" ? "active" : ""}>Contact Us</li>
      </ul>

      <div className='navbar-right'>
        <div className='navbar-basket-icon'>
          <Link to="/cart">
            <img src={assets.basket_icon} alt="basket" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : 'dot'}></div>
        </div>

        {!token ? (
          <button className="sign-in-btn" onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div className='navbar-profile' ref={profileRef}>
            <img
              src={assets.profile_icon}
              alt="profile"
              onClick={() => setShowDropdown((prev) => !prev)}
            />
            {showDropdown && (
              <ul className='nav-profile-dropdown'>
                <Link to="/myorders">
                  <li>
                    <img src={assets.bag_icon} alt="orders" />
                    <p>Orders</p>
                  </li>
                </Link>
                <hr />
                <li
                  onClick={() => {
                    logout();
                    navigate('/');
                    setShowDropdown(false);
                  }}
                >
                  <img src={assets.logout_icon} alt="logout" />
                  <p>Logout</p>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
