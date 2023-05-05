import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PageNotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="wrapper">
      <h2 className="grid-span-full">Page not found: {location.pathname}</h2>
      <p className="grid-span-full">Redirecting you to Home</p>
    </div>
  );
};

export default PageNotFound;
