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

export default function Login({ saveUserData }) {
  // *************context***************
  const { baseUrl } = useContext(AuthContext);
  const { getToastValue } = useContext(ToastContext);
  // *************control show password***************************
  const [showPass, setShowPass] = useState(false);
  const clickHandler = () => {
    setShowPass(!showPass);
  };
<<<<<<< HEAD

=======
>>>>>>> a44c62afcdb79501e9e3a428bd3054f7725d3e56
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
      .post(`${baseUrl}/Users/Login`, data)
      .then((response) => {
<<<<<<< HEAD
        localStorage.setItem("userToken", response.data.token);
        saveUserData();
=======
        localStorage.setItem("adminToken", response.data.token);
        saveAdminData();
        
>>>>>>> a44c62afcdb79501e9e3a428bd3054f7725d3e56
        setShowLoading(false);
        navigate("/dashboard"); //to home screen
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
              <h2>Log In</h2>
              <p>Welcome Back! Please enter your details</p>

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
              {/* password input */}
              <InputGroup className="mb-3">
                <InputGroup.Text id="password-input">
                  <i className="fa-solid fa-key"></i>
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  aria-label="password"
                  aria-describedby="password-input"
                  {...register("password", {
                    required: true,
                  })}
                />

                <InputGroup.Text onClick={clickHandler}>
                  {showPass ? (
                    <i className="fa-regular fa-eye-slash"></i>
                  ) : (
                    <i className="fa-regular fa-eye"></i>
                  )}
                </InputGroup.Text>
              </InputGroup>
              {errors.password && errors.password.type === "required" && (
                <span className="text-danger my-1">password is required</span>
              )}
              {/*//password input*/}

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
<<<<<<< HEAD
                <button className="btn btn-success w-100">Login</button>
=======
                <button
               className="btn btn-success w-100">Login</button>
>>>>>>> a44c62afcdb79501e9e3a428bd3054f7725d3e56
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
