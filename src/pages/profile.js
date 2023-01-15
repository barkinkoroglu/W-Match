import React from "react";
import Navbar from "../components/Navbar";
import UserProfile from "../components/Profile/UserProfile";
import Widget from "../components/Widget";
function Profile() {
  return (
    <div className="">
      <Navbar />
      <div className=" bg-gray-50">
        <div className="flex max-w-6xl px-3 pt-3 mx-auto  ">
          <UserProfile />
          <Widget />
        </div>
      </div>
    </div>
  );
}

export default Profile;
