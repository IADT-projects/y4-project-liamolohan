import { useState } from "react";

// Imported Stylesheets
import "../assets/css/modal.css";

// Imported Components
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";

const Modal = (props) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const tabs = [
    {
      label: "Register",
      content: <RegisterForm />,
    },
    {
      label: "Login",
      content: <LoginForm onAuthenticated={props.onAuthenticated} />,
    },
  ];

  return (
    <>
      <button className="button" data-type="primary" onClick={openModal}>
        Login / Register
      </button>

      <dialog className="modal" id="modal" open={open}>
        <button className="button" onClick={closeModal}>
          &#10005;
        </button>
        <section className="modal-wrapper">
          <ul className="nav-list">
            {tabs.map((tab, index) => (
              <li
                key={index}
                className={
                  index === activeTab ? "active tab nav-item" : "tab nav-item"
                }
                onClick={() => setActiveTab(index)}
              >
                {tab.label}
              </li>
            ))}
          </ul>
          <div>{tabs[activeTab].content}</div>
        </section>
      </dialog>
    </>
  );
};

export default Modal;
