import { useState, useEffect } from "react";
import axios from "../config";

// Imported Components
import Hero from "../components/Hero";
import Featured from "../components/Featured";
import SectionHeading from "../components/SectionHeading";
import Card from "../components/Card";

const Home = (props) => {
  const [recipes, setRecipes] = useState(null);
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    axios
      .get("/recipes/recent")
      .then((res) => {
        // console.log(res.data);
        setRecipes(
          res.data.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        );
      })
      .catch((err) => {
        console.error(err);
      });
    axios
      .get("/recipes/featured")
      .then((res) => {
        // console.log(res.data);
        setFeatured(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (!recipes || !featured) return <div className="wrapper">Loading...</div>;

  const featuredList = featured.map((data) => {
    return (
      <>
        <Featured
          key={data._id}
          data={data}
          query="recipes"
          onAuthenticated={props.onAuthenticated}
          authenticated={props.authenticated}
        />
      </>
    );
  });

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
      <Hero />
      {featuredList}
      <SectionHeading
        title="Most Recent"
        desc="Check out the newest recipes on reciPicker"
      />
      <div className="wrapper pd-block-md">{recipesList}</div>
    </>
  );
};

export default Home;
