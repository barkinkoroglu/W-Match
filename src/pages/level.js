import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { createLevel } from "../firebase";

function Level() {
  const [dlevel, setDLevel] = useState("");
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const handleSelection = (e) => {
    setDLevel(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dlevel.length > 0 && user?.JobCategory) {
      await createLevel(user?.username, dlevel);
      navigate(`/test/${user?.JobCategory}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label
        for="levels"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Your Level
      </label>
      <select
        value={dlevel}
        defaultValue={"Select your level"}
        onChange={handleSelection}
        id="levels"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="Select your level" disabled>
          Select your level.
        </option>
        <option value="easy">easy</option>
        <option value="normal">nomal</option>
        <option value="difficult">difficult</option>
      </select>
      <button
        type="submit"
        class="bg-slate-500 text-center py-3 rounded hover:bg-slate-400 focus:outline-none my-1"
      >
        Start Your Test!
      </button>
    </form>
  );
}

export default Level;
