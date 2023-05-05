import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "../../config";

// Import Components
import DeleteButton from "../../components/DeleteButton";
import Comment from "../../components/Comment";

// Import SVG
import clockSVG from "../../assets/svg/clock.svg";
import personSVG from "../../assets/svg/person.svg";

// Import Stylesheet
import "../../assets/css/recipeShow.css";
import placeholder from "../../assets/images/accent-color-square.jpg";

const Show = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [recipe, setRecipe] = useState();
  const [comments, setComments] = useState([]);

  let token = localStorage.getItem("token");
  let userId = localStorage.getItem("userId");

  const [form, setForm] = useState({
    author: userId,
    recipeId: id,
  });

  const [commentForm, setCommentForm] = useState({
    author: userId,
    recipeId: id,
    comment: "",
  });

  useEffect(() => {
    axios
      .get(`/recipes/${id}`)
      .then((res) => {
        // console.log(res.data);
        setRecipe(res.data);
      })
      .catch((err) => {
        console.error(err);
        console.log(err.res.data.message);
      });
    axios
      .get(`/comments/${id}`)
      .then((res) => {
        // console.log(res.data);
        setComments(res.data);
      })
      .catch((err) => {
        console.error(err);
        console.log(err.res.data.message);
      });
  }, [token, id]);

  const handleForm = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCommentForm = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setCommentForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();

    axios
      .post(
        "/bookmarks",
        {
          userId: form.author,
          recipeId: form.recipeId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        navigate(0);
      })
      .catch((err) => {
        console.error(err);
        console.log(err.res.data);
      });
  };

  const submitCommentForm = (e) => {
    e.preventDefault();

    axios
      .post(
        "/comments",
        {
          author: commentForm.author,
          recipeId: commentForm.recipeId,
          comment: commentForm.comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        navigate(0);
      })
      .catch((err) => {
        console.error(err);
        console.log(err.res.data);
      });
  };

  if (!recipe || !comments) return <div className="wrapper">Loading...</div>;

  const deleteCommentCallback = (id) => {
    let commentsNew = comments.filter((comment) => {
      return comments.recipeId !== id;
    });

    setComments(commentsNew);
  };

  const totalNutrient = (nutrient) =>
    recipe.ingredients.reduce(
      (acc, ingredient) => acc + ingredient[nutrient],
      0
    );

  return (
    <>
      <section className="hero" data-type="secondary">
        <div className="wrapper">
          <div className="image-wrapper">
            <img
              className="hero-image"
              src={recipe.image_path}
              alt="fully prepared recipe"
            />
            <img
              className="hero-image"
              src={placeholder}
              alt="fully prepared recipe"
            />
          </div>
          <div className="hero-content">
            <div className="recipe-show-details">
              <p className="recipe-details-amount">
                <img src={personSVG} alt="person icon" />

                {recipe.servingSize === 1 ? (
                  <span>{recipe.servingSize} Person</span>
                ) : (
                  <span>{recipe.servingSize} People</span>
                )}
              </p>
              <p className="recipe-details-time">
                <img src={clockSVG} alt="clock icon" />
                <span className="fw-med">Prep:</span> {recipe.prepTime} Minutes
              </p>
              <p className="recipe-details-time">
                <span className="fw-med">Cooking:</span> {recipe.cookingTime}{" "}
                Minutes
              </p>
              <p className="recipe-details-time">
                <span className="fw-med accent">Total:</span>
                {recipe.totalTime} Minutes
              </p>
            </div>
            <span className="hero-heading">
              <h2 className="hero-title">{recipe.name}</h2>
              <p className="hero-author">by: {recipe.author.name}</p>
            </span>
            <p>{recipe.description}</p>
            <span>
              <input
                type="hidden"
                name="author"
                value={form.author}
                onChange={handleForm}
              />
              <input
                type="hidden"
                name="recipe"
                value={form.recipeId}
                onChange={handleForm}
              />
              {props.authenticated ? (
                <button
                  className="button"
                  data-type="primary"
                  onClick={submitForm}
                >
                  Save
                </button>
              ) : (
                ""
              )}

              {props.authenticated && userId === recipe.author._id ? (
                <>
                  <Link className="pd-l-1" to={`/recipes/${recipe._id}/edit`}>
                    <button className="button" data-type="secondary">
                      Edit
                    </button>
                  </Link>
                  <DeleteButton
                    id={recipe._id}
                    query="recipes"
                    callback={props.callback}
                  />
                </>
              ) : (
                ""
              )}
            </span>
          </div>
        </div>
      </section>

      <section className="wrapper">
        <section className="ingredients">
          <h2 className="instructions-heading">Ingredients</h2>
          <ul className="ingredients-list">
            {recipe.ingredients.map((data) => (
              <li className="ingredients-item" key={data._id} value={data._id}>
                <details>
                  <summary>{data.name}</summary>
                  <p>Brand: {data.brand}</p>
                  <p>Per: {data.per}g</p>
                  <ul>
                    <li>Calories: {data.calories}</li>
                    <li>Energy: {data.energy.toFixed(2)}kcal</li>
                    <li>Fat: {data.fat}g</li>
                    <li>Saturates: {data.saturates}g</li>
                    <li>Carbohydrates: {data.carbohydrates}g</li>
                    <li>Sugars: {data.sugars}g</li>
                    <li>Salt: {data.salt}g</li>
                    <li>Fibre: {data.fibres}g</li>
                    <li>Protein: {data.protein}g</li>
                  </ul>
                </details>
              </li>
            ))}
          </ul>
        </section>

        <section className="instructions">
          <h2 className="instructions-heading">Instructions</h2>
          <ul className="instructions-list">
            {recipe.instructions.map((data) => (
              <li className="ingredients-item" key={data._id} value={data._id}>
                {data}
              </li>
            ))}
          </ul>
        </section>
      </section>

      <section className="wrapper">
        <div className="nutritional-information grid-span-full pd-block-md">
          <h2 className="nutritional-information-heading">
            Nutritional Information
          </h2>
          <p>Total for all ingredients (per 100g), meal may vary.</p>
          <section className="nutritional-information-flex pd-block-md">
            <fieldset className="nutritional-information-content">
              <legend>Calories</legend>
              <p>{totalNutrient("calories")}</p>
            </fieldset>

            <fieldset className="nutritional-information-content">
              <legend>Energy</legend>
              <p>{totalNutrient("energy")}kcal</p>
            </fieldset>
            <fieldset className="nutritional-information-content">
              <legend>Fat</legend>
              <p>{totalNutrient("fat").toFixed(2)}g</p>
            </fieldset>
            <fieldset className="nutritional-information-content">
              <legend>Saturates</legend>
              <p>{totalNutrient("saturates").toFixed(2)}g</p>
            </fieldset>
            <fieldset className="nutritional-information-content">
              <legend>Carbs</legend>
              <p>{totalNutrient("carbohydrates").toFixed(2)}g</p>
            </fieldset>
            <fieldset className="nutritional-information-content">
              <legend>Sugars</legend>
              <p>{totalNutrient("sugars").toFixed(2)}g</p>
            </fieldset>
            <fieldset className="nutritional-information-content">
              <legend>Salt</legend>
              <p>{totalNutrient("salt").toFixed(2)}g</p>
            </fieldset>
            <fieldset className="nutritional-information-content">
              <legend>Fibre</legend>
              <p>{totalNutrient("fibre").toFixed(2)}g</p>
            </fieldset>
            <fieldset className="nutritional-information-content">
              <legend>Protein</legend>
              <p>{totalNutrient("protein").toFixed(2)}g</p>
            </fieldset>
          </section>
        </div>
      </section>

      <section className="wrapper">
        <div className="form-comments pd-block-md">
          <form className="form">
            <div className="form-section">
              <h2 className="comments-heading">Comments</h2>
              <input
                id="recipeId"
                className="form-input"
                type="hidden"
                name="recipeId"
                value={id}
                onChange={handleCommentForm}
              />
            </div>
            <div className="form-section">
              <input
                id="author"
                className="form-input"
                type="hidden"
                name="author"
                value={commentForm.author}
                onChange={handleCommentForm}
              />
            </div>
            <div className="form-section">
              {props.authenticated ? (
                <>
                  <textarea
                    id="comment"
                    className="form-input"
                    type="text"
                    name="comment"
                    value={commentForm.comment}
                    onChange={handleCommentForm}
                  />
                  <div className="form-buttons">
                    <button
                      className="button"
                      data-type="primary"
                      onClick={submitCommentForm}
                    >
                      Submit
                    </button>
                  </div>
                </>
              ) : (
                <textarea
                  className="form-input"
                  value="Log in to comment."
                  disabled
                />
              )}
            </div>
          </form>

          <div className="grid-span-full pd-block-m">
            {comments ? (
              <>
                {comments.map((data) => (
                  <Comment
                    id={data._id}
                    key={data._id}
                    data={data}
                    onAuthenticated={props.onAuthenticated}
                    authenticated={props.authenticated}
                    callback={deleteCommentCallback}
                  />
                ))}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Show;
