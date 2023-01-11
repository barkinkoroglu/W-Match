import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import WorkIcon from "@mui/icons-material/Work";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Avatar } from "@mui/material";
function Navbar() {
  const [showdrop, setShowdrop] = useState(false);
  const handleSearch = () => {
    console.log("Arandi");
  };
  return (
    <nav className="bg-slate-100 sticky top-0 z-50">
      <div className="flex max-w-6xl px-3 py-1 mx-auto justify-between items-center   ">
        <div className=" flex flex-1 items-center gap-x-4 ">
          <a href="/home" className=" font-bold text-2xl ">
            WMATCH
          </a>
          <form className=" flex w-full relative   " onSubmit={handleSearch}>
            <input
              className="px-2 py-1 pl-8 w-72 rounded-lg   "
              type="text"
              placeholder="Search"
            />
            <SearchIcon
              className="absolute left-1 top-0 bottom-0 my-auto mx-0 "
              style={{ height: "20px", width: "20px" }}
            />
          </form>
        </div>
        <div className="flex justify-center items-center gap-x-6">
          <a className="flex flex-col items-center w-20" href="/home">
            <HomeIcon />
            <h3 className=" text-sm font-medium">Homepage</h3>
          </a>
          <a className="flex flex-col items-center w-20" href="/notifications">
            <NotificationsIcon />
            <h3 className=" text-sm font-medium">Notifications</h3>
          </a>
          <a className="flex flex-col items-center w-20" href="/jobs">
            <WorkIcon />
            <h3 className=" text-sm font-medium">Jobs</h3>
          </a>
          <div
            onClick={() => setShowdrop(!showdrop)}
            className="flex flex-col items-center pt-1 relative  "
          >
            <Avatar
              alt="profilphoto"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Brad_Pitt_Fury_2014.jpg/800px-Brad_Pitt_Fury_2014.jpg"
              sx={{ width: 24, height: 24 }}
            />
            <div className=" flex ">
              <h3 className=" text-sm font-medium">Me</h3>
              <ArrowDropDownIcon />
            </div>
            {showdrop && (
              <div className="absolute w-72 h-40 p-2 bg-slate-200 right-0 top-16 rounded-lg  ">
                <div className="flex flex-col">
                  <div className="flex border-b-2 border-gray-300 pb-2">
                    <div>
                      <Avatar />
                    </div>
                    <div className="pl-3 ">
                      <h1 className="text-xl font-semibold leading-6 ">
                        Barkın Köroğlu
                      </h1>
                      <p className="text-xs">Vestel, Student</p>
                    </div>
                  </div>
                  <div className="flex flex-col py-1 gap-y-2  ">
                    <a
                      href="/home"
                      className="flex justify-center w-full border border-blue-300 rounded-full hover:bg-slate-400"
                    >
                      View Profile
                    </a>
                    <button className=" w-full border border-blue-300 rounded-full hover:bg-slate-400">
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
