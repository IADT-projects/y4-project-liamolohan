import { useState } from "react";
import axios from "../config";

const LoginForm = (props) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

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
      .post("/users/login", {
        email: form.email,
        password: form.password,
      })
      .then((res) => {
        // console.log(res.data);
        props.onAuthenticated(
          true,
          res.data.token,
          res.data.userId,
          res.data.userRole
        );
      })
      .catch((err) => {
        console.error(err);
        console.log(err.res.data);
      });
  };

  return (
    <>
      <section className="form form-login">
        <h2>Login</h2>
        <div className="form-section">
          <label htmlFor="loginEmail" className="form-label">
            Email:
          </label>
          <input
            id="loginEmail"
            className="form-input"
            type="text"
            name="email"
            value={form.email}
            onChange={handleForm}
          />
        </div>
        <div className="form-section">
          <label htmlFor="loginPassword" className="form-label">
            Password:
          </label>
          <input
            id="loginPassword"
            className="form-input"
            type="password"
            name="password"
            value={form.password}
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

export default LoginForm;
