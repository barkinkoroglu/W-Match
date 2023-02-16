import { Avatar } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import { width } from "@mui/system";
import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

function UserProfile({ user }) {
  // console.log(user.wmatchTests);
  console.log("ICERDAMAA", user);
  return (
    <div className="flex flex-[0.7] min-h-screen   flex-col mx-12 gap-y-3 pb-3 ">
      <div className="max-h-[490px] bg-white rounded-lg flex flex-col ">
        <div className=" flex flex-1 items-end relative min-h-[237px] ">
          <div className="p-2">
            <Avatar
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Brad_Pitt_Fury_2014.jpg/800px-Brad_Pitt_Fury_2014.jpg"
              sx={{
                width: "120px",
                height: "120px",
                objectFit: "contain",
                zIndex: "10",
              }}
              variant={"rounded"}
              className="border-2"
            />
          </div>
          <img
            className="absolute top-0 left-0 w-full h-3/4 rounded-t-lg  "
            src="https://img.freepik.com/free-vector/bedouins-walk-egypt-pyramids-camel-night-desert_107791-4619.jpg?w=1380&t=st=1673794053~exp=1673794653~hmac=590e998325efe77dd329ded70cdd636bc17bed5d6d585dd5722e2527cfdbd537"
            alt=""
          />
          <div className="absolute right-3 bottom-3 text-gray-400 p-1 rounded-full hover:bg-slate-700 cursor-pointer ">
            <SettingsIcon />
          </div>
          <div className="absolute right-3 top-3 text-gray-400 py-[2px] pt-[1px] px-2 rounded-full hover:bg-slate-700 cursor-pointer bg-slate-100">
            <AddAPhotoIcon
              sx={{
                width: "13px",
                height: "13px",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
        <div className="flex flex-1 p-2">
          {user.type === 1 ? (
            <div>
              <h1 className="text-lg font-medium">{`${user.name} ${user.lastname}`}</h1>
              <h1 className="text-gray-500 font-light">{user.jobfunct}</h1>
              <p className="text-gray-500 font-light text-sm">{user.country}</p>
              <div className="flex gap-x-2 pt-2">
                {user.wmatchTests.map((hero, index) => {
                  return (
                    <div
                      key={index}
                      className="py-1 px-2 bg-slate-300 rounded-full text-sm font-light"
                    >
                      {hero}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-lg font-medium">{user.companyname}</h1>
              <h1 className="text-gray-500 font-light">{user.about}</h1>
              <p className="text-gray-500 font-light text-sm">{user.country}</p>
            </div>
          )}
        </div>
      </div>
      <div className="p-2 bg-white rounded-lg flex flex-col gap-y-2">
        <h1 className="text-lg">About</h1>
        <p className="text-sm">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore, hic!
          Doloremque, corrupti obcaecati! Doloremque iure repellat enim
          distinctio deleniti excepturi non aspernatur perspiciatis error
        </p>
      </div>
    </div>
  );
}

export default UserProfile;
