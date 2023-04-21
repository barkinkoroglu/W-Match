import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getUserInfo } from "../firebase";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { deleteCommentdata } from "../firebase";
function Comment({ val, pusername, ptime, refreshData }) {
  const [data, setData] = useState(null);
  const user = useSelector((state) => state.auth.user);
  console.log("com", val);
  const handleDeleteComment = async () => {
    await deleteCommentdata(pusername, ptime, val.ctime).then(async () => {
      await refreshData();
    });
  };
  useEffect(() => {
    getUserInfo(val.username).then((temp) => setData(temp));
  }, [val.username]);
  return (
    <div className=" flex gap-x-2 mb-2 relative group/comment">
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

      {user.username === val.username && (
        <button
          onClick={() => handleDeleteComment()}
          className="absolute right-2 top-2 cursor-pointer text-gray-400 hover:text-gray-600 hidden group-hover/comment:inline "
        >
          <CloseIcon />
        </button>
      )}
      {/* <div className="absolute right-2 top-2 text-xs text-slate-400">1h</div> */}
    </div>
  );
}

export default Comment;
