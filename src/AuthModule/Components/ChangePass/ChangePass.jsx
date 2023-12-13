import React, { useContext, useState } from "react";
import logo from "../../../assets/images/4.png";
import axios from "axios";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import PreLoader from "../../../SharedModule/Components/PreLoader/PreLoader";
import { AuthContext } from "../../../Context/AuthContext";
import { ToastContext } from "../../../Context/ToastContext";

export default function ChangePass({ handleClose }) {

  // ***************context***********************
  const {requestHeaders,baseUrl}=useContext(AuthContext)
  const {getToastValue}=useContext(ToastContext)
  // *************control show password**************
  const [showOldPass, setShowOldPass] = useState(false);
  const clickHandler = () => {
    setShowOldPass(!showOldPass);
  };

  const [showNewPass, setShowNewPass] = useState(false);
  const clickHandler1 = () => {
    setShowNewPass(!showNewPass);
  };
  const [showConfirmNewPass, setShowConfirmNewPass] = useState(false);
  const clickHandler2 = () => {
    setShowConfirmNewPass(!showConfirmNewPass);
  };
 // *************preloader*******************
 const [showLoading, setShowLoading] = useState(false);
  //****************use form to validate**********
  const {
    register, //btsheel el values ui inputs
    handleSubmit, //integration
    formState: { errors }, //errors
  } = useForm();
  //****************to change password******************
  const onSubmit = (data) => {
    setShowLoading(true);
    console.log(data);
    axios
      .put(
        `${baseUrl}/Users/ChangePassword`,
        data,
        {
          headers: requestHeaders,
        }
      )
      .then((response) => {
        console.log(data);
        handleClose();
        setShowLoading(false);
        getToastValue("success",response?.data?.message || "password changed successfully")
     
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
    <div className=" container-fluid">
      <div className="row  justify-content-center align-items-center">
        <div className="col-md-10">
          <div className="bg-white rounded ">
            <div className="logo-cont  text-center">
              <img src={logo} alt="logo" />
            </div>

            <form id="form1" className="w-100 m-auto" onSubmit={handleSubmit(onSubmit)}>
              <h4 className="my-2">Change Your Password</h4>
              <p>Enter your details below</p>
              {/*old password input */}
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <i className="fa-solid fa-key"></i>
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Old Password"
                  aria-label="password"
                  aria-describedby="password-input"
                  {...register("oldPassword", {
                    required: true,
                  })}
                />

                <InputGroup.Text onClick={clickHandler}>
                  {showOldPass ? (
                    <i className="fa-regular fa-eye-slash"></i>
                  ) : (
                    <i className="fa-regular fa-eye"></i>
                  )}
                </InputGroup.Text>
              </InputGroup>
              {errors.oldPassword && errors.oldPassword.type === "required" && (
                <span className="text-danger my-1">
                  old password is required
                </span>
              )}
              {/*//password input*/}
              {/* new password input */}
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <i className="fa-solid fa-key"></i>
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="new password"
                  aria-label="password"
                  aria-describedby="password-input"
                  {...register("newPassword", {
                    required: true,
                  })}
                />

                <InputGroup.Text onClick={clickHandler1}>
                  {showNewPass ? (
                    <i className="fa-regular fa-eye-slash"></i>
                  ) : (
                    <i className="fa-regular fa-eye"></i>
                  )}
                </InputGroup.Text>
              </InputGroup>
              {errors.newPassword && errors.newPassword.type === "required" && (
                <span className="text-danger my-1">
                  new password is required
                </span>
              )}
              {/* //new password input */}

              {/* confirm new password */}
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <i className="fa-solid fa-key"></i>
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="confirm New Password"
                  aria-label="password"
                  aria-describedby="password-input"
                  {...register("confirmNewPassword", {
                    required: true,
                  })}
                />

                <InputGroup.Text onClick={clickHandler2}>
                  {showConfirmNewPass ? (
                    <i className="fa-regular fa-eye-slash"></i>
                  ) : (
                    <i className="fa-regular fa-eye"></i>
                  )}
                </InputGroup.Text>
              </InputGroup>
              {errors.confirmNewPassword &&
                errors.confirmNewPassword.type === "required" && (
                  <span className="text-danger my-1">
                    confirm new password is required
                  </span>
                )}
              {/* //confirm new password */}

              <div className="form-group my-3">
              <button
                  type="submit"
                  className={
                    "btn btn-success w-100" + (showLoading ? " disabled" : " ")
                  }
                >
                  {showLoading == true ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "Change Password"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
