import React from "react";
import WidgetElement from "./WidgetElement";
import { useSelector } from "react-redux";
function Widget() {
  const { widget } = useSelector((state) => state.widget);
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="flex-[0.3]   ">
      {user.type === 1 && (
        <div className="flex flex-col  z-40 p-2 gap-y-2 rounded-lg shadow-lg bg-white">
          <h1 className=" border-b-2 p-2 w-full text-center font-medium border-gray-100">
            Add to your feed
          </h1>
          {widget?.map((widg, index) => {
            return <WidgetElement key={index} widg={widg} />;
          })}
        </div>
      )}
    </div>
  );
}

export default Widget;
