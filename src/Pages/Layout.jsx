import React from "react";
import { Footer, Navbar } from "../Components";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="">
      <div className="sticky top-0 z-50 bg-white">
        <Navbar />
      </div>

      <div className="bg-slate-100">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
