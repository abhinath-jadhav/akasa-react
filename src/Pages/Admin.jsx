import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Swal from "sweetalert2";
import Login from "./Login";
import { isAdmin } from "../utils/PriavateRoute";

const Admin = () => {
  const [valid, setValid] = useState(null);

  useEffect(() => {
    if (isAdmin()) {
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

export default Admin;
