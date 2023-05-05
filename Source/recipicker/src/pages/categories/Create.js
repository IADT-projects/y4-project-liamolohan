import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../config";

const Create = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    file: null,
    image_path: "",
  });

  const handleFileChange = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };

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
    const formData = new FormData();
    formData.append("file", form.file);

    let token = localStorage.getItem("token");

    axios
      .post(
        "/categories",
        {
          name: form.name,
          description: form.description,
          file: form.file,
          image_path: form.image_path,
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
        navigate("/categories");
      })
      .catch((err) => {
        console.error(err);
        console.log(err.res.data);
      });
  };

  return (
    <div className="wrapper">
      <form>
        <h2 className="form-heading">Create Category</h2>
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
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <input
              id="description"
              className="form-input"
              type="text"
              name="description"
              value={form.description}
              onChange={handleForm}
            />
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
