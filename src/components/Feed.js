import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import AbcIcon from "@mui/icons-material/Abc";
import WorkIcon from "@mui/icons-material/Work";
import Post from "./Post";
import Createtest from "./Createtest";
import CreateJob from "./CreateJob";
import { useSelector } from "react-redux";
import { createPost, getAllPost } from "../firebase";

function Feed({ usertype }) {
  const [showCreateTest, setShowCreateTest] = useState(false);
  const [showCreateJob, setShowCreateJob] = useState(false);
  const [allposts, setAllPost] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const user = useSelector((state) => state.auth.user);
  console.log("User attributes", user);
  console.log("FEEDEKİ POSTLAR ", allposts);
  useEffect(() => {
    console.log("bas deger", user.uid);
    getAllPost(user.uid)
      .then((data) => setAllPost(data))
      .catch((error) => console.log(error));
  }, [user.uid]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputValue !== "") {
      const att = {
        name: user.companyname,
        email: user.email,
        likes: [],
        comments: [],
        data: inputValue,
        time: Date.now(),
      };
      console.log(att);
      await createPost(user.uid, att);
      setInputValue("");
    }
  };

  return (
    <div className="flex-[0.5]  flex-col mx-12">
      {usertype === 2 && (
        <div>
          <div className="  p-4 bg-white flex flex-col rounded-lg gap-y-3">
            <div className="flex gap-x-4">
              <Avatar
                alt="profilphoto"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Brad_Pitt_Fury_2014.jpg/800px-Brad_Pitt_Fury_2014.jpg"
              />
              <form onSubmit={(e) => handleSubmit(e)} className="flex flex-1">
                <input
                  className=" w-full rounded-full border pl-5"
                  type="text"
                  placeholder="Start a post"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </form>
            </div>
            <div className=" flex items-center justify-end gap-x-4">
              <div
                onClick={() => setShowCreateTest(!showCreateTest)}
                className="flex gap-x-2 hover:bg-slate-200 py-1 px-3 rounded-full cursor-pointer"
              >
                <AbcIcon className="text-green-500" />
                <h3>Create Test</h3>
              </div>
              <div
                onClick={() => setShowCreateJob(!showCreateJob)}
                className="flex gap-x-2 hover:bg-slate-200 py-1 px-3 rounded-full cursor-pointer"
              >
                <WorkIcon className="text-amber-900" />
                <h3>Create Job</h3>
              </div>
            </div>
          </div>
          {(showCreateTest || showCreateJob) && (
            <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-slate-900 opacity-75"></div>
          )}

          {showCreateTest && (
            <Createtest
              showCreateTest={showCreateTest}
              setShowCreateTest={setShowCreateTest}
            />
          )}

          {showCreateJob && (
            <CreateJob
              showCreateJob={showCreateJob}
              setShowCreateJob={setShowCreateJob}
            />
          )}

          <span className="flex w-full border-b-2 my-3  border-gray-300 border-solid"></span>
        </div>
      )}

      <div>
        {allposts !== null ? (
          allposts.map((index, post) => {
            return (
              <div>
                <Post
                  key={index}
                  post={post}
                  userid={user.uid}
                  name={post.name}
                />
              </div>
            );
          })
        ) : (
          <div>Loading </div>
        )}
      </div>
    </div>
  );
}

export default Feed;
