import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [locations, setLocations] = useState([]);
  const [genders, setGenders] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    dateOfBirth: "",
    password: "",
    location: "",
    gender: "",
    pronouns: "",
    role: "640e4e0115f894ef5fbf15ae",
  });

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        // console.log(res.data);
        setLocations(
          res.data.sort((a, b) => a.name.common.localeCompare(b.name.common))
        );
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .get("/genders")
      .then((res) => {
        // console.log(res.data);
        setGenders(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleForm = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitForm = () => {
    axios
      .post("/users/register", {
        name: form.name,
        email: form.email,
        dateOfBirth: form.dateOfBirth,
        password: form.password,
        gender: form.gender,
        pronouns: form.pronouns,
        location: form.location,
        role: form.role,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/");
        window.location.reload(true);
      })
      .catch((err) => {
        console.error(err);
        console.log(err.res.data);
      });
  };

  return (
    <>
      <h2>Register</h2>
      <section className="form form-register">
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
          <label htmlFor="registerEmail" className="form-label">
            Email:
          </label>
          <input
            id="registerEmail"
            className="form-input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleForm}
          />
        </div>
        <div className="form-section">
          <label htmlFor="dateOfBirth" className="form-label">
            Date of Birth:
          </label>
          <input
            id="dob"
            className="form-input"
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleForm}
          />
        </div>
        <div className="form-section">
          <label htmlFor="registerPassword" className="form-label">
            Password:
          </label>
          <input
            id="registerPassword"
            className="form-input"
            type="password"
            name="password"
            value={form.password}
            onChange={handleForm}
          />
        </div>
        <div className="form-section">
          <label htmlFor="registerPassword" className="form-label">
            Gender:
          </label>
          <select
            id="gender"
            className="form-input"
            name="gender"
            onChange={handleForm}
          >
            <option disabled selected>
              Select an Option
            </option>
            {genders.map((data) => (
              <option key={data._id} value={data._id}>
                {data.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-section">
          <label htmlFor="pronouns" className="form-label">
            Pronouns:
          </label>
          <input
            id="pronouns"
            className="form-input"
            type="text"
            name="pronouns"
            value={form.pronouns}
            onChange={handleForm}
          />
        </div>
        <div className="form-section">
          <label htmlFor="location" className="form-label">
            Location:
          </label>
          <select
            id="location"
            className="form-input"
            name="location"
            onChange={handleForm}
          >
            <option disabled selected>
              Select an Option
            </option>
            <option value="Not Specified">Not Specified</option>
            {locations.map((data) => (
              <option key={data.name.common} value={data.name.common}>
                {data.name.common}
              </option>
            ))}
          </select>
        </div>
        <div className="form-section">
          <input
            id="role"
            className="form-input"
            type="hidden"
            name="role"
            value={form.role}
            onChange={handleForm}
          />
        </div>
        <div className="form-buttons">
          <button className="button" data-type="primary" onClick={submitForm}>
            Submit
          </button>
        </div>
      </section>
    </>
  );
};

export default RegisterForm;
