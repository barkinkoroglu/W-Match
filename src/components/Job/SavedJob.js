import React from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FileUploadIcon from "@mui/icons-material/FileUpload";
function SavedJob() {
  return (
    <div className="flex-[0.25]">
      <div className="bg-white rounded-lg mr-2 flex flex-col gap-y-2 p-2 shadow-sm ">
        <div className="flex items-center gap-x-2 hover:underline cursor-pointer">
          <BookmarkIcon sx={{ fontSize: 20 }} className="text-gray-500" />
          <h1 className="font-medium">My jobs</h1>
        </div>
      </div>
    </div>
  );
}

export default SavedJob;
