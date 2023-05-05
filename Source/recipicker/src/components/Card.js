import { Link } from "react-router-dom";

// Import Stylesheets
import "../assets/css/card.css";

const Card = (props) => {
  return (
    <section className="card">
      <img
        className="card-img"
        src={
          "https://recipicker-s3.s3.eu-west-1.amazonaws.com/" +
          props.data.image_path
        }
        alt="Finished Meal"
      />
      <div className="card-content">
        <Link className="card-link" to={`/${props.query}/${props.data._id}`}>
          <h3 className="card-title">{props.data.name}</h3>
        </Link>
        <p className="card-desc">{props.data.description}</p>
      </div>
    </section>
  );
};

export default Card;
