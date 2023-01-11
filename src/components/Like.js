import { Avatar } from "@mui/material";
import React from "react";

function Like() {
  return (
    <div className="flex gap-x-2 border-b-2 pb-3 border-gray-100">
      <div>
        <Avatar />
      </div>
      <div className="leading-5">
        <h1 className="font-medium">Barkin Koroglu</h1>
        <h1 className="text-sm">Front-End Developer</h1>
      </div>
    </div>
  );
}

export default Like;
