import React, { useContext, useEffect, useState } from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import headerImg from "../../../assets/images/head1.png";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import recipeAlt from "../../../assets/images/recipe.png";
import { ToastContext } from "../../../Context/ToastContext";
export default function FavoritesList() {
  // ***************context******************
  const { getToastValue } = useContext(ToastContext);
  const { baseUrl, requestHeaders } = useContext(AuthContext);
  // ************usestate******************
  const [favList, setFavList] = useState([]);
  let [itemId, setItemId] = useState(0);
  // ************get all fav***************
  const getAllFavorites = () => {
    axios
      .get(`${baseUrl}/userRecipe/`, {
        headers: requestHeaders,
      })
      .then((response) => {
        console.log("favlist", favList);
        setFavList(response?.data?.data);
      })
      .catch((error) => {
        console.log(error?.data?.data);
      });
  };
  // ************to remove from fav*********
  const removeFavorite = (favId) => {
    axios
      .delete(`${baseUrl}/userRecipe/${favId}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        console.log("removefromfavlist success", response);
        setFavList(response.data.data);
        setItemId(itemId);
        getAllFavorites();
        getToastValue(
          "success",
          response?.data?.message || "removed from favorites successfully"
        );
      })
      .catch((error) => {
        console.log(error.data);
        getToastValue(
          "error",
          error?.response?.data?.message ||
            "An error occurred. Please try again."
        );
      });
  };
  useEffect(() => {
    getAllFavorites();
  }, []);
  return (
    <div>
      <Header>
        <div className="header-content text-white rounded">
          <div className="row align-items-center  mx-2 px-3">
            <div className="col-md-9">
              <h3 className="px-4">Favorites items</h3>
              <p className="w-75 px-4">
                This is a welcoming screen for the entry of the application ,
                you can now see the options
              </p>
            </div>
            <div className="col-md-3">
              <div>
                <img src={headerImg} className="img-fluid" alt="header" />
              </div>
            </div>
          </div>
        </div>
      </Header>
      <div className="row home-sec  rounded-2 m-4 p-4 align-items-center">
        <div className="col-md-6">
          <div>
            <h4>Show the Favorites !</h4>
            <p>
              you can now fill the meals easily using the table and form , click
              here and sill it with the table !
            </p>
          </div>
        </div>
        <div className="row mx-4 p-3 text-center">
          {favList?.map((fav) => (
            <div key={fav?.id} className="col-md-3 border rounded m-1">
              <div>
                {fav?.recipe?.imagePath ? (
                  <div className="h-25">
                    <img
                      className="w-75 mb-2"
                      src={`https://upskilling-egypt.com/${fav?.recipe?.imagePath}`}
                    />
                  </div>
                ) : (
                  <img className="w-75  mb-2" src={recipeAlt} />
                )}

                <p>Name : {fav?.recipe?.name}</p>
                <p>Description : {fav?.recipe?.description}</p>
                <p>price : {fav?.recipe?.price}</p>
                <p>
                  Remove from favourite <br />
                  <i
                    onClick={() => removeFavorite(fav.id)}
                    className="fa fa-heart text-danger"
                  ></i>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
