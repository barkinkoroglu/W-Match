import React, { useEffect, useRef, useState } from "react";
import TestElement from "../components/Test/TestElement";
import Data2 from "../questions/examquestion.json";
function Test() {
  const [data, setData] = useState([]);
  const [score, setScore] = useState(0);
  const [examtime, setExamtime] = useState(500);
  const timerId = useRef();
  const fetchJson = () => {
    fetch("../questions/examquestion.json")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((e) => console.log(e));
    console.log(data);
  };

  useEffect(() => {
    timerId.current = setInterval(() => {
      setExamtime((examtime) => examtime - 1);
    }, 1000);
    return () => clearInterval(timerId.current);
  }, []);

  useEffect(() => {
    if (examtime === 0) {
      clearInterval(timerId.current);
    }
  }, [examtime]);
  useEffect(() => {
    //fetchJson();
  }, []);

  return (
    <div className="min-h-screenh-screen   bg-gray-100 relative ">
      <div className="fixed right-4 top-4 bg-slate-300 px-4 py-3 rounded-full font-medium text-lg text-center  w-24">
        {examtime}
      </div>
      <div className="fixed right-4 top-1/2 bg-slate-300 px-6 py-5 rounded-full font-medium text-lg">
        {score}
      </div>
      <div className="flex max-w-6xl px-3 py-5 mx-auto bg-white flex-col gap-y-4   ">
        {Data2.map((record, index) => {
          return (
            <TestElement
              key={index}
              record={record}
              index={index}
              score={score}
              setScore={setScore}
            />
          );
        })}
      </div>
      <div className="flex max-w-6xl px-3 py-5 mx-auto bg-white justify-end">
        <button className=" p-2 px-3 bg-slate-200 rounded-full  text-lg text-gray-800 hover:bg-slate-400">
          {" "}
          Submit the answer
        </button>
      </div>
    </div>
  );
}

export default Test;
