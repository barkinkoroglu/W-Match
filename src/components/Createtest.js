import React, { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Question from "./Question";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
function Createtest({ showCreateTest, setShowCreateTest }) {
  const [nquestions, setNquestions] = useState(0);
  const [time, setTime] = useState(0);
  const [qindex, setQindex] = useState(0);
  const [tname, setTname] = useState("");
  const [qinform, setQinform] = useState("");
  const [qscore, setQscore] = useState(0);
  const user = useSelector((state) => state.auth.user);
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
        <button
          onClick={() => setShowCreateTest(!showCreateTest)}
          className="absolute top-0 right-0 p-1 rounded-lg flex justify-center items-center hover:bg-slate-400"
        >
          <CloseIcon />
        </button>
      </div>
      {qindex === 0 ? (
        <div className=" p-2 flex flex-col gap-y-1">
          <div className="flex items-center gap-x-2 justify-between">
            <h1>How many questions will you ask?</h1>
            <input
              placeholder="Number of Questions "
              className=" border p-1 rounded-lg"
              type="text"
              onChange={(e) => setNquestions(e.currentTarget.value)}
              value={nquestions}
            />
          </div>

          <div className="flex items-center gap-x-2 justify-between">
            <h1>How long will the test take?</h1>
            <input
              placeholder="Time (in seconds) "
              className=" border p-1 rounded-lg"
              type="text"
              onChange={(e) => setTime(e.currentTarget.value)}
              value={time}
            />
          </div>

          <div className="flex items-center gap-x-2 justify-between">
            <h1>How many points will each question be?</h1>
            <input
              placeholder="Question Score "
              className=" border p-1 rounded-lg"
              type="text"
              onChange={(e) => setQscore(e.currentTarget.value)}
              value={qscore}
            />
          </div>

          <div className="flex items-center gap-x-2 justify-between">
            <h1>Test Name:</h1>
            <input
              placeholder="Test Name "
              className=" border p-1 rounded-lg"
              type="text"
              onChange={(e) => setTname(e.currentTarget.value)}
              value={tname}
            />
          </div>

          <div className="flex items-center gap-x-2">
            <h1>Information about the test</h1>
            <textarea
              className=" flex flex-1 px-2 py-1 outline-none border rounded-lg  overflow-y-auto resize-none scrollbar-hide text-sm"
              type="text"
              onChange={(e) => setQinform(e.currentTarget.value)}
              value={qinform}
            ></textarea>
          </div>
        </div>
      ) : (
        <div className="flex flex-col overflow-y-auto w-full scrollbar  items-start">
          <Question
            nquestions={nquestions}
            setShowCreateTest={setShowCreateTest}
            time={time}
            companyname={user.companyname}
            email={user.email}
            tname={tname}
            qinform={qinform}
            qscore={qscore}
            username={user.username}
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
