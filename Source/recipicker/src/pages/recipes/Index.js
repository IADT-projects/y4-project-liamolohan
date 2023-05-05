import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../config";

// Imported Components
import SectionHeading from "../../components/SectionHeading";
import Card from "../../components/Card";

const Recipes = (props) => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState(null);

  let userRole = localStorage.getItem("userRole");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    axios
      .get(`/recipes/search?q=${query}`)
      .then((res) => {
        setRecipes(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    axios
      .get("/recipes")
      .then((res) => {
        // console.log(res.data);
        setRecipes(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (!recipes) return <div className="wrapper">Loading...</div>;

  const deleteCallback = (id) => {
    let recipesNew = recipes.filter((recipe) => {
      return recipes._id !== id;
    });

    setRecipes(recipesNew);
  };

  const recipesList = recipes.map((data) => {
    return (
      <Card
        key={data._id}
        data={data}
        query="recipes"
        onAuthenticated={props.onAuthenticated}
        authenticated={props.authenticated}
        callback={deleteCallback}
      />
    );
  });

  return (
    <>
      <SectionHeading
        title="Recipes"
        desc="Find an amazing recipe from the list below!"
      />
      <section className="wrapper pd-block-md">
        <input
          className="form-input"
          type="text"
          value={query}
          onChange={handleInputChange}
        />
        <button className="button" data-type="primary" onClick={handleSearch}>
          Search
        </button>
      </section>
      <section className="wrapper pd-block-md">
        <div className="grid-span-full control-buttons">
          {props.authenticated ? (
            <Link to="/recipes/create" className="button" data-type="primary">
              Create Recipe
            </Link>
          ) : (
            ""
          )}
          {props.authenticated && userRole === "640d002ab551cf397c59abab" ? (
            <Link
              to="/ingredients/create"
              className="button"
              data-type="primary"
            >
              Add Ingredient
            </Link>
          ) : (
            ""
          )}
        </div>
      </section>
      <div className="wrapper pd-block-md">{recipesList}</div>
    </>
  );
};

export default Recipes;
