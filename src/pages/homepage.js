import React from "react";
import Feed from "../components/Feed";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Widget from "../components/Widget";

function Homepage() {
  return (
    <div className="w-full ">
      <Navbar />
      <div className=" bg-gray-50">
        <div className="flex max-w-6xl px-3 pt-3 mx-auto  ">
          <Sidebar />
          <Feed />
          <Widget />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
