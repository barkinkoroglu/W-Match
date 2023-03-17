import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  storage,
  changeCompanyProfilePhoto,
  changeUserProfilePhoto,
  changeCompanyBackProfilePhoto,
  changeUserBackProfilePhoto,
  userEditInformation,
  companyEditInformation,
  getUserInfo,
  fallowUser,
} from "../../firebase";
import CloseIcon from "@mui/icons-material/Close";
import Post from "../Post";
import { async } from "@firebase/util";
function UserProfile({ user, param }) {
  // console.log(user.wmatchTests);
  const ruser = useSelector((state) => state.auth.user);
  const [imageUpload, setImageUpload] = useState(null);
  const [backimageUpload, setBackImageUpload] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);
  const [openBackProfile, setOpenBackProfile] = useState(false);
  const [imageurl, setImageurl] = useState(null);
  const [openSettingProfile, setOpenSettingProfile] = useState(false);
  const [editName, setEditname] = useState("");
  const [editLname, setEditlname] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editAddress2, setEditAddress2] = useState("");
  const [prodata, setProdata] = useState(null);

  // console.log("PROFİLE USER INFO", prodata);
  useEffect(() => {
    getUserInfo(ruser.username).then((temp) => setProdata(temp));
  }, [ruser.username]);

  console.log("PROFİLE USER", user);
  const handleEditChange = async (e) => {
    e.preventDefault();
    editAddress === "" && setEditAddress(ruser.addressline1);
    editAddress2 === "" && setEditAddress2(ruser.addressline2);
    if (ruser.type === 1) {
      editName === "" && setEditname(ruser.name);
      editLname === "" && setEditlname(ruser.lastname);
      await userEditInformation(
        editName,
        editLname,
        editAddress,
        editAddress2,
        ruser.username
      );
    } else {
      editName === "" && setEditname(ruser.companyname);
      await companyEditInformation(
        editName,
        editAddress,
        editAddress2,
        ruser.username
      );
    }
  };
  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(
      storage,
      `images/${ruser.username}/${imageUpload.name + v4()}`
    );
    uploadBytes(imageRef, imageUpload).then((snaphsot) => {
      getDownloadURL(snaphsot.ref).then((url) => {
        if (ruser.type === 1) {
          changeUserProfilePhoto(ruser.username, url);
        } else {
          changeCompanyProfilePhoto(ruser.username, url);
        }
      });
    });

    //setOpenProfile(false);
  };

  const uploadBackImage = () => {
    if (backimageUpload == null) return;
    const imageRef2 = ref(
      storage,
      `background/${ruser.username}/${backimageUpload.name + v4()}`
    );
    uploadBytes(imageRef2, backimageUpload).then((snaphsot) => {
      getDownloadURL(snaphsot.ref).then((url) => {
        if (ruser.type === 1) {
          changeUserBackProfilePhoto(ruser.username, url);
        } else {
          changeCompanyBackProfilePhoto(ruser.username, url);
        }
      });
    });
    setOpenBackProfile(false);
  };
  // It will be changed according to user attributes
  const handleUpdateedit = () => {
    console.log("Test");
  };

  const handleFollowProfile = async () => {
    await fallowUser(user.username, ruser.username);
  };
  return (
    <div className="flex flex-[0.7] min-h-screen   flex-col mx-12 gap-y-3 pb-3 ">
      <div className="max-h-[490px] bg-white rounded-lg flex flex-col ">
        <div className=" flex flex-1 items-end relative min-h-[237px] ">
          <div className="p-2 relative group">
            {}
            <Avatar
              src={
                ruser.username === param.id ? ruser.ProfileUrl : user.ProfileUrl
              }
              sx={{
                width: "120px",
                height: "120px",
                objectFit: "contain",
                zIndex: "10",
              }}
              variant={"rounded"}
              className="border-2"
            />
            {ruser.username === param.id && (
              <button
                onClick={() => setOpenProfile(!openProfile)}
                className="absolute hidden group-hover:inline  bg-slate-200 top-2 right-2 z-10"
              >
                <SettingsIcon />
              </button>
            )}
          </div>

          {openProfile && (
            <div className=" ">
              <div className="fixed flex flex-col z-[51] top-5 left-0 right-0 mx-auto max-w-md max-h-[calc(100vh-64px)] px-4 py-3 gap-y-3 rounded bg-white items-center">
                <div className=" relative py-2 text-lg font-medium border-b-2 w-full text-center items-center ">
                  Upload Profile Photo
                  <button
                    onClick={() => setOpenProfile(!openProfile)}
                    className="absolute top-0 right-0 p-1 rounded-lg flex justify-center items-center hover:bg-slate-400"
                  >
                    <CloseIcon />
                  </button>
                </div>
                <input
                  type="file"
                  onChange={(e) => {
                    setImageUpload(e.target.files[0]);
                  }}
                />
                <button
                  onClick={() => uploadImage()}
                  className="bg-gray-300 px-2 py-1 rounded-lg hover:bg-slate-400"
                >
                  Upload Image
                </button>
              </div>
            </div>
          )}
          {(openBackProfile || openProfile || openSettingProfile) && (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-slate-800 opacity-40 z-50"></div>
          )}
          {/* BACKGROUND */}
          {openBackProfile && (
            <div className=" ">
              <div className="fixed flex flex-col z-[51] top-5 left-0 right-0 mx-auto max-w-md max-h-[calc(100vh-64px)] px-4 py-3 gap-y-3 rounded bg-white items-center">
                <div className=" relative py-2 text-lg font-medium border-b-2 w-full text-center items-center ">
                  Upload Background Photo
                  <button
                    onClick={() => setOpenBackProfile(!openBackProfile)}
                    className="absolute top-0 right-0 p-1 rounded-lg flex justify-center items-center hover:bg-slate-400"
                  >
                    <CloseIcon />
                  </button>
                </div>
                <input
                  type="file"
                  onChange={(e) => {
                    setBackImageUpload(e.target.files[0]);
                  }}
                />
                <button
                  onClick={() => uploadBackImage()}
                  className="bg-gray-300 px-2 py-1 rounded-lg hover:bg-slate-400"
                >
                  Upload Image
                </button>
              </div>
            </div>
          )}

          <img
            className="absolute top-0 left-0 w-full h-3/4 rounded-t-lg  "
            src={
              (ruser.username === param.id ? ruser.BackUrl : user.BackUrl) ||
              "https://img.freepik.com/free-vector/bedouins-walk-egypt-pyramids-camel-night-desert_107791-4619.jpg?w=1380&t=st=1673794053~exp=1673794653~hmac=590e998325efe77dd329ded70cdd636bc17bed5d6d585dd5722e2527cfdbd537"
            }
            alt=""
          />

          {ruser.username === param.id && (
            <button
              onClick={() => setOpenSettingProfile(!openSettingProfile)}
              className="absolute right-3 bottom-3 text-gray-400 p-1 rounded-full hover:bg-slate-700 cursor-pointer transition-colors duration-300 "
            >
              <SettingsIcon />
            </button>
          )}

          {ruser.type === 1 && ruser.username !== param.id && (
            <button
              className="absolute right-3 bottom-3 flex items-center text-gray-100 bg-slate-400 py-1 px-2 rounded-full hover:bg-slate-500 cursor-pointer transition-colors duration-300"
              onClick={() => handleFollowProfile()}
            >
              {prodata?.following.find((element) => element === param.id) ===
              undefined ? (
                <div className="flex items-center">
                  <AddIcon />
                  <h1>Follow</h1>
                </div>
              ) : (
                <div className="flex items-center">
                  <RemoveIcon />
                  <h1>Unfollow</h1>
                </div>
              )}
            </button>
          )}

          {openSettingProfile && (
            <div className=" ">
              <div className="fixed flex flex-col z-[51] top-5 left-0 right-0 mx-auto max-w-md max-h-[calc(100vh-64px)] px-4 py-3 gap-y-3 rounded bg-white items-center">
                <div className=" relative py-2  w-full text-center items-center ">
                  <h1 className="text-lg font-medium border-b-2">Edit</h1>

                  <form
                    onSubmit={(e) => handleEditChange(e)}
                    className="p-3 space-y-3 whitespace-nowrap"
                  >
                    {ruser?.type === 1 && (
                      <div className="flex flex-col gap-y-3">
                        <div className="flex gap-3 w-full">
                          <h1>Name:</h1>
                          <input
                            className=" border px-2 w-full"
                            defaultValue={ruser.name}
                            onChange={(e) => setEditname(e.target.value)}
                            type="text"
                          />
                        </div>
                        <div className="flex gap-3 w-full">
                          <h1>Lastname:</h1>
                          <input
                            className=" border px-2 w-full"
                            defaultValue={ruser.lastname}
                            onChange={(e) => setEditlname(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                    )}

                    {ruser?.type === 2 && (
                      <div className="flex flex-col gap-y-3">
                        <div className="flex gap-3 w-full">
                          <h1>CompanyName:</h1>
                          <input
                            className=" border px-2 w-full"
                            defaultValue={ruser.companyname}
                            onChange={(e) => setEditname(e.target.value)}
                            type="text"
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3 w-full ">
                      <h1 className="">Adress Line 1:</h1>
                      <input
                        className=" border px-2 w-full"
                        defaultValue={ruser.addressline1}
                        onChange={(e) => setEditAddress(e.target.value)}
                        type="text"
                      />
                    </div>
                    <div className="flex gap-3 w-full">
                      <h1>Adress Line 2:</h1>
                      <input
                        className=" border px-2 w-full"
                        defaultValue={ruser.addressline2}
                        onChange={(e) => setEditAddress2(e.target.value)}
                        type="text"
                      />
                    </div>
                    <button
                      onClick={() => handleUpdateedit()}
                      className="bg-gray-300 px-2 py-1 rounded-lg hover:bg-slate-400"
                    >
                      Change
                    </button>
                  </form>

                  <button
                    onClick={() => setOpenSettingProfile(false)}
                    className="absolute top-0 right-0 p-1 rounded-lg flex justify-center items-center hover:bg-slate-400"
                  >
                    <CloseIcon />
                  </button>
                </div>
              </div>
            </div>
          )}

          {ruser.username === param.id && (
            <div
              onClick={() => setOpenBackProfile(!openBackProfile)}
              className="absolute right-3 top-3 text-gray-400 py-[2px] pt-[1px] px-2 rounded-full hover:bg-slate-700 cursor-pointer bg-slate-100"
            >
              <AddAPhotoIcon
                sx={{
                  width: "13px",
                  height: "13px",
                  objectFit: "contain",
                }}
              />
            </div>
          )}
        </div>
        <div className="flex flex-1 p-2">
          {user.type === 1 ? (
            <div>
              <h1 className="text-lg font-medium">{`${user.name} ${user.lastname}`}</h1>
              <h1 className="text-gray-500 font-light">{user.jobfunct}</h1>
              <p className="text-gray-500 font-light text-sm">{user.country}</p>
              <div className="flex gap-x-2 pt-2">
                {user.wmatchTests.map((hero, index) => {
                  return (
                    <div
                      key={index}
                      className="py-1 px-2 bg-slate-300 rounded-full text-sm font-light"
                    >
                      {hero}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-lg font-medium">{user.companyname}</h1>
              <h1 className="text-gray-500 font-light">{user.about}</h1>
              <p className="text-gray-500 font-light text-sm">{user.country}</p>
            </div>
          )}
        </div>
      </div>
      <div className="p-2 bg-white rounded-lg flex flex-col gap-y-2">
        <h1 className="text-lg">About</h1>
        <p className="text-sm">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore, hic!
          Doloremque, corrupti obcaecati! Doloremque iure repellat enim
          distinctio deleniti excepturi non aspernatur perspiciatis error
        </p>
      </div>
      {/* Post Section will come here */}

      {user.type === 2 && (
        <div className="p-2 bg-white rounded-lg flex flex-col gap-y-2">
          <h1 className="text-lg">Posts</h1>
          <div>
            {user.posts.length > 0 ? (
              user.posts.sort((a, b) => b.time - a.time) &&
              user.posts.map((post, index) => {
                return (
                  <Post
                    key={index}
                    post={post}
                    user={ruser}
                    name={post.name}
                    username={ruser?.username}
                    about={ruser?.jobfunct}
                    //It will change for company comments
                    uname={`${ruser?.name} ${ruser?.lastname}`}
                  />
                );
              })
            ) : (
              <div className="font-medium">No Post to Show </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
