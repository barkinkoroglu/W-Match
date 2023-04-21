import { Avatar } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getUserInfo } from "../firebase";

function SideBarElement(prop) {
  const [data, setData] = useState({});
  const getData = async () => {
    await getUserInfo(prop.data).then((temp) => setData(temp));
  };
  useEffect(() => {
    getData();
  }, []);

  if (data === null) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex gap-x-2 border-b-2 pb-3 border-gray-100">
      <div>
        <Avatar src={data.ProfileUrl} />
      </div>
      {prop.type === 2}
      {
        <div className="flex  ">
          <a href={`/profile/${data?.username}`} className=" hover:underline ">
            {data?.name} {data?.lastname}
          </a>
        </div>
      }
      {prop.type === 1}
      {
        <div className="flex  ">
          <a href={`/profile/${data?.username}`} className=" hover:underline ">
            {data?.companyname}
          </a>
        </div>
      }
    </div>
  );
}

export default SideBarElement;
