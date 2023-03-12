import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Like from "./Like";
import CloseIcon from "@mui/icons-material/Close";
import { createComment, createLike, getUserInfo } from "../firebase";
import Comment from "./Comment";

function Post(prop) {
  const [data, setData] = useState(null);

  console.log("DATA PROBLARI", data);
  const [showComments, setShowComments] = useState(false);
  const [showlikes, setshowLikes] = useState(false);
  const [commentValue, setCommentValue] = useState("");

  useEffect(() => {
    getUserInfo(prop.post.username).then((temp) => setData(temp));
  }, [prop.post.username]);

  const TestPost = () => {
    return (
      <div className="  px-4 py-2 bg-white flex flex-col rounded-lg gap-y-3 mb-4">
        <div className=" flex gap-x-3 ">
          <Avatar src={data?.ProfileUrl} />
          <div>
            <h3 className=" text-lg font-medium">{prop.post.name}</h3>
            <h3 className="text-xs">{prop.post.email}</h3>
          </div>
        </div>
        <div className="relative">
          <h1 className="text-base"> {prop.post.information} </h1>

          <h1 className="text-sm">
            Test Time : <span className="font-medium">{prop.post.qtime}</span>{" "}
          </h1>
          <a
            className="absolute right-0 bottom-0"
            href={`test/${prop.post.username}/${prop.post.id}`}
          >
            <button className="bg-slate-200 p-1 rounded-lg">
              Take the exam.
            </button>
          </a>
        </div>
      </div>
    );
  };

  const JobPost = () => {
    return (
      <div className="  px-4 py-2 bg-white flex flex-col rounded-lg gap-y-3 mb-4">
        <div className=" flex gap-x-3 ">
          <Avatar src={data?.ProfileUrl} />
          <div>
            <h3 className=" text-lg font-medium">{prop.post.name}</h3>
            <h3 className="text-xs">{prop.post.email}</h3>
          </div>
        </div>
        <div className="relative">
          <h1 className="text- font-medium"> {prop.post.jobname} </h1>

          <h1 className="text-base"> {prop.post.information} </h1>
          <h1 className="text-sm">{prop.post.salary} </h1>
          <button className="bg-slate-200 p-1 rounded-lg absolute right-0 bottom-0">
            Apply
          </button>
        </div>
      </div>
    );
  };

  if (prop.post.type === 2) {
    return TestPost();
  }

  if (prop.post.type === 3) {
    return JobPost();
  }

  const handleLike = async (e) => {
    await createLike(prop.user.username, prop.user.userid, prop.post.time);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (commentValue !== "") {
      const att = {
        name: prop.uname,
        username: prop.user.username,
        about: prop.about,
        comment: commentValue,
        ctime: Date.now(),
      };
      //console.log("COMMENT", att);
      await createComment(prop.post.username, att, prop.post.time);
      setCommentValue("");
    }
  };
  return (
    <div className="  px-4 py-2 bg-white flex flex-col rounded-lg gap-y-3 mb-4">
      <div className=" flex gap-x-3 ">
        <Avatar src={data?.ProfileUrl} />
        <div>
          <h3 className=" text-lg font-medium">{prop.post.name}</h3>
          <h3 className="text-xs">{prop.post.email}</h3>
        </div>
      </div>
      <div>
        <p>{prop.post.data}</p>
      </div>
      <div className="flex justify-between items-center text-xs">
        <div className="flex items-center gap-x-1">
          <ThumbUpOffAltIcon
            className="text-blue-400 "
            style={{ width: "16px", height: "16px" }}
          />
          <p onClick={() => setshowLikes(true)} className="hover:underline">
            {prop.post.likes.length} likes
          </p>
        </div>
        <h3
          onClick={() => setShowComments(!showComments)}
          className="hover:underline"
        >
          {prop.post.comments.length} comments
        </h3>
      </div>
      <div className="flex justify-evenly border-t-2 pt-2   ">
        <div
          onClick={() => handleLike()}
          className=" flex gap-x-2 hover:bg-slate-200 py-1 px-2 rounded-lg group items-center justify-center cursor-pointer "
        >
          <ThumbUpOffAltIcon className="group-hover:text-blue-400" />
          <h3>Like</h3>
        </div>
        <div
          onClick={() => setShowComments(!showComments)}
          className="flex gap-x-2 hover:bg-slate-200 py-1 px-3 rounded-lg group items-center  justify-center cursor-pointer "
        >
          <ChatBubbleOutlineIcon className="group-hover:text-blue-400" />
          <h3>Comment</h3>
        </div>
      </div>
      {showComments && (
        <div className="flex flex-col gap-y-3">
          <div className="flex gap-x-2">
            <Avatar />
            <form onSubmit={(e) => handleSubmit(e)} className="flex w-full    ">
              <input
                className="w-full border rounded-lg  outline-none px-2 focus:border-gray-500 "
                type="text"
                placeholder="Add a comment..."
                value={commentValue}
                onChange={(e) => setCommentValue(e.target.value)}
              />
            </form>
          </div>
          <div>
            {/* Bu kisim fallow sistemi gelidiginde güncellenecek */}
            {prop.post.comments.map((comm, index) => {
              return (
                <div>
                  <Comment key={index} val={comm} />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {showlikes && (
        <div>
          <div className="fixed top-0 left-0 bottom-0 right-0 z-50  bg-slate-900 opacity-75"></div>
          <div className="fixed flex flex-col  z-50 top-5 left-0 right-0 mx-auto max-w-xl max-h-[556px] px-4 py-3 rounded bg-white">
            <div className="flex flex-col items-center border-b-2 relative">
              <h1 className=" text-lg ">Reactions</h1>
              <div className="border-b-4 -mb-[1.7px] border-slate-500">
                <h1 className="p-2">
                  All{" "}
                  <span className="font-medium 	">{prop.post.likes.length}</span>
                </h1>
              </div>
              <button
                onClick={() => setshowLikes(false)}
                className="absolute hover:bg-slate-400 rounded-lg p-1 right-0"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="flex flex-col gap-y-3 py-3 overflow-y-auto">
              {prop.post.likes !== null ? (
                prop.post.likes.map((element, index) => {
                  return <Like key={index} likeid={element} />;
                })
              ) : (
                <div>Loading </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
