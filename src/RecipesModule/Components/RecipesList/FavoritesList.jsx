import React, { useContext, useEffect, useState } from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import headerImg from "../../../assets/images/head1.png";
import { AuthContext } from "../../../Context/AuthContext";
import noData from "../../../assets/images/nodata.png";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import recipeAlt from "../../../assets/images/recipe.png";
import { ToastContext } from "../../../Context/ToastContext";
import PreLoader from "../../../SharedModule/Components/PreLoader/PreLoader";
export default function FavoritesList() {
  // ***************context******************
  const { getToastValue } = useContext(ToastContext);
  const { baseUrl, requestHeaders } = useContext(AuthContext);
   // *************preloader*******************
   const [showLoading, setShowLoading] = useState(false);
  // ************usestate******************
  const [modalState, setModalState] = useState("close");
  const [favList, setFavList] = useState([]);
  let [itemId, setItemId] = useState(0);
// ***************remove fav modal****************
const showDeleteModal = (id) => {
  setItemId(id);
  setModalState("delete-modal");
};
 
  // ********to close modal*******************
  const handleClose = () => setModalState("close");
  // ************get all fav***************
  const getAllFavorites = () => {
    setShowLoading(true);
    axios
      .get(`${baseUrl}/userRecipe/`, {
        headers: requestHeaders,
      })
      .then((response) => {
        console.log("favlist", favList);
        setFavList(response?.data?.data);
        setShowLoading(false);
      })
      .catch((error) => {
        // console.log(error?.data?.data);
        getToastValue(
          "error",
          error?.response?.data?.message ||
            "An error occurred. Please try again."
        );
        setShowLoading(false);
      });
  };
  // ************to remove from fav*********
  const removeFavorite = (favId) => {
    setShowLoading(true)
    axios
      .delete(`${baseUrl}/userRecipe/${favId}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        console.log("removefromfavlist success", response);
        setFavList(response.data.data);
        setItemId(itemId);
        handleClose();
        getToastValue(
          "success",
          response?.data?.message || "removed from favorites successfully"
        );
        setShowLoading(false)
        getAllFavorites();

      })
      .catch((error) => {
        console.log(error?.response?.data?.message);
        setShowLoading(false)
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
  return  (
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
                <img src={headerImg} className="headerImg img-fluid" alt="header" />
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
      </div>
         {/* ****************delete modal **************** */}
         <Modal show={modalState == "delete-modal"} onHide={handleClose}>
          <Modal.Header closeButton>
            <h3>delete from favorites?</h3>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <img src={noData} />
              <p>
                are you sure you want to delete this item ? if you are sure just
                click on delete it
              </p>
            </div>
            <div className="text-end">
              <button
              type="submit"
                onClick={()=>removeFavorite(itemId)}
                className={
                  "btn btn-outline-danger my-3" +
                  (showLoading ? " disabled" : "")
                }
              >
                {showLoading == true ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </Modal.Body>
        </Modal>
        {/* ****************delete modal *****************/}
      <div className="row mx-4 p-3 text-center">
       {!showLoading?   <>
        {favList?.map((fav) => (
              <div key={fav?.id} className="col-md-3  m-1">
                {/* cards */}
                <section className="articles">
                  <article>
                    <div className="article-wrapper">
                      <figure>
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
                      </figure>
                      <div className="article-body">
                        <h2>{fav?.recipe?.name}</h2>
                        <p>Description : {fav?.recipe?.description}</p>
                        <p>price : {fav?.recipe?.price}</p>
                        <p className="my-2">
                          <i
                            onClick={() => showDeleteModal(fav.id)}
                            className="fa fa-trash text-danger"
                          ></i>
                        </p>
                      </div>
                    </div>
                  </article>
                </section>
                {/* //cards */}
              </div>
            ))}
            </>:<PreLoader/>}
    
           
          
     
      </div>
    </div>
  );
}
