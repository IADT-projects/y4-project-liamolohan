import { Link } from "react-router-dom";

// Imported Stylesheets
import "../assets/css/navbar.css";

const Navbar = () => {
  return (
    <>
      <nav className="primary-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/categories" className="nav-link">
              Categories
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/recipes" className="nav-link">
              Recipes
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
