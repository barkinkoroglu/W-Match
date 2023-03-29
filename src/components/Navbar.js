import React, { useEffect, useState, useRef } from "react";
import { setCompanies } from "../store/widget";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import WorkIcon from "@mui/icons-material/Work";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Avatar } from "@mui/material";
import { logout, getCompany, searchCompany } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
function Navbar() {
  const [showdrop, setShowdrop] = useState(false);
  const [userProfile, setUserProfile] = useState("");
  const [search, setSearch] = useState("");
  const user = useSelector((state) => state.auth.user);
  const searchdata = useSelector((state) => state.widget.widget);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef();
  const ref2 = useRef();
  const handlelogout = async () => {
    await logout();
    navigate("/");
  };
  const searchuserdata = () => {};
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
      await getCompany().then((data) => {
        searchCompany(data, search).then((user) => {
          if (user) {
            dispatch(setCompanies(user));
          }
        });
      });
    };
    search.length > 0 && callValue();
  }, [search]);

  useEffect(() => {
    const closeNavSearch = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        dispatch(setCompanies(null));
      }

      if (ref2.current && !ref2.current.contains(e.target)) {
        setShowdrop(false);
      }
    };
    document.body.addEventListener("click", closeNavSearch);

    return () => {
      document.body.removeEventListener("click", closeNavSearch);
    };
  }, []);

  return (
    <nav className="bg-slate-100 sticky top-0 z-50">
      <div className="flex max-w-6xl px-3 sm: py-3 lg:py-1  mx-auto justify-between items-center   ">
        <div className=" flex flex-1 items-center gap-x-4 ">
          <a href="/home" className=" font-bold  ">
            <img
              src={require("../images/logo.png")}
              className=" w-[160px] h-12 object-cover border-none outline-none"
              alt=""
            />
          </a>
          <form
            ref={ref}
            className=" flex w-full relative   "
            onSubmit={handleSearch}
          >
            <input
              className="px-2 py-1 pl-8 sm:w-72  rounded-lg   "
              type="text"
              placeholder="Search"
              onChange={(e) => handleSearch(e)}
            />
            <SearchIcon
              className="absolute left-1 top-0 bottom-0 my-auto mx-0 "
              style={{ height: "20px", width: "20px" }}
            />

            {searchdata?.length > 0 && (
              <div className="  sm:min-w-[290px] flex flex-col  gap-y-2  rounded-lg absolute left-0 top-9 bg-slate-300 ">
                {searchdata?.map((element, index) => {
                  return (
                    <div
                      className="flex gap-x-2 items-center border-b-2 hover:bg-slate-500 px-2 py-1"
                      key={index}
                    >
                      <Avatar src={element.ProfileUrl} />
                      <a href={`/profile/${element.username}`}>
                        {element.companyname}
                      </a>
                    </div>
                  );
                })}
              </div>
            )}
          </form>
        </div>
        <div className="justify-center items-center hidden sm:gap-x-3 sm:flex  lg:gap-x-6">
          <a
            className="flex flex-col items-center sm:w-10 lg:w-20"
            href="/home"
          >
            <HomeIcon />
            <h3 className=" text-sm font-medium hidden lg:inline  ">
              Homepage
            </h3>
          </a>
          <a
            className="flex flex-col items-center sm:w-10 lg:w-20"
            href="/notifications"
          >
            <NotificationsIcon />
            <h3 className=" text-sm font-medium hidden lg:inline">
              Notifications
            </h3>
          </a>
          <a
            className="flex flex-col items-center sm:w-10 lg:w-20"
            href="/jobs"
          >
            <WorkIcon />
            <h3 className=" text-sm font-medium hidden lg:inline">Jobs</h3>
          </a>
          <div
            ref={ref2}
            onClick={() => setShowdrop(!showdrop)}
            className="flex flex-col items-center pt-1 relative  "
          >
            <Avatar
              alt="profilphoto"
              src={user?.ProfileUrl}
              sx={{ width: 24, height: 24 }}
            />
            <div className="  hidden lg:flex">
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
        {menuOpen ? (
          <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
        ) : (
          ""
        )}
        <div className="sm:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(true)}
            className=" hover:bg-slate-200 cursor-pointer py-2 px-1 rounded-sm items-center"
          >
            <MenuIcon sx={{ width: 35, height: 30 }} />
          </button>
          <div
            className={
              menuOpen
                ? "fixed top-0 right-0 w-[200px] h-screen bg-white z-10 duration-300"
                : "fixed top-0 right-[-100%] w-[200px] h-screen bg-white z-10 duration-300"
            }
          >
            <CloseIcon
              onClick={() => setMenuOpen(false)}
              size={30}
              className="absolute right-4 top-4 cursor-pointer hover:bg-gray-200"
            />
            <nav>
              <ul className="flex mt-5 flex-col p-4 text-gray-800">
                <a
                  href="/home"
                  className="text-xl py-4 flex items-center cursor-pointer"
                >
                  <HomeIcon className="mr-4" /> Home
                </a>
                <a
                  href="/notifications"
                  className="text-xl py-4 flex items-center cursor-pointer"
                >
                  <NotificationsIcon className="mr-4" /> Notifications
                </a>
                <a
                  href="/jobs"
                  className="text-xl py-4 flex items-center cursor-pointer"
                >
                  <WorkIcon className="mr-4" /> Jobs
                </a>

                <li
                  onClick={() => handleprofil()}
                  className="text-xl py-4 flex items-center cursor-pointer"
                >
                  <Avatar
                    alt="profilphoto"
                    src={user?.ProfileUrl}
                    sx={{ width: 24, height: 24 }}
                    className="mr-4"
                  />{" "}
                  Profile
                </li>

                <li
                  onClick={() => handlelogout()}
                  className="text-xl py-4 flex items-center cursor-pointer"
                >
                  <LogoutIcon className="mr-4" />
                  Logout
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
