import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useSelector, useDispatch } from 'react-redux';
import { v4 } from 'uuid';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
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
  changeUserCV,
  getAllPostbyname,
} from '../../firebase';
import CloseIcon from '@mui/icons-material/Close';
import Post from '../Post';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { UpdateCompanySchema, UpdateUserSchema } from '../../validation/index';
import { getPosts } from '../../store/post';
import { Link } from 'react-router-dom';

function UserProfile({ user, param }) {
  const ruser = useSelector((state) => state.auth.user);
  const [imageUpload, setImageUpload] = useState(null);
  const [backimageUpload, setBackImageUpload] = useState(null);
  const [cvupload, setCvupload] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);
  const [openBackProfile, setOpenBackProfile] = useState(false);
  const [openCVedit, setOpenCVedit] = useState(false);
  const [openSettingProfile, setOpenSettingProfile] = useState(false);
  const [prodata, setProdata] = useState(null);
  const [allposts, setAllPost] = useState([]);
  const dispatch = useDispatch();
  console.log('BÜTÜN POSTLAR', user.uid);
  const refreshData = async () => {
    await getAllPostbyname(user)
      .then((data) => {
        dispatch(getPosts(data));
        setAllPost(data);
      })
      .catch((error) => console.log('ERROR', error));
  };
  useEffect(() => {
    getUserInfo(ruser.username).then((temp) => setProdata(temp));
    refreshData();
  }, [ruser.username]);

  const handleEdit = async (values, actions) => {
    if (ruser.type === 1) {
      await userEditInformation(
        values.jobfunct,
        values.longabout,
        values.email,
        values.adressline1,
        values.adressline2,
        ruser.username
      );
    } else {
      console.log(values);
      await companyEditInformation(
        values.companyname,
        values.about,
        values.longabout,
        values.email,
        values.adressline1,
        values.adressline2,
        ruser.username
      );
    }

    setOpenSettingProfile(false);
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
          changeUserProfilePhoto(ruser.username, url).then(() =>
            getUserInfo(ruser.username).then((temp) => setProdata(temp))
          );
        } else {
          changeCompanyProfilePhoto(ruser.username, url).then(() =>
            getUserInfo(ruser.username).then((temp) => setProdata(temp))
          );
        }
      });
    });
    setOpenProfile(false);
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
          changeUserBackProfilePhoto(ruser.username, url).then(() =>
            getUserInfo(ruser.username).then((temp) => setProdata(temp))
          );
        } else {
          changeCompanyBackProfilePhoto(ruser.username, url).then(() =>
            getUserInfo(ruser.username).then((temp) => setProdata(temp))
          );
        }
      });
    });
    setOpenBackProfile(false);
  };

  const uploadCVfile = () => {
    if (cvupload == null) return;
    const cvRef = ref(storage, `CV/${ruser.username}/${v4() + cvupload.name}`);
    uploadBytes(cvRef, cvupload).then((snaphsot) => {
      getDownloadURL(snaphsot.ref).then((url) => {
        changeUserCV(ruser.username, url).then(() =>
          getUserInfo(ruser.username).then((temp) => setProdata(temp))
        );
      });
    });
    setOpenCVedit(false);
  };

  const handleFollowProfile = async () => {
    await fallowUser(user.username, ruser.username).then(() => {
      getUserInfo(ruser.username).then((temp) => setProdata(temp));
    });
  };
  return (
    <div className='flex flex-[0.7]   md:min-h-screen   flex-col mx-12 gap-y-3 pb-3 '>
      <div className='max-h-[490px] bg-white rounded-lg flex flex-col '>
        <div className=' flex flex-1 items-end relative min-h-[237px] '>
          <div className='p-2 relative group'>
            {}
            <Avatar
              src={
                ruser.username === param.id
                  ? prodata?.ProfileUrl || ruser.ProfileUrl
                  : user.ProfileUrl
              }
              sx={{
                width: '120px',
                height: '120px',
                objectFit: 'contain',
                zIndex: '10',
              }}
              variant={'rounded'}
              className='border-2'
            />
            {ruser.username === param.id && (
              <button
                onClick={() => setOpenProfile(!openProfile)}
                className='absolute hidden group-hover:inline  bg-slate-200 top-2 right-2 z-10'
              >
                <SettingsIcon />
              </button>
            )}
          </div>

          {openProfile && (
            <div className=' '>
              <div className='fixed flex flex-col z-[51] top-5 left-0 right-0 mx-auto max-w-md max-h-[calc(100vh-64px)] px-4 py-3 gap-y-3 rounded bg-white items-center'>
                <div className=' relative py-2 text-lg font-medium border-b-2 w-full text-center items-center '>
                  Upload Profile Photo
                  <button
                    onClick={() => setOpenProfile(!openProfile)}
                    className='absolute top-0 right-0 p-1 rounded-lg flex justify-center items-center hover:bg-slate-400'
                  >
                    <CloseIcon />
                  </button>
                </div>
                <input
                  type='file'
                  onChange={(e) => {
                    setImageUpload(e.target.files[0]);
                  }}
                />
                <button
                  onClick={() => uploadImage()}
                  className='bg-gray-300 px-2 py-1 rounded-lg hover:bg-slate-400'
                >
                  Upload Image
                </button>
              </div>
            </div>
          )}
          {(openBackProfile ||
            openProfile ||
            openSettingProfile ||
            openCVedit) && (
            <div className='fixed top-0 left-0 right-0 bottom-0 bg-slate-800 opacity-40 z-50'></div>
          )}
          {/* BACKGROUND */}
          {openBackProfile && (
            <div className=' '>
              <div className='fixed flex flex-col z-[51] top-5 left-0 right-0 mx-auto max-w-md max-h-[calc(100vh-64px)] px-4 py-3 gap-y-3 rounded bg-white items-center'>
                <div className=' relative py-2 text-lg font-medium border-b-2 w-full text-center items-center '>
                  Upload Background Photo
                  <button
                    onClick={() => setOpenBackProfile(!openBackProfile)}
                    className='absolute top-0 right-0 p-1 rounded-lg flex justify-center items-center hover:bg-slate-400'
                  >
                    <CloseIcon />
                  </button>
                </div>
                <input
                  type='file'
                  onChange={(e) => {
                    setBackImageUpload(e.target.files[0]);
                  }}
                />
                <button
                  onClick={() => uploadBackImage()}
                  className='bg-gray-300 px-2 py-1 rounded-lg hover:bg-slate-400'
                >
                  Upload Image
                </button>
              </div>
            </div>
          )}

          <img
            className='absolute top-0 left-0 w-full h-3/4 rounded-t-lg  '
            src={
              (ruser.username === param.id ? ruser.BackUrl : user.BackUrl) ||
              require('../../images/defaultcover2.jpg')
            }
            alt=''
          />

          {ruser.username === param.id && (
            <button
              onClick={() => setOpenSettingProfile(!openSettingProfile)}
              className='absolute right-3 bottom-3 text-gray-400 p-1 rounded-full hover:bg-slate-700 cursor-pointer transition-colors duration-300 '
            >
              <SettingsIcon />
            </button>
          )}

          {ruser.type === 1 && ruser.username !== param.id && (
            <button
              className='absolute right-3 bottom-3 flex items-center text-gray-100 bg-slate-400 py-1 px-2 rounded-full hover:bg-slate-500 cursor-pointer transition-colors duration-300'
              onClick={() => handleFollowProfile()}
            >
              {prodata?.following.find((element) => element === param.id) ===
              undefined ? (
                <div className='flex items-center'>
                  <AddIcon />
                  <h1>Follow</h1>
                </div>
              ) : (
                <div className='flex items-center'>
                  <RemoveIcon />
                  <h1>Unfollow</h1>
                </div>
              )}
            </button>
          )}

          {openSettingProfile && (
            <div className=' '>
              <div className='fixed flex flex-col z-[51] top-5 left-0 right-0 mx-auto max-w-md max-h-[calc(100vh-64px)] px-4 py-3 gap-y-3 rounded bg-white items-center'>
                <div className=' relative py-2  w-full text-center items-center '>
                  <h1 className='text-lg font-medium border-b-2'>Edit</h1>

                  {ruser?.type === 1 && (
                    <Formik
                      validationSchema={UpdateUserSchema}
                      initialValues={{
                        jobfunct: ruser.jobfunct,
                        longabout: ruser.longabout,
                        email: ruser.email,
                        adressline1: ruser.addressline1,
                        adressline2: ruser.addressline2,
                      }}
                      onSubmit={handleEdit}
                    >
                      {({
                        isSubmitting,
                        isValid,
                        dirty,
                        values,
                        errors,
                        touched,
                        handleChange,
                      }) => (
                        <Form>
                          <div className='flex flex-col gap-y-3 py-2 '>
                            <div className='flex gap-3 w-full'>
                              <h1>About:</h1>
                              <Field
                                className=' border px-2 w-full'
                                name='jobfunct'
                                onChange={handleChange}
                                type='text'
                              />
                            </div>
                            {errors.jobfunct && touched.jobfunct && (
                              <div className=' text-red-600'>
                                {errors.jobfunct}
                              </div>
                            )}

                            <div className='flex gap-3 w-full'>
                              <h1>Detailed:</h1>
                              <Field
                                className=' border px-2 w-full'
                                name='longabout'
                                onChange={handleChange}
                                type='text'
                              />
                            </div>
                            {errors.longabout && touched.longabout && (
                              <div className=' text-red-600'>
                                {errors.longabout}
                              </div>
                            )}

                            <div className='flex gap-3 w-full'>
                              <h1>Email:</h1>
                              <Field
                                className=' border px-2 w-full'
                                name='email'
                                onChange={handleChange}
                                type='text'
                              />
                            </div>
                            {errors.email && touched.email && (
                              <div className=' text-red-600'>
                                {errors.email}
                              </div>
                            )}

                            <div className='flex gap-3 w-full'>
                              <h1>Adressline:</h1>
                              <Field
                                className=' border px-2 w-full'
                                name='adressline1'
                                onChange={handleChange}
                                type='text'
                              />
                            </div>
                            {errors.adressline1 && touched.adressline1 && (
                              <div className=' text-red-600'>
                                {errors.adressline1}
                              </div>
                            )}

                            <div className='flex gap-3 w-full whitespace-nowrap'>
                              <h1>Adressline 2:</h1>
                              <Field
                                className=' border px-2 w-full'
                                name='adressline2'
                                onChange={handleChange}
                                type='text'
                              />
                            </div>
                            {errors.adressline2 && touched.adressline2 && (
                              <div className=' text-red-600'>
                                {errors.adressline2}
                              </div>
                            )}

                            <button
                              type='submit'
                              className='bg-gray-300 px-2 py-1 rounded-lg hover:bg-slate-400'
                            >
                              Change
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  )}

                  {ruser?.type === 2 && (
                    <Formik
                      validationSchema={UpdateCompanySchema}
                      initialValues={{
                        companyname: ruser.companyname,
                        about: ruser.about,
                        longabout: ruser.longabout,
                        email: ruser.email,
                        adressline1: ruser.addressline1,
                        adressline2: ruser.addressline2,
                      }}
                      onSubmit={handleEdit}
                    >
                      {({
                        isSubmitting,
                        isValid,
                        dirty,
                        values,
                        errors,
                        touched,
                        handleChange,
                      }) => (
                        <Form>
                          <div className='flex flex-col gap-y-3 py-2 '>
                            <div className='flex gap-3 w-full'>
                              <h1>Name:</h1>
                              <Field
                                className=' border px-2 w-full'
                                name='companyname'
                                onChange={handleChange}
                                type='text'
                              />
                            </div>
                            {errors.companyname && touched.companyname && (
                              <div className=' text-red-600'>
                                {errors.companyname}
                              </div>
                            )}
                            <div className='flex gap-3 w-full'>
                              <h1>About:</h1>
                              <Field
                                className=' border px-2 w-full'
                                name='about'
                                onChange={handleChange}
                                type='text'
                              />
                            </div>
                            {errors.about && touched.about && (
                              <div className=' text-red-600'>
                                {errors.about}
                              </div>
                            )}

                            <div className='flex gap-3 w-full'>
                              <h1>Detailed:</h1>
                              <Field
                                className=' border px-2 w-full'
                                name='longabout'
                                onChange={handleChange}
                                type='text'
                              />
                            </div>
                            {errors.longabout && touched.longabout && (
                              <div className=' text-red-600'>
                                {errors.longabout}
                              </div>
                            )}

                            <div className='flex gap-3 w-full'>
                              <h1>Email:</h1>
                              <Field
                                className=' border px-2 w-full'
                                name='email'
                                onChange={handleChange}
                                type='text'
                              />
                            </div>
                            {errors.email && touched.email && (
                              <div className=' text-red-600'>
                                {errors.email}
                              </div>
                            )}

                            <div className='flex gap-3 w-full'>
                              <h1>Adressline:</h1>
                              <Field
                                className=' border px-2 w-full'
                                name='adressline1'
                                onChange={handleChange}
                                type='text'
                              />
                            </div>
                            {errors.adressline1 && touched.adressline1 && (
                              <div className=' text-red-600'>
                                {errors.adressline1}
                              </div>
                            )}

                            <div className='flex gap-3 w-full whitespace-nowrap'>
                              <h1>Adressline 2:</h1>
                              <Field
                                className=' border px-2 w-full'
                                name='adressline2'
                                onChange={handleChange}
                                type='text'
                              />
                            </div>
                            {errors.adressline2 && touched.adressline2 && (
                              <div className=' text-red-600'>
                                {errors.adressline2}
                              </div>
                            )}

                            <button
                              type='submit'
                              className='bg-gray-300 px-2 py-1 rounded-lg hover:bg-slate-400'
                            >
                              Change
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  )}

                  <button
                    onClick={() => setOpenSettingProfile(false)}
                    className='absolute top-0 right-0 p-1 rounded-lg flex justify-center items-center hover:bg-slate-400'
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
              className='absolute right-3 top-3 text-gray-400 py-[2px] pt-[1px] px-2 rounded-full hover:bg-slate-700 cursor-pointer bg-slate-100'
            >
              <AddAPhotoIcon
                sx={{
                  width: '13px',
                  height: '13px',
                  objectFit: 'contain',
                }}
              />
            </div>
          )}
        </div>
        <div className='flex flex-1 p-2'>
          {user.type === 1 ? (
            <div>
              <h1 className='text-lg font-medium'>{`${user.name} ${user.lastname}`}</h1>
              <h1 className='text-gray-500 font-light'>{user.jobfunct}</h1>
              <p className='text-gray-500 font-light text-sm'>{user.country}</p>
              <div className='flex gap-x-2 pt-2'>
                {user.wmatchTests.map((hero, index) => {
                  return (
                    <div
                      key={index}
                      className='py-1 px-2 bg-slate-300 rounded-full text-sm font-light'
                    >
                      {hero}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>
              <h1 className='text-lg font-medium'>{user.companyname}</h1>
              <h1 className='text-gray-500 font-light'>{user.about}</h1>
              <p className='text-gray-500 font-light text-sm'>{user.country}</p>
            </div>
          )}
        </div>
      </div>
      <div className='p-2 bg-white rounded-lg flex flex-col gap-y-2'>
        <h1 className='text-lg'>About</h1>
        <p className='text-sm'>{user?.longabout}</p>
      </div>
      {user.type === 1 && (
        <div className='p-2 bg-white rounded-lg flex flex-col gap-y-2  relative group '>
          <Link
            to={
              ruser.username === param.id
                ? prodata?.CVdoc || ruser.CVdoc
                : user.CVdoc
            }
            file
            download={`${user.name} ${user.lastname}'s CV`}
          >
            <span className='bg-slate-300 px-2 py-1 rounded-lg text-lg  '>
              View
            </span>{' '}
            <span className=''>{`${user.name} ${user.lastname}'s CV`}</span>
          </Link>

          {ruser.username === param.id && (
            <button
              onClick={() => setOpenCVedit(!openCVedit)}
              className='absolute hidden group-hover:inline text-gray-400 top-2 right-2 z-50 hover:text-gray-600 duration-300 transition-colors'
            >
              <SettingsIcon />
            </button>
          )}

          {openCVedit && (
            <div className=' '>
              <div className='fixed flex flex-col z-[51] top-5 left-0 right-0 mx-auto max-w-md max-h-[calc(100vh-64px)] px-4 py-3 gap-y-3 rounded bg-white items-center'>
                <div className=' relative py-2 text-lg font-medium border-b-2 w-full text-center items-center '>
                  Upload a CV
                  <button
                    onClick={() => setOpenCVedit(!openCVedit)}
                    className='absolute top-0 right-0 p-1 rounded-lg flex justify-center items-center hover:bg-slate-400'
                  >
                    <CloseIcon />
                  </button>
                </div>
                <input
                  type='file'
                  onChange={(e) => {
                    setCvupload(e.target.files[0]);
                  }}
                />
                <button
                  onClick={() => uploadCVfile()}
                  className='bg-gray-300 px-2 py-1 rounded-lg hover:bg-slate-400'
                >
                  Upload CV
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {/* Post Section will come here */}
      {user.type === 2 && (
        <div className='p-2 bg-white rounded-lg flex flex-col gap-y-2'>
          <h1 className='text-lg'>Posts</h1>
          <div>
            {allposts.length > 0 ? (
              allposts.sort((a, b) => b.time - a.time) &&
              allposts.map((post, index) => {
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
                    refreshData={refreshData}
                  />
                );
              })
            ) : (
              <div className='font-medium'>No Post to Show </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
