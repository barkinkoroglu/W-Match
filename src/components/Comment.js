import { Avatar } from "@mui/material";
import React from "react";

function Comment() {
  return (
    <div className=" flex gap-x-2 mb-2 relative">
      <div>
        <Avatar />
      </div>
      <div className="bg-slate-100 w-full rounded-lg p-2  ">
        <div className="pr-14 pb-2">
          <h3 className="text-base leading-5 font-medium">Barkin Koroglu</h3>
          <h1 className="text-xs text-gray-500  w-full ">Frontçu</h1>
        </div>
        <p className="text-sm">
          Manyak bir iş kardşeim ne beyle bu Manyak bir iş kardşeim ne beyle bu
          Manyak bir iş kardşeim ne beyle bu Manyak bir iş kardşeim ne beyle bu
          Manyak bir iş kardşeim ne beyle bu
        </p>
      </div>
      <div className="absolute right-2 top-2 text-xs text-slate-400">1h</div>
    </div>
  );
}

export default Comment;
