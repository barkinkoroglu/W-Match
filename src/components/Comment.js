import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getUserInfo } from "../firebase";

function Comment({ val }) {
  // console.log("comment prop", val);
  const [data, setData] = useState(null);

  useEffect(() => {
    getUserInfo(val.username).then((temp) => setData(temp));
  }, [val.username]);
  return (
    <div className=" flex gap-x-2 mb-2 relative">
      <div>
        <Avatar src={data?.ProfileUrl} />
      </div>
      <div className="bg-slate-100 w-full rounded-lg p-2  ">
        <div className="pr-14 pb-2">
          <a
            href={`/profile/${data?.username}`}
            className="text-base leading-5 font-medium hover:underline"
          >
            {val.name}
          </a>
          <h1 className="text-xs text-gray-500  w-full ">{val.about}</h1>
        </div>
        <p className="text-sm">{val.comment}</p>
      </div>
      {/* <div className="absolute right-2 top-2 text-xs text-slate-400">1h</div> */}
    </div>
  );
}

export default Comment;
