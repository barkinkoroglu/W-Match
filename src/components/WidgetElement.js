import React from "react";
import { Avatar } from "@mui/material";

function WidgetElement() {
  return (
    <div className="flex gap-x-2 items-start">
      <div className="pt-1">
        <Avatar className="" sx={{ width: 40, height: 40 }} />
      </div>
      <div className="flex flex-col    ">
        <h1 className=" font-medium leading-5	">Vestel</h1>
        <p className=" text-xs 	 ">
          Student at Yaşar University, Computer Engineering
        </p>
        <button className="text-center text-sm font-medium bg-slate-200 hover:bg-slate-300 w-20 py-1 px-2 my-2 rounded-full">
          Fallow
        </button>
      </div>
    </div>
  );
}

export default WidgetElement;
