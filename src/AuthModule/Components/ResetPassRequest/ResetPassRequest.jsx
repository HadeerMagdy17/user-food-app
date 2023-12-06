import React,{useState} from "react";
import logo from "../../../assets/images/4.png";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import PreLoader from "../../../SharedModule/Components/PreLoader/PreLoader";
import { AuthContext } from "../../../Context/AuthContext";
import { useContext } from "react";
import { ToastContext } from "../../../Context/ToastContext";

export default function ResetPassRequest() {
  // *************context********************
  const {baseUrl}=useContext(AuthContext)
  const {getToastValue}=useContext(ToastContext)
   // *************preloader*******************
 const [showLoading, setShowLoading] = useState(false);

  const navigate = useNavigate();
  const {
    register, //btsheel el values ui inputs
    handleSubmit, //integration
    formState: { errors }, //errors
  } = useForm();

 //****************to request reset******************

  const onSubmit = (data) => {
    console.log(data);
    setShowLoading(true);
    axios
      .post(`${baseUrl}/Users/Reset/Request`, data)
      .then((response) => {
        console.log(data);
        setShowLoading(false);
        navigate("/reset-password");

        getToastValue("success",response?.data?.message || "Code sent to your mail please check")
     
      })
      .catch((error) => {
        getToastValue("error", error?.response?.data?.message ||
        "An error occurred. Please try again.")
     
        setShowLoading(false);
      });
  };
  
  return showLoading ? (
    <PreLoader/>
  ) : (
    <div className="Auth-container container-fluid">
      <div className="row bg-overlay vh-100  justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="bg-white rounded p-3">
            <div className="logo-cont  text-center">
              <img src={logo} alt="logo" />
            </div>
            <form id="form4" className="w-75 m-auto" onSubmit={handleSubmit(onSubmit)}>
              <h3>Request Reset Password</h3>
              <p>Please Enter Your Email And Check Your Inbox</p>
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
           
      

              <div className="form-group my-3">
                <button className="btn btn-success w-100">Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
