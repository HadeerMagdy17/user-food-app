import React, { useEffect, useState, useContext } from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import headerImg from "../../../assets/images/head1.png";
import NoData from "../../../SharedModule/Components/NoData/NoData";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import noData from "../../../assets/images/nodata.png";
import recipeAlt from "../../../assets/images/recipe.png";
import Pagination from "react-bootstrap/Pagination";
import PreLoader from "../../../SharedModule/Components/PreLoader/PreLoader";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { AuthContext } from "../../../Context/AuthContext";
import { ToastContext } from "../../../Context/ToastContext";

export default function RecipesList() {
  // **************context********************
  const { requestHeaders, baseUrl } = useContext(AuthContext);
  const { getToastValue } = useContext(ToastContext);
  // *************preloader*******************
  const [showLoading, setShowLoading] = useState(false);
  // ***********pagination***************
  const [pagesArray, setPagesArray] = useState([]);
  //  ***************************************
  let [recipesList, setRecipesList] = useState([]);
  let [itemId, setItemId] = useState(0);
  let [categoriesList, setCategoriesList] = useState([]);
  let [tagList, setTagList] = useState([]);
  let [recipeDetails, setRecipeDetails] = useState({});
  // *************filtration**************
  let [searchString, setSearchString] = useState("");
  let [selectedTagId, setSelectedTagId] = useState(0);
  let [selectedCategoryId, setSelectedCategoryId] = useState(0);

  // **********to use more than one modal in same component**********
  const [modalState, setModalState] = useState("close");

  // ********to show view modal*******************
  const showViewModal = (id) => {
    setItemId(id);
    setModalState("view-modal");
    getRecipeDetails(id);
  };
  // ********to close modal*******************
  const handleClose = () => setModalState("close");

  //************* to get categories list *******************
  const getCategoryList = () => {
    //get categ
    axios
      .get(`${baseUrl}/Category/?pageSize=10&pageNumber=1`, {
        headers: requestHeaders,
      })
      .then((response) => {
        setCategoriesList(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
        getToastValue(
          "error",
          error?.response?.data?.message ||
            "An error occurred. Please try again."
        );
      });
  };
  //************to get all tags*************************
  const getAllTags = () => {
    //get tags
    axios
      .get(`${baseUrl}/tag/`, {
        headers: requestHeaders,
      })
      .then((response) => {
        setTagList(response?.data);
      })
      .catch((error) => {
        console.log(error);
        getToastValue(
          "error",
          error?.response?.data?.message ||
            "An error occurred. Please try again."
        );
      });
  };

  // ************get recipe details****************
  const getRecipeDetails = (id) => {
    setShowLoading(true);
    axios
      .get(`${baseUrl}/Recipe/${id}`, {
        headers: requestHeaders,
      })
      .then((response) => {
        console.log("setrecdetail", response?.data);
        setRecipeDetails(response?.data);

        setShowLoading(false);
      })
      .catch((error) => {
        console.log(error);
        getToastValue(
          "error",
          error?.response?.data?.message ||
            "An error occurred. Please try again."
        );
        setShowLoading(false);
      });
  };

  //****************get all Recipe****************************
  const getAllRecipes = (pageNo, name, tagId, categoryId) => {
    setShowLoading(true);
    axios
      .get(`${baseUrl}/Recipe/`, {
        headers: requestHeaders,

        params: {
          pageSize: 5,
          pageNumber: pageNo,
          name: name,
          tagId: tagId,
          categoryId: categoryId,
        },
      })
      .then((response) => {
        // console.log("all recipe img path",response?.data?.data[3].imagePath);
        console.log("reclist", response?.data?.data);
        setRecipesList(response?.data?.data);
        setPagesArray(
          Array(response?.data?.totalNumberOfPages)
            .fill()
            .map((_, i) => i + 1)
        );
        setShowLoading(false);
      })
      .catch((error) => {
        console.log(error);
        getToastValue(
          "error",
          error?.response?.data?.message ||
            "An error occurred. Please try again."
        );

        setShowLoading(false);
      });
  };

  // ******get name value user entered in search inp***********
  const getNameValue = (e) => {
    setSearchString(e.target.value);
    getAllRecipes(1, e.target.value, selectedTagId, selectedCategoryId);
  };
  const getTagValue = (e) => {
    setSelectedTagId(e.target.value);
    getAllRecipes(1, searchString, e.target.value, selectedCategoryId);
  };
  const getCategoryValue = (e) => {
    setSelectedCategoryId(e.target.value);
    getAllRecipes(1, searchString, selectedTagId, e.target.value);
  };
  // ************add to fav***************
  const addToFavorites = () => {
    axios
      .post(
        `${baseUrl}/userRecipe/`,
        { recipeId: itemId },
        { headers: requestHeaders }
      )
      .then((response) => {
        console.log("fav tmam", response);
        getToastValue("success",response?.data?.message || "Added to favorites")
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        getToastValue("error", error?.response?.data?.message ||
        "An error occurred. Please try again.")
      });
  };
  useEffect(() => {
    getAllTags();
    getCategoryList();
    getAllRecipes();
  }, []);

  return showLoading ? (
    <PreLoader />
  ) : (
    <>
      <Header>
        <div className="header-content text-white rounded">
          <div className="row align-items-center  m-2 p-3">
            <div className="col-md-10">
              <h3 className="px-4">
               Recipes Items
              </h3>
              <p className="w-75 px-4">
                You can now add your items that any user can order it from the
                Application and you can edit
              </p>
            </div>
            <div className="col-md-2">
              <div>
                <img src={headerImg} className="img-fluid" alt="header" />
              </div>
            </div>
          </div>
        </div>
      </Header>
      <div className="row justify-content-between mx-4 p-3 ">
        <div className="col-md-6 px-4">
          <h4>
            Recipes Table Details
          </h4>
          <p>You can check all details</p>
        </div>

        {/* ******************** view modal ***************************/}
        <Modal show={modalState == "view-modal"} onHide={handleClose}>
          <Modal.Header closeButton>
            <h3>Recipe Details</h3>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              {recipeDetails?.imagePath ? (
                <img className="w-25"
                  src={`https://upskilling-egypt.com/${recipeDetails?.imagePath}`}
                />
              ) : (
                <img className="w-50" src={noData} />
              )}
               <p>
                Name:
                {recipeDetails?.name}
              </p>
              <p>
                description:
                {recipeDetails?.description}
              </p>
            </div>
            <div className="text-end my-3">
              <button
                onClick={addToFavorites}
                className="btn btn-outline-warning"
              >
                Add to favorites
              </button>
            </div>
          </Modal.Body>
        </Modal>
        {/* //*****************view modal******************** */}
        {/* ****************start filtration********************** */}
        <div className="filtration-group my-3">
          <div className="row">
            <div className="col-md-6">
              {/* search input */}
              <InputGroup>
                <InputGroup.Text>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </InputGroup.Text>
                <Form.Control
                  onChange={getNameValue}
                  placeholder="Search by name ..."
                  type="text"
                />
              </InputGroup>
              {/* //search input */}
            </div>
            <div className="col-md-3">
              {/* filter tag select */}
              <select
                onChange={getTagValue}
                className="form-select "
                aria-label="Default select example"
              >
                <option className="text-muted" value="">
                  Tag Filter
                </option>

                {tagList?.map((tag) => (
                  <option key={tag?.id} value={tag?.id}>
                    {tag?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <select
                onChange={getCategoryValue}
                className="form-select "
                aria-label="Default select example"
              >
                <option className="text-muted" value="">
                  Category Filter
                </option>

                {categoriesList?.map((category) => (
                  <option key={category?.id} value={category?.id}>
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {recipesList?.length > 0 ? (
          <div className="table-responsive">
            <table className="table">
              <thead className="table-head table-success">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Recipe Name</th>
                  <th scope="col">image</th>
                  <th scope="col">price</th>
                  <th scope="col">description</th>
                  <th scope="col">Category</th>
                  <th scope="col">Tag</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recipesList?.map((recipe, index) => (
                  <tr key={recipe?.id} className="table-light">
                    <th scope="row">{index + 1}</th>
                    <td>{recipe?.name}</td>
                    <td>
                      <div className="rec-image-container">
                        {recipe?.imagePath ? (
                          <img
                            className="w-100"
                            src={
                              `https://upskilling-egypt.com:443/` +
                              recipe?.imagePath
                            }
                          />
                        ) : (
                          <img className="w-100" src={recipeAlt} />
                        )}
                      </div>
                    </td>
                    <td>{recipe?.price}</td>
                    <td className="w-25">{recipe?.description}</td>
                    <td>{recipe?.category[0]?.name}</td>
                    <td>{recipe?.tag?.name}</td>
                    <td>
                      <i
                        onClick={() => showViewModal(recipe.id)}
                      
                        className="fa fa-eye  text-success px-2"
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/******* * pagination *********/}
            <div className="d-flex justify-content-center align-items-center mt-5">
              <Pagination>
                <Pagination.First />
                <Pagination.Prev />

                {pagesArray?.map((pageNo) => (
                  <Pagination.Item
                    key={pageNo}
                    onClick={() => getAllRecipes(pageNo, searchString)}
                  >
                    {pageNo}
                  </Pagination.Item>
                ))}

                <Pagination.Next />
                <Pagination.Last />
              </Pagination>
            </div>

            {/*******/
            /* pagination *********/}
          </div>
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
}
