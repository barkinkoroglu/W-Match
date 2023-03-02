import React from "react";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { fallowUser } from "../firebase";
function WidgetElement({ widg, index }) {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="flex gap-x-2 items-start">
      <div className="pt-1">
        <Avatar className="" sx={{ width: 40, height: 40 }} />
      </div>
      <div className="flex flex-col">
        <a
          href={`/profile/${widg.username}`}
          className=" font-medium leading-5 hover:underline 	"
        >
          {widg.companyname}
        </a>
        <p className=" text-xs">{widg.about}</p>
        <button
          onClick={async () => fallowUser(widg.username, user.username)}
          className="text-center text-sm font-medium bg-slate-200 hover:bg-slate-300 w-20 py-1 px-2 my-2 rounded-full"
        >
          Fallow
        </button>
      </div>
    </div>
  );
}

export default WidgetElement;
