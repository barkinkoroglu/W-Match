import { Avatar } from "@mui/material";
import React, { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  storage,
  changeCompanyProfilePhoto,
  changeUserProfilePhoto,
  changeCompanyBackProfilePhoto,
  changeUserBackProfilePhoto,
} from "../../firebase";
import CloseIcon from "@mui/icons-material/Close";

function UserProfile({ user, param }) {
  // console.log(user.wmatchTests);
  const ruser = useSelector((state) => state.auth.user);
  const [imageUpload, setImageUpload] = useState(null);
  const [backimageUpload, setBackImageUpload] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);
  const [openBackProfile, setOpenBackProfile] = useState(false);
  const [imageurl, setImageurl] = useState(null);
  const [openSettingProfile, setOpenSettingProfile] = useState(false);

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

    setOpenProfile(false);
  };

  const uploadBackImage = () => {
    // if (backimageUpload == null) return;
    // const imageRef2 = ref(
    //   storage,
    //   `background/${ruser.username}/${backimageUpload.name + v4()}`
    // );
    // uploadBytes(imageRef2, backimageUpload).then((snaphsot) => {
    //   getDownloadURL(snaphsot.ref).then((url) => {
    //     if (ruser.type === 1) {
    //       changeUserBackProfilePhoto(ruser.username, url);
    //     } else {
    //       changeCompanyBackProfilePhoto(ruser.username, url);
    //     }
    //   });
    // });
    // setOpenBackProfile(false);
  };
  // It will be changed according to user attributes
  const handleUpdateedit = () => {
    console.log("Test");
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
              className="absolute right-3 bottom-3 text-gray-400 p-1 rounded-full hover:bg-slate-700 cursor-pointer "
            >
              <SettingsIcon />
            </button>
          )}
          {openSettingProfile && (
            <div className=" ">
              <div className="fixed flex flex-col z-[51] top-5 left-0 right-0 mx-auto max-w-md max-h-[calc(100vh-64px)] px-4 py-3 gap-y-3 rounded bg-white items-center">
                <div className=" relative py-2  w-full text-center items-center ">
                  <h1 className="text-lg font-medium border-b-2">Edit</h1>

                  <div className="p-3 space-y-3 whitespace-nowrap">
                    <div className="flex gap-3 w-full">
                      <h1>Email:</h1>
                      <input
                        className=" border px-2 w-full"
                        defaultValue={ruser.email}
                        type="text"
                      />
                    </div>
                    <div className="flex gap-3 w-full ">
                      <h1 className="">Adress Line 1:</h1>
                      <input
                        className=" border px-2 w-full"
                        defaultValue={ruser.addressline1}
                        type="text"
                      />
                    </div>
                    <div className="flex gap-3 w-full">
                      <h1>Adress Line 2:</h1>
                      <input
                        className=" border px-2 w-full"
                        defaultValue={ruser.addressline2}
                        type="text"
                      />
                    </div>
                    <div className="flex gap-3 w-full">
                      <h1>About</h1>
                      <input
                        className=" border px-2 w-full"
                        defaultValue={ruser.about}
                        type="text"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setOpenSettingProfile(false)}
                    className="absolute top-0 right-0 p-1 rounded-lg flex justify-center items-center hover:bg-slate-400"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <button
                  onClick={() => handleUpdateedit()}
                  className="bg-gray-300 px-2 py-1 rounded-lg hover:bg-slate-400"
                >
                  Change
                </button>
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
    </div>
  );
}

export default UserProfile;
