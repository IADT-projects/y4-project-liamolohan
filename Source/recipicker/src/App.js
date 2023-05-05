import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// Imported Stylesheets
import "./assets/css/app.css";

// Imported Pages
import Home from "./pages/Index";
import Categories from "./pages/categories/Index";
import CategoryShow from "./pages/categories/Show";
import CategoryCreate from "./pages/categories/Create";
import Recipes from "./pages/recipes/Index";
import RecipeShow from "./pages/recipes/Show";
import RecipeCreate from "./pages/recipes/Create";
import RecipeEdit from "./pages/recipes/Edit";
import IngredientCreate from "./pages/ingredients/Create";
import Account from "./pages/account/index";
import PageNotFound from "./pages/PageNotFound";

// Imported Components
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  let protectedRoutes;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuthenticated(true);
    }
  }, []);

  const onAuthenticated = (auth, token, userId, userRole) => {
    setAuthenticated(auth);

    if (auth) {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userRole", userRole);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userRole");
    }
  };

  if (authenticated) {
    protectedRoutes = (
      <>
        <Route path="/recipes/create" element={<RecipeCreate />} />
        <Route path="/recipes/:id/edit" element={<RecipeEdit />} />
        <Route path="/categories/create" element={<CategoryCreate />} />
        <Route path="/ingredients/create" element={<IngredientCreate />} />
      </>
    );
  }

  return (
    <Router>
      <Header onAuthenticated={onAuthenticated} authenticated={authenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/categories"
          element={
            <Categories
              onAuthenticated={onAuthenticated}
              authenticated={authenticated}
            />
          }
        />
        <Route
          path="/categories/:id"
          element={
            <CategoryShow
              onAuthenticated={onAuthenticated}
              authenticated={authenticated}
            />
          }
        />
        <Route
          path="/recipes"
          element={
            <Recipes
              onAuthenticated={onAuthenticated}
              authenticated={authenticated}
            />
          }
        />
        <Route
          path="/recipes/:id"
          element={
            <RecipeShow
              onAuthenticated={onAuthenticated}
              authenticated={authenticated}
            />
          }
        />
        <Route
          path="/account/:id"
          element={
            <Account
              onAuthenticated={onAuthenticated}
              authenticated={authenticated}
            />
          }
        />
        {protectedRoutes}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
