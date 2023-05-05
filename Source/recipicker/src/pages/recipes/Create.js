import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../config";

const Create = () => {
  const navigate = useNavigate();
  let userId = localStorage.getItem("userId");
  const [categories, setCategories] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [instructionValues, setInstructionValues] = useState([""]);
  const [instructionCount, setInstructionCount] = useState(1);
  const [form, setForm] = useState({
    author: userId,
    name: "",
    description: "",
    category: "",
    difficulty: "",
    cookingTime: "",
    prepTime: "",
    totalTime: "",
    servingSize: "",
    file: null,
    image_path: "",
    ingredients: [],
    instructions: [],
    // rating: "",
    isFeatured: false,
  });

  const handleSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setForm({ ...form, ingredients: selectedOptions });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };

  const handleInstructionChange = (e, i) => {
    const newInstructionValues = [...instructionValues];
    newInstructionValues[i] = e.target.value;
    setInstructionValues(newInstructionValues);
    setForm({ ...form, instructions: instructionValues });
  };

  const handleForm = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addInstruction = (e) => {
    e.preventDefault();
    setInstructionCount(instructionCount + 1);
    setInstructionValues([...instructionValues, ""]);
  };

  const removeInstruction = (e) => {
    e.preventDefault();
    setInstructionCount(instructionCount - 1);
    setInstructionValues(instructionValues.slice(0, -1));
  };

  const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", form.file);

    let token = localStorage.getItem("token");

    axios
      .post(
        "/recipes",
        {
          author: form.author,
          name: form.name,
          description: form.description,
          category: form.category,
          difficulty: form.difficulty,
          cookingTime: form.cookingTime,
          prepTime: form.prepTime,
          totalTime: form.totalTime,
          servingSize: form.servingSize,
          file: form.file,
          image_path: form.image_path,
          ingredients: form.ingredients,
          instructions: form.instructions,
          // rating: form.rating,
          isFeatured: form.isFeatured,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
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

  useEffect(() => {
    axios
      .get("/categories")
      .then((res) => {
        // console.log(res.data);
        setCategories(res.data.sort((a, b) => a.name.localeCompare(b.name)));
      })
      .catch((err) => {
        console.error(err);
      });
    axios
      .get("/difficulties")
      .then((res) => {
        // console.log(res.data);
        setDifficulties(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    axios
      .get("/ingredients")
      .then((res) => {
        // console.log(res.data);
        setIngredients(res.data.sort((a, b) => a.name.localeCompare(b.name)));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="wrapper">
      <form>
        <h2 className="form-heading">Create Recipe</h2>
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
              onChange={handleForm}
            />
          </div>
          <div className="form-section">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <textarea
              id="description"
              className="form-input"
              name="description"
              onChange={handleForm}
            />
          </div>
          <div className="form-section">
            <label htmlFor="description" className="form-label">
              Category:
            </label>
            <select
              id="category"
              className="form-input"
              name="category"
              onChange={handleForm}
            >
              <option disabled selected>
                Select a Category
              </option>
              {categories.map((data) => (
                <option key={data._id} value={data._id}>
                  {data.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-section">
            <label htmlFor="difficulty" className="form-label">
              Difficulty:
            </label>
            <select
              id="difficulty"
              className="form-input"
              name="difficulty"
              onChange={handleForm}
            >
              <option disabled selected>
                Select a Difficulty
              </option>
              {difficulties.map((data) => (
                <option key={data._id} value={data._id}>
                  {data.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-section">
            <label htmlFor="prep-time" className="form-label">
              Preparation Time:
            </label>
            <input
              id="prep-time"
              className="form-input"
              type="text"
              name="prepTime"
              onChange={handleForm}
            />
          </div>
          <div className="form-section">
            <label htmlFor="cooking-time" className="form-label">
              Cooking Time:
            </label>
            <input
              id="cooking-time"
              className="form-input"
              type="text"
              name="cookingTime"
              onChange={handleForm}
            />
          </div>
          <div className="form-section">
            <label htmlFor="total-time" className="form-label">
              Total Time:
            </label>
            <input
              id="total-time"
              className="form-input"
              type="text"
              name="totalTime"
              value={
                (form.totalTime =
                  Number(form.prepTime) + Number(form.cookingTime))
              }
              onChange={handleForm}
            />
          </div>
          <div className="form-section">
            <label htmlFor="serving-size" className="form-label">
              Serving Size:
            </label>
            <input
              id="serving-size"
              className="form-input"
              type="text"
              name="servingSize"
              onChange={handleForm}
            />
          </div>
          <div className="form-section">
            <section className="form-section-header">
              <label htmlFor="instructions" className="form-label">
                Instructions:
              </label>
              <button className="button" onClick={addInstruction}>
                &#10010;
              </button>
              <button
                className="button"
                onClick={removeInstruction}
                disabled={instructionCount === 1}
              >
                &#10006;
              </button>
            </section>
            {instructionValues.map((value, i) => (
              <textarea
                key={`input-${i}`}
                className="form-input"
                value={value}
                onChange={(e) => handleInstructionChange(e, i)}
              />
            ))}
          </div>

          <div className="form-section">
            <label htmlFor="file" className="form-label">
              Images:
            </label>
            <input
              id="file"
              className="form-input"
              type="file"
              name="file"
              onChange={handleFileChange}
            />
          </div>
          <div className="form-section">
            <input
              id="isFeatured"
              className="form-input"
              type="hidden"
              name="isFeatured"
              onChange={handleForm}
            />
          </div>
          <div className="form-section">
            <input
              id="author"
              className="form-input"
              type="hidden"
              name="author"
              value={form.author}
              onChange={handleForm}
            />
          </div>
          <div className="form-section-ingredients">
            <label htmlFor="ingredients" className="form-label">
              Ingredients:
            </label>
            <select
              id="ingredients"
              className="form-input"
              name="ingredients"
              onChange={handleSelectChange}
              multiple
            >
              <option disabled selected>
                Select your Ingredients
              </option>
              {ingredients.map((data) => (
                <option key={data._id} value={data._id}>
                  {data.name} | {data.brand}
                </option>
              ))}
            </select>
          </div>
          <div className="form-buttons">
            <button className="button" data-type="primary" onClick={submitForm}>
              Submit
            </button>
            <Link to={`/recipes`} className="button">
              Cancel
            </Link>
          </div>
        </section>
      </form>
    </div>
  );
};

export default Create;
