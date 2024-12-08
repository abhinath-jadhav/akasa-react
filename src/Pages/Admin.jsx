import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
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

  return (
    <div>
      {valid ? (
        <div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl mt-2">Admin Dashboard</h1>
            <div className="flex gap-4 mt-2">
              <Link
                className="bg-secondary text-slate-50 px-4 py-2 rounded-md"
                to={"/admin/inventory"}
              >
                Inventory
              </Link>
              <Link
                className="bg-secondary g-secondary text-slate-50 px-4 py-2 rounded-md"
                to={"/admin/foods"}
              >
                Foods
              </Link>
            </div>
          </div>
          <Outlet />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Admin;
