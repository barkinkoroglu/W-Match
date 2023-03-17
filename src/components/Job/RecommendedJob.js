import React, { useEffect, useState } from "react";
import JobList from "./JobList";
import { getCompany } from "../../firebase";

function RecommendedJob() {
  const [recjob, setRecjob] = useState(null);
  console.log(recjob);
  useEffect(() => {
    const callRec = async () => {
      await getCompany().then((data) => {
        if (data) {
          setRecjob(data);
        }
      });
    };
    callRec();
  }, []);
  return (
    <div className="flex-[0.5]">
      <div className="bg-white p-4 rounded-lg mx-4 shadow-sm ">
        <div>
          <h1 className="font-medium text-lg leading-5	 ">
            Recommended for you
          </h1>
          <h1 className="font-light text-sm text-gray-400">
            Based on your profile and search history
          </h1>
        </div>
        <div>
          <JobList />
          <JobList />
          <JobList />
          <JobList />
          <JobList />
        </div>
      </div>
    </div>
  );
}

export default RecommendedJob;
