import React from "react";

function Question() {
  return (
    <div className="w-full my-1 pb-3  border-b-2 border-gray-300 px-2">
      <div className="flex gap-x-3 mb-2">
        <h1>Question 1.</h1>
        <textarea
          className="flex flex-1 px-2 py-1 outline-none border rounded-lg  overflow-y-auto resize-none scrollbar-hide text-sm"
          name=""
          id=""
        ></textarea>
      </div>
      <div className="flex flex-col gap-y-3">
        <div className="flex gap-x-3 ">
          <h1>Option 1:</h1>
          <textarea
            className="flex flex-1 px-2 py-1 outline-none border rounded-lg  overflow-y-auto resize-none scrollbar-hide text-sm"
            name=""
            id=""
            rows="1"
          />
          <input type="checkbox" name="hey" id="" />
        </div>
        <div className="flex gap-x-3">
          <h1>Option 2:</h1>
          <textarea
            className="flex flex-1 px-2 py-1 outline-none border rounded-lg  overflow-y-auto resize-none scrollbar-hide text-sm"
            name=""
            id=""
            rows="1"
          />
          <input type="checkbox" name="hey" id="" />
        </div>
        <div className="flex gap-x-3">
          <h1>Option 3:</h1>
          <textarea
            className="flex flex-1 px-2 py-1 outline-none border rounded-lg  overflow-y-auto resize-none scrollbar-hide text-sm"
            name=""
            id=""
            rows="1"
          />
          <input type="checkbox" name="hey" id="" />
        </div>
        <div className="flex gap-x-3">
          <h1>Option 4:</h1>
          <textarea
            className="flex flex-1 px-2 py-1 outline-none border rounded-lg  overflow-y-auto resize-none scrollbar-hide text-sm"
            name=""
            id=""
            rows="1"
          />
          <input type="checkbox" name="hey" id="" />
        </div>
      </div>
    </div>
  );
}

export default Question;
