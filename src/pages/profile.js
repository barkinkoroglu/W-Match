import React from "react";
import Navbar from "../components/Navbar";
import UserProfile from "../components/Profile/UserProfile";
import Widget from "../components/Widget";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserInfo } from "../firebase";
import { useParams } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const param = useParams();
  console.log("Param bilgisi", param.id);
  console.log("USERRR", user);
  useEffect(() => {
    const callValue = async () => {
      await getUserInfo(param.id)
        .then((user) => {
          setUser(user);
        })
        .catch((err) => {
          setUser(false);
        });
    };
    callValue();
  }, [param.id]);
  if (user === false) {
    return <div>Profile not found.</div>;
  }
  if (user === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <Navbar />
      <div className=" bg-gray-50">
        <div className="flex max-w-6xl px-3 pt-3 mx-auto  ">
          <UserProfile user={user} />
          <Widget />
        </div>
      </div>
    </div>
  );
}

export default Profile;
