import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./AuthModule/Components/Login/Login";
import Home from "./HomeModule/Components/Home/Home";
import MasterLayout from "./SharedModule/Components/MasterLayout/MasterLayout";
import NotFound from "./SharedModule/Components/NotFound/NotFound";
import RecipesList from "./RecipesModule/Components/RecipesList/RecipesList";
import AuthLayout from "./SharedModule/Components/AuthLayout/AuthLayout";
import { useContext} from "react";
import PotectedRoute from "./SharedModule/Components/ProtectedRoute/PotectedRoute";
import ResetPass from "./AuthModule/Components/ResetPass/ResetPass";
import ResetPassRequest from "./AuthModule/Components/ResetPassRequest/ResetPassRequest";
import { ToastContainer } from "react-toastify";
import ChangePass from "./AuthModule/Components/ChangePass/ChangePass";
import FavoritesList from "./RecipesModule/Components/RecipesList/FavoritesList";
import { AuthContext } from "./Context/AuthContext";
import Registeration from "./AuthModule/Components/Registration/Registeration";
import VerifyAcount from "./AuthModule/Components/VerifyAcount/VerifyAcount";
// import VerifyAcount from "./AuthModule/Components/VerifyAcount/VerifyAcount";

function App() {
let {userData,saveUserData}=useContext(AuthContext)
  //*************Routing******************
  const routes = createBrowserRouter([
    {
      path: "dashboard",
      element: (
        <PotectedRoute userData={userData}>
          <MasterLayout userData={userData} />
        </PotectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "favorites", element:<FavoritesList /> },
        { path: "recipes", element:   <RecipesList />},
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login saveUserData={saveUserData} /> },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        { path: "registration", element: <Registeration /> },
        { path: "verify-account", element: <VerifyAcount /> },
        { path: "change-password", element: <ChangePass /> },
        { path: "reset-password", element: <ResetPass /> },
        { path: "reset-password-request", element: <ResetPassRequest /> },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
