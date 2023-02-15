import { Avatar } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
function Sidebar() {
  const { name, lastname, jobfunct } = useSelector((state) => state.auth.user);
  return (
    <div className="flex-[0.2]   ">
      <div className="flex flex-col sticky top-[72px] z-40 p-2 gap-y-3 items-center justify-center rounded-lg shadow-lg     bg-white">
        <div>
          <Avatar sx={{ width: 48, height: 48 }} />
        </div>
        <div className="flex flex-col text-center ">
          <h1 className="text-lg font-medium">{`${name} ${lastname}`}</h1>
          <p className=" text-xs">{jobfunct}</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
