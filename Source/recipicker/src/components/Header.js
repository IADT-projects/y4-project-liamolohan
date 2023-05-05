import { Link, useNavigate } from "react-router-dom";

// Imported Stylesheets
import "../assets/css/header.css";

// Imported Components
import Navbar from "./Navbar";
import Modal from "./Modal";

// Import SVG
import logoutSVG from "../assets/svg/logout.svg";
import accountSVG from "../assets/svg/account.svg";

const Header = (props) => {
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const logout = () => {
    props.onAuthenticated(false);
    navigate("/");
  };

  return (
    <header className="wrapper primary-header">
      <h2 className="site-name">reciPicker</h2>
      <Navbar />
      {props.authenticated ? (
        <>
          <section className="header-buttons">
            <Link
              to={`/account/${userId}`}
              className="button"
              data-type="primary"
            >
              <img src={accountSVG} alt="account button" />
            </Link>
            <Link
              to="/"
              className="button"
              data-type="primary"
              onClick={logout}
            >
              <img src={logoutSVG} alt="logout button" />
            </Link>
          </section>
        </>
      ) : (
        <Modal onAuthenticated={props.onAuthenticated} />
      )}
    </header>
  );
};

export default Header;
