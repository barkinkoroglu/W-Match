import React from "react";
import RecommendedJob from "../components/Job/RecommendedJob";
import SavedJob from "../components/Job/SavedJob";
import Navbar from "../components/Navbar";

function Jobs() {
  return (
    <div>
      <Navbar />
      <div className="bg-gray-50">
        <div className="flex max-w-6xl px-3 pt-3 mx-auto  min-h-[calc(100vh-60px)] ">
          <SavedJob />
          <RecommendedJob />
        </div>
      </div>
    </div>
  );
}

export default Jobs;
