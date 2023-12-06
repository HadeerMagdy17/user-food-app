import React, { useContext } from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import headerImg from "../../../assets/images/home.png";
import { AuthContext } from '../../../Context/AuthContext';
import { Link } from "react-router-dom";
export default function Home() {
  let {userData}=useContext(AuthContext)
  return (
    <div>
      <Header>
        <div className="header-content text-white rounded">
          <div className="row align-items-center  mx-2 px-3">
            <div className="col-md-9">
              <h3 className="px-4"><strong>Welcome {userData?.userName} !</strong></h3>
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
            <h4><strong>Show the Recipes !</strong> </h4>
            <p>
              you can now fill the meals easily using the table and form , click
              here and sill it with the table !
            </p>
          </div>
        </div>
        <div className="col-md-6 text-end">
          <div>
           
           <button className="btn btn-success px-3">
           <Link to={"/dashboard/recipes"} className="text-white text-decoration-none">
               Recipes &nbsp;
              <i className=" fa fa-arrow-right"></i>
              </Link>
              </button>
           
          
          </div>
        </div>
      </div>
    </div>
  );
}
