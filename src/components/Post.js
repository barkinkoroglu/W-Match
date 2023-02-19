import { Avatar } from "@mui/material";
import React, { useState } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Like from "./Like";
import CloseIcon from "@mui/icons-material/Close";
import { createComment, createLike } from "../firebase";
import Comment from "./Comment";
function Post(prop) {
  const [showComments, setShowComments] = useState(false);
  const [showlikes, setshowLikes] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const { email, name, comments, likes, data } = prop.post;
  console.log("Post propları", comments);

  const handleLike = async (e) => {
    const att = {
      name: prop.name,
    };
    await createLike(prop.userid, att, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (commentValue !== "") {
      const att = {
        name: prop.name,
        comment: commentValue,
      };
      console.log(att);
      await createComment(prop.userid, att, 0);
      setCommentValue("");
    }
  };
  return (
    <div className="  px-4 py-2 bg-white flex flex-col rounded-lg gap-y-3 mb-4">
      <div className=" flex gap-x-3 ">
        <Avatar />
        <div>
          <h3 className=" text-lg font-medium">{name}</h3>
          <h3 className="text-xs">{email}</h3>
        </div>
      </div>
      <div>
        <p>{data}</p>
      </div>
      <div className="flex justify-between items-center text-xs">
        <div className="flex items-center gap-x-1">
          <ThumbUpOffAltIcon
            className="text-blue-400 "
            style={{ width: "16px", height: "16px" }}
          />
          <p onClick={() => setshowLikes(true)} className="hover:underline">
            Barkin Koroglu and 46 others
          </p>
        </div>
        <h3
          onClick={() => setShowComments(!showComments)}
          className="hover:underline"
        >
          1 comment
        </h3>
      </div>
      <div className="flex justify-evenly border-t-2 pt-2   ">
        <div
          onClick={() => handleLike()}
          className=" flex gap-x-2 hover:bg-slate-200 py-1 px-2 rounded-lg group items-center justify-center "
        >
          <ThumbUpOffAltIcon className="group-hover:text-blue-400" />
          <h3>Like</h3>
        </div>
        <div
          onClick={() => setShowComments(!showComments)}
          className="flex gap-x-2 hover:bg-slate-200 py-1 px-3 rounded-lg group items-center  justify-center "
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
            {/* {comments.map((index, comm) => {
              return (
                <div>
                  <Comment key={index} val={comments[comm]} />
                </div>
              );
            })} */}
            <Comment />
            <Comment />
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
                  All <span className="font-medium 	"> 74</span>
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
              <Like />
              <Like />
              <Like />
              <Like />
              <Like />
              <Like />
              <Like />
              <Like />
              <Like />
              <Like />
              <Like />
              <Like />
              <Like />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
