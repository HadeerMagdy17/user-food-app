import React, { useContext, useEffect, useState } from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import headerImg from "../../../assets/images/head1.png";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import recipeAlt from "../../../assets/images/recipe.png";
export default function FavoritesList() {
  const [favList, setFavList] = useState([]);
  const { baseUrl, requestHeaders } = useContext(AuthContext);

  const getAllFavorites = () => {
    axios
      .get(`${baseUrl}/userRecipe/`, {
        headers: requestHeaders,
      })
      .then((response) => {
        console.log("favlist",favList);
        setFavList(response.data.data);
      })
      .catch((error) => {
        console.log(error.data);
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
              <h3 className="px-4">
                <strong>Favorites items</strong>
              </h3>
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
            <h4>
              <strong>Show the Favorites !</strong>{" "}
            </h4>
            <p>
              you can now fill the meals easily using the table and form , click
              here and sill it with the table !
            </p>
          </div>
        </div>
        <div className="row mx-4 p-3 text-center">
          {favList.map((fav) => (
            
            <div key={fav?.id} className="col-md-3 border rounded m-1">
              <div>
                {fav?.recipe?.imagePath ?
                (<img className="img-fluid" src={`https://upskilling-egypt.com`+ fav?.recipe?.imagePath}/>)
                // <img src={`http://upskilling-egypt.com/+${recipe.imagePath}`}
                :
                (<img className="img-fluid" src={recipeAlt}/>)}
                
                <p>description:{fav?.recipe?.description}</p>
                <p>price:{fav?.recipe?.price}</p>
              </div>
            </div>
          ))}


        </div>
      </div>
    </div>
  );
}










