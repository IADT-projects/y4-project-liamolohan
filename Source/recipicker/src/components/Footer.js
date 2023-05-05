import { Link } from "react-router-dom";

// Import Stylesheets
import "../assets/css/footer.css";

// Import SVG
import twitterSVG from "../assets/svg/twitter.svg";
import facebookSVG from "../assets/svg/facebook.svg";
import instagramSVG from "../assets/svg/instagram.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="wrapper">
        <section className="footer-content">
          <section className="footer-left">
            <h3 className="footer-title">reciPicker</h3>
            <span className="footer-socmed">
              <a
                href="https://www.twitter.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={twitterSVG} alt="Twitter Icon" />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={facebookSVG} alt="Facebook Icon" />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={instagramSVG} alt="Instagram Icon" />
              </a>
            </span>
          </section>

          <section className="footer-lists">
            <ul className="footer-nav-list">
              <h4>Site Map</h4>
              <li className="footer-nav-item">
                <Link to="/" className="footer-nav-link">
                  Home
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link to="/categories" className="footer-nav-link">
                  Categories
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link to="/recipes" className="footer-nav-link">
                  Recipes
                </Link>
              </li>
            </ul>

            <ul className="footer-nav-list">
              <h4>Helpful Links</h4>
              <li className="footer-nav-item">
                <Link to="/about" className="footer-nav-link">
                  About
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link to="/contact" className="footer-nav-link">
                  Contact
                </Link>
              </li>
            </ul>
          </section>
        </section>
      </div>
      <section className="footer-copy">
        <p>&copy; 2023 | All Rights Reserved.</p>
      </section>
    </footer>
  );
};

export default Footer;
