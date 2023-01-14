import React from "react";
import WidgetElement from "./WidgetElement";
function Widget() {
  return (
    <div className="flex-[0.3]   ">
      <div className="flex flex-col  z-40 p-2 gap-y-2 rounded-lg shadow-lg bg-white">
        <h1 className=" border-b-2 p-2 w-full text-center font-medium border-gray-100">
          Add to your feed
        </h1>
        <WidgetElement />
        <WidgetElement />
        <WidgetElement />
      </div>
    </div>
  );
}

export default Widget;
