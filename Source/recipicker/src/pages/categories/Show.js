import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../config";

// Import Component
import SectionHeading from "../../components/SectionHeading";
import Card from "../../components/Card";

const Show = (props) => {
  const { id } = useParams();
  const [recipes, setRecipes] = useState(null);
  const [category, setCategory] = useState(null);

  let token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`/recipes/category/${id}`)
      .then((res) => {
        // console.log(res.data);
        setRecipes(res.data);
      })
      .catch((err) => {
        console.error(err);
        console.log(err.res.data.message);
      });
    axios
      .get(`/categories/${id}`)
      .then((res) => {
        // console.log(res.data);
        setCategory(res.data);
      })
      .catch((err) => {
        console.error(err);
        console.log(err.res.data.message);
      });
  }, [token, id]);

  if (!recipes || !category)
    return (
      <div className="wrapper">
        <p className="grid-span-full">No Recipes Found.</p>
      </div>
    );

  const recipesList = recipes.map((data) => {
    return (
      <Card
        key={data._id}
        data={data}
        query="recipes"
        onAuthenticated={props.onAuthenticated}
        authenticated={props.authenticated}
      />
    );
  });

  return (
    <>
      <SectionHeading title={category.name} desc={category.description} />
      <div className="wrapper pd-block-md">{recipesList}</div>
    </>
  );
};

export default Show;
