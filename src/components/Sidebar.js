import { Avatar } from "@mui/material";
import React from "react";

function Sidebar() {
  return (
    <div className="flex-[0.2]   ">
      <div className="flex flex-col sticky top-[72px] z-40 p-2 gap-y-3 items-center justify-center rounded-lg shadow-lg     bg-white">
        <div>
          <Avatar sx={{ width: 48, height: 48 }} />
        </div>
        <div className="flex flex-col text-center ">
          <h1 className="text-lg font-medium">Barkın Köroğlu</h1>
          <p className=" text-xs">
            Student at Yaşar University, Computer Engineering
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
