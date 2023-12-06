import React, { useState } from "react";
import logo from "../../../assets/images/4.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import PreLoader from "../../../SharedModule/Components/PreLoader/PreLoader";
import { AuthContext } from "../../../Context/AuthContext";
import { useContext } from "react";
import { ToastContext } from "../../../Context/ToastContext";

export default function VerifyAcount() {
  // *************context***************
  const { baseUrl} = useContext(AuthContext);
  
  const { getToastValue } = useContext(ToastContext);

  // *************preloader*******************
  const [showLoading, setShowLoading] = useState(false);
  const navigate = useNavigate();
  // ************validate***************
  const {
    register, //btsheel el values ui inputs
    handleSubmit, //integration
    formState: { errors }, //errors
  } = useForm();
  //****************to login******************
  const onSubmit = (data) => {
    setShowLoading(true);
    axios
      .post(`${baseUrl}/Users/verify`, data)
      .then((response) => {
        setShowLoading(false);
        navigate("/login"); //to home screen
        getToastValue(
          "success",
          response?.data?.message || "Login successfully"
        );
      })
      .catch((error) => {
        getToastValue(
          "error",
          error?.response?.data?.message ||
            "An error occurred. Please try again."
        );
        setShowLoading(false);
      });
  };

  return showLoading ? (
    <PreLoader />
  ) : (
    <div className="Auth-container container-fluid">
      <div className="row bg-overlay vh-100 justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="bg-white rounded p-3">
            <div className="logo-cont  text-center">
              <img src={logo} alt="logo" />
            </div>
            <form
              id="form2"
              className="w-75 m-auto"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h2>Verify Your Acount</h2>
              <p>Welcome Back! Please check your inbox and fill code</p>

              {/* email input */}
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <i className="fa-regular fa-envelope"></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="enter your email"
                  type="email"
                  {...register("email", {
                    required: true,
                    pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  })}
                />
              </InputGroup>

              {errors.email && errors.email.type === "required" && (
                <span className=" text-danger my-1">email is required</span>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <span className=" text-danger my-1">invalid email</span>
              )}
              {/* //email input */}
              {/* code input */}
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <i className="fa-solid fa-key"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="code"
                  placeholder="code"
                  aria-label="code"
                  aria-describedby="code-input"
                  {...register("code", {
                    required: true,
                  })}
                />

              </InputGroup>
              {errors.code && errors.code.type === "required" && (
                <span className="text-danger my-1">code is required</span>
              )}
              {/*//code input*/}

              <div className="d-flex justify-content-between align-items-center">
              
                <Link
                  to="/registration"
                  className="text-success text-decoration-none"
                >
                  Register now?
                </Link>
                <Link
                  to="/reset-password-request"
                  className="text-success text-decoration-none"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="form-group my-3">
                <button className="btn btn-success w-100">Verify Account</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


