import React, { useEffect, useState } from "react";

function CompanyTestElement({ record, index, score, setScore, questpoint }) {
  const [chosen, setchosen] = useState("");
  let [flag, setFlag] = useState(false);
  const handleScore = () => {
    if (flag === true) {
      setScore(score - questpoint);
      setFlag(false);
    }
    if (chosen === record?.correct) {
      setScore(score + questpoint);
      setFlag(true);
    }
  };

  useEffect(() => {
    console.log(chosen);
    handleScore();
  }, [chosen]);

  useEffect(() => {
    setFlag(false);
    setchosen("");
  }, [index]);

  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex gap-x-1 items-center">
        <h1 className="font-medium">{`${index + 1}. `}</h1>
        <p className="text-lg">{record?.question}</p>
      </div>
      <div className=" inline-flex flex-col gap-y-2   ">
        <div
          onClick={() => setchosen("option1")}
          className={`px-2 py-1 rounded-lg w-max hover:bg-slate-500 bg-slate-300 cursor-pointer ${
            chosen === "option1" ? "bg-slate-500" : ""
          }   `}
        >{`A-) ${record?.option1}`}</div>
        <div
          onClick={() => setchosen("option2")}
          className={`px-2 py-1 rounded-lg w-max hover:bg-slate-500 bg-slate-300 cursor-pointer ${
            chosen === "option2" ? "bg-slate-500" : ""
          }   `}
        >{`B-) ${record?.option2}`}</div>
        <div
          onClick={() => setchosen("option3")}
          className={`px-2 py-1 rounded-lg w-max hover:bg-slate-500 bg-slate-300 cursor-pointer ${
            chosen === "option3" ? "bg-slate-500" : ""
          }   `}
        >{`C-) ${record?.option3}`}</div>
        <div
          onClick={() => setchosen("option4")}
          className={`px-2 py-1 rounded-lg w-max hover:bg-slate-500 bg-slate-300 cursor-pointer ${
            chosen === "option4" ? "bg-slate-500" : ""
          }   `}
        >{`D-) ${record?.option4}`}</div>
      </div>
    </div>
  );
}

export default CompanyTestElement;
