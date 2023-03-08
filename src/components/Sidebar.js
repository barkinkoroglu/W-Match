import { Avatar } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
function Sidebar() {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="flex-[0.2]   ">
      <div className="flex flex-col sticky top-[72px] z-40 py-2  gap-y-3 items-center justify-center rounded-lg shadow-lg     bg-white">
        <div>
          <Avatar src={user.ProfileUrl} sx={{ width: 48, height: 48 }} />
        </div>
        {user.type === 1 ? (
          <div>
            <div className="flex flex-col text-center ">
              <h1 className="text-lg font-medium">{`${user.name} ${user.lastname}`}</h1>
              <p className=" text-xs">{user.jobfunct}</p>
            </div>
            <div>
              <div>
                <h1>Following</h1>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full space-y-3 ">
            <div className="flex flex-col text-center px-4 ">
              <h1 className="text-lg font-medium">{user.companyname}</h1>
              <p className=" text-xs">{user.about}</p>
            </div>
            <div className="flex flex-col border-t-2 gap-y-3">
              <div className="px-4">
                <div className="flex justify-between items-center text-sm mt-2 ">
                  <h1 className="">Followers</h1>
                  <h1 className="">{user?.followers.length}</h1>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
