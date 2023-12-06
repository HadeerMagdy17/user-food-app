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

export default function Registeration() {
  // *************context***************
  const { baseUrl} = useContext(AuthContext);
  const { getToastValue } = useContext(ToastContext);
  // *************preloader*******************
  const [showLoading, setShowLoading] = useState(false);
  // *************control show password***************************
  const [showPass, setShowPass] = useState(false);
  const clickHandler = () => {
    setShowPass(!showPass);
  };
  //   **********to navigate to another page***************
  const navigate = useNavigate();
  // ************validate***************
  const {
    register, //btsheel el values ui inputs
    handleSubmit, //integration
    formState: { errors }, //errors
  } = useForm();
  //****************to register******************
  const onSubmit = (data) => {
    console.log(data)
   setShowLoading(true);
    axios
      .post(`${baseUrl}/Users/Register`, data)
      .then((response) => {
       
        setShowLoading(false);
        navigate("/verify-account"); 
        getToastValue(
          "success",
          response?.data?.message || "Register successfully"
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
              <h2>Register</h2>
              <p>Welcome Back! Please enter your details</p>
              <div className="row my-2">
                <div className="col-md-6">
                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      <i className="fa-regular fa-user"></i>
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="user name"
                      type="text"
                      {...register("userName", {
                        required: true,
                      })}
                    />
                  </InputGroup>

                  {errors.userName && errors.userName.type === "required" && (
                    <span className=" text-danger my-1">
                      userName is required
                    </span>
                  )}
                </div>
                <div className="col-md-6">
                  <div>
                    {/* email */}
                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        <i className="fa-regular fa-envelope"></i>
                      </InputGroup.Text>
                      <Form.Control
                        placeholder="Email"
                        type="email"
                        {...register("email", {
                          required: true,
                          pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                        })}
                      />
                    </InputGroup>

                    {errors.email && errors.email.type === "required" && (
                      <span className=" text-danger my-1">
                        email is required
                      </span>
                    )}
                    {errors.email && errors.email.type === "pattern" && (
                      <span className=" text-danger my-1">invalid email</span>
                    )}
                    {/* //email */}
                  </div>
                </div>
                <div className="col-md-6">
                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                    <i className="fa-solid fa-house-user"></i>
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="country"
                      type="text"
                      {...register("country", {
                        required: true,
                      })}
                    />
                  </InputGroup>

                  {errors.country && errors.country.type === "required" && (
                    <span className=" text-danger my-1">
                      country is required
                    </span>
                  )}
                </div>
                <div className="col-md-6">
                  <div>
                    {/* phone input */}
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="phone-input">
                        <i className="fa-solid fa-phone"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="number"
                        name="phoneNumber"
                        placeholder="Phone"
                        aria-label="password"
                        aria-describedby="phone-input"
                        {...register("phoneNumber", {
                          required: true,
                        })}
                      />
                    </InputGroup>
                    {errors.phoneNumber && errors.phoneNumber.type === "required" && (
                      <span className="text-danger my-1">
                        phoneNumber is required
                      </span>
                    )}
                    {/*//phone input*/}
                  </div>
                </div>
                <div className="col-md-6">
                  <div>
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
                      <span className="text-danger my-1">
                        password is required
                      </span>
                    )}
                    {/*//password input*/}
                  </div>
                </div>
                <div className="col-md-6">
                  <div>
                    
                    {/* confirmpassword input */}
                    <InputGroup className="mb-3">
                      <InputGroup.Text >
                        <i className="fa-solid fa-key"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder="confirm Password"
                        aria-label="password"
                        aria-describedby="confirm password-input"
                        {...register("confirmPassword", {
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
                    {errors.confirmPassword && errors.confirmPassword.type === "required" && (
                      <span className="text-danger my-1">
                        confirmPassword is required
                      </span>
                    )}
                    {/*//confirm password input*/}
                  </div>
                </div>
              </div>

              <div className="text-end">
              
                <Link
                  to="/login"
                  className="text-success text-decoration-none"
                >
                  Login Now !
                </Link>
              </div>
              <div className="form-group my-3">
                <button className="btn btn-success w-100">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


