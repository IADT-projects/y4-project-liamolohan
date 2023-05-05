// Import Stylesheets
import "../assets/css/hamburger.css";

const Hamburger = () => {
  return (
    <button
      className="hamburger-menu"
      aria-controls="primary-navigation"
      aria-expanded="false"
    >
      <svg
        className="hamburger"
        viewBox="0 0 100 100"
        width="50"
        fill="var(--button-color)"
      >
        <rect
          className="line top"
          width="80"
          height="10"
          x="10"
          y="25"
          rx="5"
        ></rect>

        <rect
          className="line middle"
          width="80"
          height="10"
          x="10"
          y="45"
          rx="5"
        ></rect>
        <rect
          className="line bottom"
          width="80"
          height="10"
          x="10"
          y="65"
          rx="5"
        ></rect>
      </svg>
    </button>
  );
};

export default Hamburger;
