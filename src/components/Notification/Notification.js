import { Avatar } from "@mui/material";
import React from "react";

function Notification() {
  return (
    <div className="p-4 bg-white mb-2 rounded-lg flex gap-x-2  items-start  ">
      <div className="flex pt-1">
        <Avatar />
      </div>
      <div className="w-full flex flex-col gap-y-2">
        <p className="text-sm">
          <span className="font-semibold"> Vestel </span> is hiring{" "}
          <span className="font-semibold">Frontend Engineer</span> See this job
          recommendations. Notofication Notofication Notofication Notofication
          Notofication Notofication Notofication Notofication Notofication
        </p>
        <div>
          <button className="px-3 py-1 border rounded-full hover:bg-slate-400">
            View jobs
          </button>
        </div>
      </div>
      <div className="flex flex-col ">
        <h1 className="text-xs ">1h</h1>
      </div>
    </div>
  );
}

export default Notification;
