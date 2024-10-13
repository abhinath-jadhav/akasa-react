import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { validUser } from "../utils";
import Swal from "sweetalert2";
import Login from "./Login";
import { useSelector } from "react-redux";

const Auth = () => {
  const [valid, setValid] = useState(null);

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth) {
      setValid(true);
    } else {
      Swal.fire({
        title: "Authentication Required",
        text: "Please login to continue.",
        icon: "warning",
        confirmButtonText: "OK",
      }).then(() => setValid(false));
    }
  }, []);

  if (valid === null) {
    return <div>Loading...</div>;
  }

  return <div>{valid ? <Outlet /> : <Login />}</div>;
};

export default Auth;
