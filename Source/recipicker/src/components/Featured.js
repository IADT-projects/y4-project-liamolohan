import { Link } from "react-router-dom";

import clockSVG from "../assets/svg/clock.svg";
import personSVG from "../assets/svg/person.svg";

// Import Stylesheet
import "../assets/css/featured.css";

const Featured = (props) => {
  return (
    <section className="featured" data-type="primary">
      <div className="wrapper">
        <img
          className="featured-image"
          src={
            "https://recipicker-s3.s3.eu-west-1.amazonaws.com/" +
            props.data.image_path
          }
          alt="Featured Recipe"
        />
        <section className="featured-content">
          <header className="featured-header">
            <div className="recipe-details">
              <p className="details-amount">
                <img src={personSVG} alt="person icon" />

                {props.data.servingSize === 1 ? (
                  <span>{props.data.servingSize} Person</span>
                ) : (
                  <span>{props.data.servingSize} People</span>
                )}
              </p>
              <p className="details-time">
                <img src={clockSVG} alt="clock icon" />
                {props.data.totalTime} Minutes
              </p>
            </div>
            <h2 className="featured-title">{props.data.name}</h2>
            <p className="featured-author">By: {props.data.author.name}</p>
          </header>
          <p className="featured-desc">{props.data.description}</p>
          <Link
            className="button"
            data-type="secondary"
            to={`/recipes/${props.data._id}`}
          >
            View
          </Link>
        </section>
      </div>
    </section>
  );
};

export default Featured;
