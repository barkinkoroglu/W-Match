import React, { useEffect, useState } from "react";
import RecommendedJob from "../components/Job/RecommendedJob";
import SavedJob from "../components/Job/SavedJob";
import Navbar from "../components/Navbar";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AbcIcon from "@mui/icons-material/Abc";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
function Jobs() {
  const [selectFunction, setSelectFunction] = useState(0);
  return (
    <div>
      <Navbar />
      <div className="bg-gray-50">
        <div className="flex max-w-6xl px-3 pt-3 mx-auto  min-h-[calc(100vh-60px)] ">
          <div className="flex-[0.25]">
            <div className="bg-white rounded-lg mr-2 flex flex-col justify-start items-start gap-y-3 p-2 shadow-sm ">
              <button
                onClick={() => setSelectFunction(0)}
                className="flex items-center gap-x-2 hover:underline cursor-pointer"
              >
                <WorkOutlineIcon
                  sx={{ fontSize: 20 }}
                  className="text-gray-500"
                />
                <h1 className="font-medium">Jobs</h1>
              </button>
              {/* <button
                onClick={() => setSelectFunction(1)}
                className="flex items-center gap-x-2 hover:underline cursor-pointer "
              >
                <BookmarkBorderIcon
                  sx={{ fontSize: 20 }}
                  className="text-gray-500"
                />
                <h1 className="font-medium">My jobs</h1>
              </button> */}
              <button
                onClick={() => setSelectFunction(2)}
                className="flex items-center gap-x-2 hover:underline cursor-pointer"
              >
                <AbcIcon sx={{ fontSize: 20 }} className="text-gray-500" />
                <h1 className="font-medium">Tests</h1>
              </button>
            </div>
          </div>
          {selectFunction === 0 && <RecommendedJob />}
        </div>
      </div>
    </div>
  );
}

export default Jobs;
