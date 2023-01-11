import React from "react";
import Navbar from "../components/Navbar";
import NotificationFeed from "../components/Notification/NotificationFeed";
import Sidebar from "../components/Sidebar";
import Widget from "../components/Widget";
function Notifications() {
  return (
    <div className="w-full  ">
      <Navbar />
      <div className="bg-gray-50">
        <div className="flex max-w-6xl px-3 pt-3 mx-auto ">
          <Sidebar />
          <NotificationFeed />
          <Widget />
        </div>
      </div>
    </div>
  );
}

export default Notifications;
