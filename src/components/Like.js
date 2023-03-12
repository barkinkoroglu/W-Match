import { Avatar } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getUserInfobyID } from "../firebase";
function Like({ likeid }) {
  const [data, setData] = useState({});
  console.log("Like data", data);

  const getData = async () => {
    setData(await getUserInfobyID(likeid));
  };
  useEffect(() => {
    getData();
  }, []);

  if (data === null) {
    return <div>Loading</div>;
  }
  console.log(likeid);
  return (
    <div className="flex gap-x-2 border-b-2 pb-3 border-gray-100">
      <div>
        <Avatar src={data.ProfileUrl} />
      </div>
      <div className="leading-5">
        <a
          href={`/profile/${data?.username}`}
          className="font-medium hover:underline "
        >
          {data?.name} {data?.lastname}
        </a>
        <h1 className="text-sm">{data?.jobfunct}</h1>
      </div>
    </div>
  );
}

export default Like;
