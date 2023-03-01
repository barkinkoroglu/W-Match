import React from "react";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";

function WidgetElement() {
  const { widget } = useSelector(state => state.widget)

  return (
    <div className="flex gap-x-2 items-start">
      <div className="pt-1">
        <Avatar className="" sx={{ width: 40, height: 40 }} />
      </div>
      <div className="flex flex-col">
        <h1 className=" font-medium leading-5	">{widget.type === 2 && widget.companyname}</h1>
        <p className=" text-xs">
          {widget.type === 2 && widget.addressline1}
        </p>
        <p className=" text-xs">
        {widget.type === 2 && widget.tnumber}
        </p>
        <button className="text-center text-sm font-medium bg-slate-200 hover:bg-slate-300 w-20 py-1 px-2 my-2 rounded-full">
          Fallow
        </button>
      </div>
    </div>
  );
}

export default WidgetElement;
