import React , {useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
// This component will be used to protect the routes that require authentication. It will check if the user is 
// authenticated or not. If the user is authenticated, it will render the children. Otherwise, it will redirect
//  the user to the login page.

export default function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && !authStatus) {
      navigate("/login");
    } else if (!authentication && authStatus) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// export default function AuthLayout({ children, authentication }) {
//   const navigate = useNavigate();
//   const authStatus = useSelector((state) => state.auth.status);
//   const [loader, setLoader] = useState(true);

//   useEffect(() => {
//     if (authentication && !authStatus) {
//       navigate("/login");
//     } else if (!authentication && authStatus) {
//       navigate("/");
//     }
//     setLoader(false);
//   }, [authStatus, navigate, authentication]);

//   if (loader) return <h1>Loading...</h1>;

//   return <>{children}</>;
// }