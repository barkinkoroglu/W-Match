import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCompanyTest } from "../firebase";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CompanyTestElement from "../components/Test/CompanyTestElement";
import { useSelector } from "react-redux";
import { updateCompanyTestScore } from "../firebase";

function CompanyTest() {
  const param = useParams();
  const [data, setData] = useState(null);
  const [examtime, setExamtime] = useState(null);
  const [score, setScore] = useState(0);
  const [disButton, setdisButton] = useState(false);
  const [cquestion, setCquestion] = useState(0);
  const [questpoint, setQuestpoint] = useState(0);
  const navigate = useNavigate();
  const timerId = useRef();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    getCompanyTest(param.id, param.id2).then((temp) => {
      setData(temp);
      setExamtime(parseInt(temp.qtime));
      setQuestpoint(parseInt(temp.qscore));
    });

    timerId.current = setInterval(() => {
      setExamtime((examtime) => examtime - 1);
    }, 1000);
    return () => clearInterval(timerId.current);
  }, [param]);

  useEffect(() => {
    if (examtime === 0) {
      updateCompanyTestScore(data.username, user.uid, param.id2, score);
      clearInterval(timerId.current);
      navigate(`/home`);
    }
  }, [examtime]);
  if (data === null) {
    return <div>Loading...</div>;
  }

  const handleCurrentIndex = () => {
    setCquestion(cquestion + 1);

    if (data.questions.length === cquestion + 2) {
      setdisButton(true);
    }
  };

  const handleSubmit = () => {
    updateCompanyTestScore(data.username, user.uid, param.id2, score);
    navigate(`/home`);
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
        {cquestion + 1} / {data?.questions?.length}
      </h1>
      <div className="max-w-2xl mx-auto w-full shadow-md relative">
        <div className="flex rounded-lg px-3 py-5  bg-white flex-col gap-y-4    ">
          <CompanyTestElement
            index={cquestion}
            record={data.questions[cquestion]}
            score={score}
            setScore={setScore}
            questpoint={questpoint}
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

export default CompanyTest;
