import { useNavigate } from "react-router-dom";
import axios from "../config";

const DeleteButton = (props) => {
  const navigate = useNavigate();
  const onDelete = () => {
    let token = localStorage.getItem("token");

    axios
      .delete(`/${props.query}/${props.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        navigate("/");
        props.callback(props.id);
      })
      .catch((err) => {
        console.error(err);
        console.log(err.res.data.message);
      });
  };

  return (
    <button className="button" onClick={onDelete}>
      Delete
    </button>
  );
};

export default DeleteButton;
