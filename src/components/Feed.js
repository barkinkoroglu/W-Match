import { Avatar } from "@mui/material";
import React, { useState } from "react";
import AbcIcon from "@mui/icons-material/Abc";
import WorkIcon from "@mui/icons-material/Work";
import Post from "./Post";

function Feed() {
  return (
    <div className="flex-[0.6] flex-col mx-12">
      <div className="  p-4 bg-white flex flex-col rounded-lg gap-y-3">
        <div className="flex gap-x-4">
          <Avatar
            alt="profilphoto"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Brad_Pitt_Fury_2014.jpg/800px-Brad_Pitt_Fury_2014.jpg"
          />
          <form className="flex flex-1">
            <input
              className=" w-full rounded-full border pl-5"
              type="text"
              placeholder="Start a post"
            />
          </form>
        </div>
        <div className=" flex items-center justify-end gap-x-4">
          <div className="flex gap-x-2 hover:bg-slate-200 py-1 px-3 rounded-full">
            <AbcIcon className="text-green-500" />
            <h3>Create Test</h3>
          </div>
          <div className="flex gap-x-2 hover:bg-slate-200 py-1 px-3 rounded-full">
            <WorkIcon className="text-amber-900" />
            <h3>Create Job</h3>
          </div>
        </div>
      </div>
      <span className="flex w-full border-b-2 my-3  border-gray-300 border-solid"></span>
      <Post />
      <Post />
      <Post />
    </div>
  );
}

export default Feed;
