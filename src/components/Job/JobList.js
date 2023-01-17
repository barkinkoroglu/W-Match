import { Avatar } from "@mui/material";
import React from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

function JobList() {
  return (
    <div className="flex  justify-between pt-3 group cursor-pointer border-b-2 pb-2 ">
      <div className="flex gap-x-2   ">
        <div className="flex-1  j">
          <Avatar sx={{ height: 50, width: 50 }} variant="square" />
        </div>
        <div className="">
          <h1 className="group-hover:underline">Back End Developer (Java)</h1>
          <h1 className="text-sm ">Vestel</h1>
          <h1 className="text-xs text-gray-400 ">Turkey (Remote)</h1>
          <h1 className="text-xs text-gray-400 mt-3">4 days ago</h1>
        </div>
      </div>
      <div className="flex p-1 rounded-full h-min hover:bg-slate-400 ">
        <BookmarkBorderIcon />
      </div>
    </div>
  );
}

export default JobList;
