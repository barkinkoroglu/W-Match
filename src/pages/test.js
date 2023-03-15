import React, { useEffect, useRef, useState } from "react";
import TestElement from "../components/Test/TestElement";
import Data2 from "../questions/examquestion.json";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { updateExam } from "../firebase";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
function Test() {
  const [data, setData] = useState([]);
  const [score, setScore] = useState(0);
  const [disButton, setdisButton] = useState(false);
  const [cquestion, setCquestion] = useState(0);
  const [examtime, setExamtime] = useState(99999999);
  const timerId = useRef();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  console.log("User bilgisi", user);
  const param = useParams();
  console.log("Param bilgisi", param.id);
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
      if (score >= 45) {
        updateExam(user.uid, param.id);
      }
      clearInterval(timerId.current);
      navigate(`/home`);
    }
  }, [examtime]);

  const handleSubmit = () => {
    if (score >= 45) {
      updateExam(user.uid, param.id);
    }
    navigate(`/home`);
  };

  const handleCurrentIndex = () => {
    setCquestion(cquestion + 1);
    if (Data2.length === cquestion + 2) {
      setdisButton(true);
    }
  };

  return (
    <div className="h-screen   bg-gray-200 relative flex flex-col  items-center gap-y-3   ">
      <div className="absolute right-4 top-1 bg-slate-300 px-4 py-2 rounded-full font-medium text-lg text-center z-10  w-24">
        {examtime}
      </div>
      <div className="fixed right-4 top-1/2 bg-slate-300 px-6 py-5 rounded-full font-medium text-lg">
        {score}
      </div>
      <h1 className="text-3xl font-semibold">
        {cquestion + 1} / {Data2.length}
      </h1>
      <div className="max-w-2xl mx-auto w-full shadow-md relative">
        <div className="flex rounded-lg px-3 py-5  bg-white flex-col gap-y-4    ">
          <TestElement
            index={cquestion}
            record={Data2[cquestion]}
            score={score}
            setScore={setScore}
          />
        </div>
        <div className="flex  px-3 py-5 mx-auto bg-white justify-center ">
          <button
            className="p-2 bg-slate-300 hover:bg-slate-400 rounded-full disabled:opacity-40 disabled:hover:bg-slate-300"
            onClick={() => handleCurrentIndex()}
            disabled={disButton}
          >
            <ArrowForwardIosIcon />{" "}
          </button>
          <button
            onClick={() => handleSubmit()}
            className=" p-2 px-3 bg-slate-200 rounded-full absolute right-0 bottom-0 my-5 mx-3  text-lg text-gray-800 hover:bg-slate-400 "
          >
            {" "}
            Submit the answer
          </button>
        </div>
      </div>
    </div>
  );
}

export default Test;
