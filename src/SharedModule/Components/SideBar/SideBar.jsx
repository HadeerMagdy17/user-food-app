import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import ChangePass from "../../../AuthModule/Components/ChangePass/ChangePass";
import logo from "../../../assets/images/3.png";
export default function SideBar() {
  //********** */ modal*******************
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //*************sidebar collapse***************
  let [isCollapsed, setIsCollapsed] = useState(false);
  let handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };
  //*************to navigate to another page**********
  let navigate = useNavigate();
  //*************to logout**************
  let logOut = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <div className="sidebar-container">
      <Sidebar className="vh-100" collapsed={isCollapsed}>
        <div>
          <img onClick={handleToggle} className="w-75" src={logo} alt="" />
        </div>
        <Menu>
          <MenuItem
            icon={<i className="fa fa-home"></i>}
            component={<Link to="/dashboard" />}
          >
            Home
          </MenuItem>
       
          <MenuItem
            icon={<i className="fa-solid fa-utensils"></i>}
            component={<Link to="/dashboard/recipes" />}
          >
            Recipes
          </MenuItem>
          <MenuItem
            icon={<i className="fa fa-heart"></i>}
            component={<Link to="/dashboard/favorites" />}
          >
            favorites
          </MenuItem>
          <MenuItem
            icon={<i className="fa-solid fa-unlock"></i>}
            onClick={handleShow}
          >
            Change Password
          </MenuItem>
          {/* modal */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Body>
              <ChangePass handleClose={handleClose} />
            </Modal.Body>
          </Modal>
          {/* //modal */}
          <MenuItem
            icon={<i className="fa-solid fa-right-from-bracket"></i>}
            onClick={logOut}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
