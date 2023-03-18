import { Avatar } from "@mui/material";
import React from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useState, useEffect } from "react";
import { getCompanyInfo, applyJob } from "../../firebase";
import { useSelector } from "react-redux";

function JobList({ data }) {
  const [company, setCompany] = useState(null);
  const [isapply, setIsapply] = useState(false);
  const [datetime, setDatetime] = useState(null);

  const user = useSelector((state) => state.auth.user);
  const findPassedDay = () => {
    const al = Date.now();
    const temp = al / 86400000;
    const temp2 = data.time / 86400000;
    const result = Math.floor(temp - temp2);
    if (result !== 0) {
      setDatetime(result);
    } else {
      setDatetime("Today");
    }
  };
  useEffect(() => {
    const callRec = async () => {
      await getCompanyInfo(data.username).then((temp) => {
        if (temp) {
          setCompany(temp);
        }
      });
    };
    callRec();
    findPassedDay();
  }, [data.username]);

  const handleApply = async () => {
    await applyJob(data.username, user.uid, data.time);
    setIsapply(true);
  };
  return (
    <div className="relative last:border-none border-b-2 ">
      <div className="flex  justify-between pt-3 group  pb-2 ">
        <div className="flex gap-x-2   ">
          <div className="flex-1  j">
            <Avatar
              src={company?.ProfileUrl}
              sx={{ height: 50, width: 50 }}
              variant="square"
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <h1 className="group-hover:underline font-medium">
              {data.jobname}
            </h1>
            <h1 className="text-sm -mt-1 ">{data.name} </h1>
            <h1 className="text-xs text-gray-700 "> {data.information} </h1>

            <h1 className="text-xs text-gray-400 ">
              {" "}
              {datetime !== 0 ? `${datetime} days ago` : `${datetime}`}{" "}
            </h1>
          </div>
        </div>
        {/* <div className="flex p-1 rounded-full h-min hover:bg-slate-400 ">
          <BookmarkBorderIcon />
        </div> */}
        <button
          onClick={() => handleApply()}
          className="absolute bottom-1 right-0 px-2 py-1 text-sm bg-slate-300 rounded-lg disabled:bg-gray-100 disabled:text-gray-300 hover:bg-slate-400 transition-colors duration-300"
          disabled={isapply}
        >
          Apply
        </button>
      </div>
    </div>
  );
}

export default JobList;
