import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../config";

// Imported Components
import SectionHeading from "../../components/SectionHeading";
import Card from "../../components/Card";

const Categories = (props) => {
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState(null);

  let userRole = localStorage.getItem("userRole");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    axios
      .get(`/categories/search?q=${query}`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    axios
      .get("/categories")
      .then((res) => {
        // console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (!categories) return <div className="wrapper">Loading...</div>;

  const categoriesList = categories.map((data) => {
    return (
      <Card
        key={data._id}
        data={data}
        query="categories"
        onAuthenticated={props.onAuthenticated}
        authenticated={props.authenticated}
      />
    );
  });

  return (
    <>
      <SectionHeading title="Categories" desc="Choose a Category" />
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
          {props.authenticated && userRole === "640d002ab551cf397c59abab" ? (
            <Link
              to="/categories/create"
              className="button"
              data-type="primary"
            >
              Create
            </Link>
          ) : (
            ""
          )}
        </div>
      </section>
      <div className="wrapper pd-block-md">{categoriesList}</div>
    </>
  );
};

export default Categories;
