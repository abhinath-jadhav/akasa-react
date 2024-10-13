import React from "react";
import Container from "./Container";
import logo from "../assets/logo.svg";

const Footer = () => {
  return (
    <div className="bg-slate-100 pt-4">
      <Container
        className={
          "justify-center items-center md:justify-between flex-col md:flex-row px-4 gap-4 pb-4"
        }
      >
        <div className="md:w-[40%] text-center md:text-start">
          <p>About Us</p>
          <p>Contact Us</p>
          <p>Careers</p>
          <p>Privacy Policy</p>
        </div>
        <div className="md:w-[20%] text-center flex justify-center">
          <img className="md:w-full w-[50%]" src={logo} alt="" />
        </div>
        <div className="md:w-[40%]">
          <p className="text-sm md:text-end">
            © Copyright 2024 Akasa Air. All rights reserved
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
