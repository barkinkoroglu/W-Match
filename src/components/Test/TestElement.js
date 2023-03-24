import React, { useEffect, useState } from "react";

function TestElement({ record, index, score, setScore }) {
  const [chosen, setchosen] = useState("");
  let [flag, setFlag] = useState(false);
  const handleScore = () => {
    if (flag === true) {
      setScore(score - 5);
      setFlag(false);
    }
    if (chosen === record.correct) {
      setScore(score + 5);
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
        <p className="text-lg">{record.question}</p>
      </div>
      <div className=" inline-flex flex-col gap-y-2   ">
        <div
          onClick={() => setchosen("a")}
          className={`px-2 py-1 rounded-lg w-max hover:bg-slate-500 bg-slate-300 cursor-pointer ${
            chosen === "a" ? "bg-slate-500" : ""
          }   `}
        >{`A-) ${record.a}`}</div>
        <div
          onClick={() => setchosen("b")}
          className={`px-2 py-1 rounded-lg w-max hover:bg-slate-500 bg-slate-300 cursor-pointer ${
            chosen === "b" ? "bg-slate-500" : ""
          }   `}
        >{`B-) ${record.b}`}</div>
        <div
          onClick={() => setchosen("c")}
          className={`px-2 py-1 rounded-lg w-max hover:bg-slate-500 bg-slate-300 cursor-pointer ${
            chosen === "c" ? "bg-slate-500" : ""
          }   `}
        >{`C-) ${record.c}`}</div>
        <div
          onClick={() => setchosen("d")}
          className={`px-2 py-1 rounded-lg w-max hover:bg-slate-500 bg-slate-300 cursor-pointer ${
            chosen === "d" ? "bg-slate-500" : ""
          }   `}
        >{`D-) ${record.d}`}</div>
      </div>
    </div>
  );
}

export default TestElement;
