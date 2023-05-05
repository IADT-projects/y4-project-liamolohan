import DeleteButton from "./DeleteButton";

// Import Stylesheets
import "../assets/css/comment.css";

const Comment = (props) => {
  let userId = localStorage.getItem("userId");
  let userRole = localStorage.getItem("userRole");

  return (
    <fieldset className="comment">
      <legend className="comment-author">
        {props.data.author.name}
        {(props.authenticated && props.data.author._id === userId) ||
        (props.authenticated && userRole === "640d002ab551cf397c59abab") ? (
          <DeleteButton
            id={props.id}
            query="comments"
            callback={props.callback}
          />
        ) : (
          ""
        )}
      </legend>
      <p className="comment-text">{props.data.comment}</p>
    </fieldset>
  );
};

export default Comment;
