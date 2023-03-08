import React, { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Question from "./Question";
import CloseIcon from "@mui/icons-material/Close";
function Createtest({ showCreateTest, setShowCreateTest }) {
  const [nquestions, setNquestions] = useState(0);
  const [time, setTime] = useState(0);
  const [qindex, setQindex] = useState(0);

  // const Questions = () => {
  //   const options = [];
  //   for (let index = 0; index < nquestions; index++) {
  //     options.push(<Question />);
  //   }
  //   return options;
  // };
  return (
    <div className="fixed flex flex-col items-center z-50 top-5 left-0 right-0 mx-auto max-w-xl max-h-[calc(100vh-64px)] px-4 py-3 rounded bg-white ">
      <div className=" relative py-2 text-lg font-medium border-b-2 w-full text-center">
        Create a Test
        <div
          onClick={() => setShowCreateTest(!showCreateTest)}
          className="absolute top-0 right-0 p-1 rounded-lg flex justify-center items-center hover:bg-slate-400"
        >
          <CloseIcon />
        </div>
      </div>
      {qindex === 0 ? (
        <div className=" p-2 flex flex-col gap-y-1">
          <div className="flex items-center gap-x-2">
            <h1>How many questions will you ask?</h1>
            <input
              placeholder="Number of Questions "
              className=" border p-1 rounded-lg"
              type="text"
              onChange={(e) => setNquestions(e.currentTarget.value)}
              value={nquestions}
            />
          </div>

          <div className="flex items-center gap-x-2">
            <h1>How long will the test take?</h1>
            <input
              placeholder="Time "
              className=" border p-1 rounded-lg"
              type="text"
              onChange={(e) => setTime(e.currentTarget.value)}
              value={time}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col overflow-y-auto w-full scrollbar  items-start">
          <Question
            nquestions={nquestions}
            setShowCreateTest={setShowCreateTest}
          />
        </div>
      )}
      <div className="flex  gap-x-10 mt-3 w-full relative justify-center">
        <button
          onClick={() => setQindex(0)}
          className="p-1 hover:bg-slate-500 rounded-full flex items-center justify-center disabled:opacity-10 disabled:hover:bg-white"
          disabled={qindex === 0 && true}
        >
          <ArrowBackIosNewIcon />
        </button>
        <button
          onClick={() => setQindex(1)}
          className="p-1 hover:bg-slate-500 rounded-full flex items-center justify-center disabled:opacity-10 disabled:hover:bg-white"
          disabled={qindex === 1 && true}
        >
          <ArrowForwardIosIcon />
        </button>
      </div>
    </div>
  );
}

export default Createtest;
