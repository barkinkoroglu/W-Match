import React from "react";
import CloseIcon from "@mui/icons-material/Close";
function CreateJob({ showCreateJob, setShowCreateJob }) {
  return (
    <div className="fixed flex flex-col z-50 top-5 left-0 right-0 mx-auto max-w-xl max-h-[calc(100vh-64px)] px-4 py-3 rounded bg-white ">
      <div className=" relative py-2 text-lg font-medium border-b-2 w-full text-center items-center ">
        Create a Job
        <div
          onClick={() => setShowCreateJob(!showCreateJob)}
          className="absolute top-0 right-0 p-1 rounded-lg flex justify-center items-center hover:bg-slate-400"
        >
          <CloseIcon />
        </div>
      </div>

      <div className="flex flex-col gap-y-3 p-2 justify-start">
        <div className="flex gap-x-3  ">
          <h1>Job:</h1>
          <input className="w-full outline-none border " type="text" />
        </div>
        <div className="flex gap-x-3 ">
          <h1>Information:</h1>
          <textarea
            className="flex flex-1 px-2 py-1 outline-none border rounded-lg  overflow-y-auto resize-none scrollbar-hide text-sm"
            name=""
            id=""
          ></textarea>
        </div>
        <div className="flex gap-x-3 ">
          <h1>Salary:</h1>
          <input className="w-full outline-none border " type="text" />
        </div>
      </div>
      <div className="flex  ">
        <button className="bg-slate-300  p-2 rounded-lg  w-full hover:bg-slate-400">
          Create Job
        </button>
      </div>
    </div>
  );
}

export default CreateJob;
