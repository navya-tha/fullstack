import './Footer.css';
import { assets } from '../../assets/assets.js';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const menuSection = document.getElementById("explore-menu");
        if (menuSection) {
          menuSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const menuSection = document.getElementById("explore-menu");
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className='footer' id='footer'>
      <div className='footer-content'>
        <div className="footer-left">
          <h1 className="footer-brand-name">Blush & Bite</h1>
          <p>
  Blush & Bite is a beautifully crafted food ordering platform designed with love and elegance. 
  Perfect for modern users who value taste and aesthetics, it blends technology and flavor to deliver 
  delightful meals at your fingertips. A project built to inspire and serve with passion.
</p>

          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="facebook" />
            <img src={assets.twitter_icon} alt="twitter" />
            <img src={assets.linkedin_icon} alt="linkedin" />
          </div>
        </div>
        <div className="footer-center">
          <h2>Company</h2>
          <ul>
            <li>
              <Link
                to="/"
                className="footer-link"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Home
              </Link>
            </li>
            <li>
              <span className="footer-link" onClick={handleMenuClick}>
                Menu
              </span>
            </li>
            <li>
              <Link to="/reviews" className="footer-link">
                Reviews
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-right">
          <h2>Get in touch</h2>
          <ul>
            <li>+91 96297 45022</li>
            <li>enquiry@faceprep.in</li>
          </ul>
        </div>
      </div>

      <hr />
      <p className="footer-copyright">
        © 2025 FoodPrep. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;