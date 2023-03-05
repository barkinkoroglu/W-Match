import { Avatar } from "@mui/material";
import React from "react";

function Comment({ val }) {
  console.log("comment prop", val);
  return (
    <div className=" flex gap-x-2 mb-2 relative">
      <div>
        <Avatar />
      </div>
      <div className="bg-slate-100 w-full rounded-lg p-2  ">
        <div className="pr-14 pb-2">
          <h3 className="text-base leading-5 font-medium">{val.name}</h3>
          <h1 className="text-xs text-gray-500  w-full ">{val.about}</h1>
        </div>
        <p className="text-sm">{val.comment}</p>
      </div>
      {/* <div className="absolute right-2 top-2 text-xs text-slate-400">1h</div> */}
    </div>
  );
}

export default Comment;
