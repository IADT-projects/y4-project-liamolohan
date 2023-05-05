import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../../config";

const Index = (props) => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [bookmarks, setBookmarks] = useState(null);

  let token = localStorage.getItem("token");
  let userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.error(err);
        console.log(err.res.data.message);
      });
    axios
      .get(`/bookmarks/${id}`)
      .then((res) => {
        // console.log(res.data);
        setBookmarks(res.data);
      })
      .catch((err) => {
        console.error(err);
        console.log(err.res.data.message);
      });
  }, [token, id]);

  if (!user || !bookmarks) return <div className="wrapper">Loading...</div>;

  const bookmarksList = bookmarks.map((data) => {
    return (
      <li
        key={data._id}
        data={data}
        onAuthenticated={props.onAuthenticated}
        authenticated={props.authenticated}
      >
        <Link to={`/recipes/${data.recipeId._id}`}>{data.recipeId.name}</Link>
        <p>{data.recipeId.description}</p>
      </li>
    );
  });

  return (
    <>
      <div className="wrapper">
        {props.authenticated && userId === id ? (
          <section className="grid-span-full">
            <h2>Welcome, {user.name}</h2>
            <h3>Your Bookmarks</h3>
            <ol>{bookmarksList}</ol>
          </section>
        ) : (
          <p className="grid-span-full">Unauthorized User</p>
        )}
      </div>
    </>
  );
};

export default Index;
