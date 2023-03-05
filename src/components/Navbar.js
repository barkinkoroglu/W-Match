import React, { useEffect, useState } from "react";
import { setCompanies } from "../store/widget";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import WorkIcon from "@mui/icons-material/Work";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Avatar } from "@mui/material";
import { logout, getCompany } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Navbar() {
  const [showdrop, setShowdrop] = useState(false);
  const [userProfile, setUserProfile] = useState("");
  const [search, setSearch] = useState("");

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlelogout = async () => {
    await logout();
    navigate("/");
  };
  const handleprofil = () => {
    if (user.type === 1) {
      navigate(`/profile/${user.username}`);
    } else {
      navigate(`/profile/${user.username}`);
    }
  };
  const handleSearch = (e) => {
    setSearch(e.target.value.trim().toLowerCase());
  };

  useEffect(() => {
    const callValue = async () => {
      await getCompany(search).then((user) => {
        if (user) {
          dispatch(setCompanies(user));
        }
      });
    };
    search.length > 0 && callValue();
  }, [search]);

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
              onChange={handleSearch}
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
              src={user.ProfileUrl}
              sx={{ width: 24, height: 24 }}
            />
            <div className=" flex ">
              <h3 className=" text-sm font-medium">Me</h3>
              <ArrowDropDownIcon />
            </div>
            {showdrop && (
              <div className="absolute w-72 min-h-40 p-2 bg-gray-100 shadow-lg right-0 top-16 rounded-lg  ">
                <div className="flex flex-col">
                  <div className="flex border-b-2 border-gray-300 pb-2">
                    <div>
                      <Avatar src={user.ProfileUrl} />
                    </div>
                    <div className="pl-3 ">
                      <h1 className="text-xl font-semibold leading-6 ">
                        {user.type === 2 && user.companyname}
                        {user.type === 1 && `${user.name} ${user.lastname}`}
                      </h1>
                      <p className="text-xs">{user.country}</p>
                    </div>
                  </div>
                  <div className="flex flex-col py-1 gap-y-2  ">
                    <button
                      onClick={() => handleprofil()}
                      className="flex justify-center w-full border border-gray-500 rounded-full hover:bg-slate-400"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => handlelogout()}
                      className=" w-full border border-gray-500 rounded-full hover:bg-slate-400"
                    >
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
