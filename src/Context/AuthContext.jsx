import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export let AuthContext = createContext(null);
let requestHeaders = {
    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
  };
let baseUrl ="https://upskilling-egypt.com:443/api/v1"
export default function AuthContextProvider(props) {
  //*************control user data state***********
  const [userData, setUserData] = useState(null);

  //**************save user data *********************
  let saveUserData = () => {
    let encodedToken = localStorage.getItem("userToken");
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  };
  // to handle click refresh in browser 3shan myzharsh null
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      //3ndy data feha w da m3nah eny user
      saveUserData(); //call
    }
  }, []);
  return (
    <AuthContext.Provider value={{userData,saveUserData,requestHeaders,baseUrl}}>
      {props.children}
      </AuthContext.Provider>
  );
}
