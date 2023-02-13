import React from "react";

function register() {
  return (
    <div className="flex w-full h-screen">
      <a href="/register/user" className="flex flex-1 relative group  ">
        <img
          src={require("../images/jobseeker.jpeg")}
          alt=""
          className="h-screen object-none "
        />
        <div className="absolute bg-black z-10 h-screen w-full opacity-50 group-hover:opacity-70  "></div>
        <h1 className="absolute w-full h-screen  flex justify-center items-center text-white  z-20 text-5xl">
          Job Seeker
        </h1>
      </a>
      <a href="/register/company" className="flex flex-1 relative group  ">
        <img
          src={require("../images/office.jpg")}
          alt=""
          className="h-screen object-cover "
        />
        <div className="absolute bg-black z-10 h-screen w-full opacity-50 group-hover:opacity-70  "></div>
        <h1 className="absolute w-full h-screen  flex justify-center items-center text-white  z-20 text-5xl">
          Company
        </h1>
      </a>
    </div>
  );
}

export default register;
