import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../config";

const Create = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    brand: "",
    per: "",
    calories: "",
    energy: "",
    fat: "",
    saturates: "",
    carbohydrates: "",
    sugars: "",
    salt: "",
    fibre: "",
    protein: "",
    measurements: "",
  });

  const handleForm = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();

    let token = localStorage.getItem("token");

    axios
      .post(
        "/ingredients",
        {
          name: form.name,
          brand: form.brand,
          per: form.per,
          calories: form.calories,
          energy: form.energy,
          fat: form.fat,
          saturates: form.saturates,
          carbohydrates: form.carbohydrates,
          sugars: form.sugars,
          salt: form.salt,
          fibre: form.fibre,
          protein: form.protein,
          measurements: form.measurements,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        navigate("/recipes");
      })
      .catch((err) => {
        console.error(err);
        console.log(err.res.data);
      });
  };

  return (
    <div className="wrapper">
      <form>
        <h2 className="form-heading">Create Ingredient</h2>
        <section className="form form-create pd-block-md">
          <div className="form-section">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              id="name"
              className="form-input"
              type="text"
              name="name"
              value={form.name}
              onChange={handleForm}
            />
          </div>
          <div className="form-section">
            <label htmlFor="brand" className="form-label">
              Brand:
            </label>
            <input
              id="brand"
              className="form-input"
              type="text"
              name="brand"
              value={form.brand}
              onChange={handleForm}
            />
          </div>
          <div className="form-section">
            <label htmlFor="brand" className="form-label">
              Per: (g)
            </label>
            <input
              id="per"
              className="form-input"
              type="text"
              name="per"
              value={form.per}
              onChange={handleForm}
            />
          </div>
          <div className="form-section">
            <label htmlFor="calories" className="form-label">
              Calories:
            </label>
            <input
              id="calories"
              className="form-input"
              type="text"
              name="calories"
              value={form.calories}
              onChange={handleForm}
            />
          </div>
          <div className="form-section">
            <label htmlFor="energy" className="form-label">
              Energy: (kcal)
            </label>
            <input
              id="energy"
              className="form-input"
              type="text"
              name="energy"
              value={form.energy}
              onChange={handleForm}
            />
          </div>
          <div className="form-section">
            <label htmlFor="fat" className="form-label">
              Fat: (g)
            </label>
            <input
              id="fat"
              className="form-input"
              type="text"
              name="fat"
              value={form.fat}
              onChange={handleForm}
            />
          </div>
          <div className="form-section">
            <label htmlFor="saturates" className="form-label">
              Saturates: (g)
            </label>
            <input
              id="saturates"
              className="form-input"
              type="text"
              name="saturates"
              value={form.saturates}
              onChange={handleForm}
            />
          </div>
          <div className="form-section">
            <label htmlFor="carbohydrates" className="form-label">
              Carbohydrates: (g)
            </label>
            <input
              id="carbohydrates"
              className="form-input"
              type="text"
              name="carbohydrates"
              value={form.carbohydrates}
              onChange={handleForm}
            />
          </div>
          <div className="form-section">
            <label htmlFor="sugars" className="form-label">
              Sugars: (g)
            </label>
            <input
              id="sugars"
              className="form-input"
              type="text"
              name="sugars"
              value={form.sugars}
              onChange={handleForm}
            />
          </div>
          <div className="form-section">
            <label htmlFor="fibre" className="form-label">
              Fibre: (g)
            </label>
            <input
              id="fibre"
              className="form-input"
              type="text"
              name="fibre"
              value={form.fibre}
              onChange={handleForm}
            />
          </div>
          <div className="form-section">
            <label htmlFor="protein" className="form-label">
              Protein: (g)
            </label>
            <input
              id="protein"
              className="form-input"
              type="text"
              name="protein"
              value={form.protein}
              onChange={handleForm}
            />
          </div>
          <div className="form-section">
            <label htmlFor="salt" className="form-label">
              Salt: (g)
            </label>
            <input
              id="salt"
              className="form-input"
              type="text"
              name="salt"
              value={form.salt}
              onChange={handleForm}
            />
          </div>

          <div className="form-buttons">
            <button className="button" data-type="primary" onClick={submitForm}>
              Submit
            </button>
            <Link to={`/categories`} className="button">
              Cancel
            </Link>
          </div>
        </section>
      </form>
    </div>
  );
};

export default Create;
