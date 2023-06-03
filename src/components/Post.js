import { Avatar } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Like from './Like';
import TestResultElement from './TestResultElement';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import {
  createComment,
  createLike,
  getUserInfo,
  applyJob,
  deletePostdata,
  getUserId,
  addMlScore,
  editCompanyJob,
} from '../firebase';
import DatePicker from 'react-datepicker';
import { CompanyjobSchema } from '../validation/index';
import { useDispatch } from 'react-redux';
import Comment from './Comment';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import JobPortal from './JobPortal';
import JbRnk from './JbRnk';
import SettingsIcon from '@mui/icons-material/Settings';
import { Form, Formik, Field } from 'formik';
import { setJobPost } from '../store/jobpost';
function Post(prop) {
  const [data, setData] = useState(null);
  const [datetime, setDatetime] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [showlikes, setshowLikes] = useState(false);
  const [showtresults, setshowtresults] = useState(false);
  const [commentValue, setCommentValue] = useState('');
  const isTest =
    (prop.post.questions && prop.post.questions.length > 0) || false;
  const [commentsToShow, setCommentsToShow] = useState(3);
  const [flagshowmore, setFlagshowmore] = useState(true);
  const [id, setID] = useState('');
  const [isObliged, setIsObliged] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [extraScore, setExtraScore] = useState(0);
  const [showRnk, setShowRnk] = useState(false);
  const [openSettingProfile, setOpenSettingProfile] = useState(false);
  const dispatch = useDispatch();
  const handleShowMoreComments = () => {
    setCommentsToShow((prevValue) => prevValue + 3);
  };
  const commentsToRender = prop.post.comments?.slice(0, commentsToShow);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (prop.post.comments?.length > commentsToShow) {
      setFlagshowmore(true);
    } else {
      setFlagshowmore(false);
    }
  }, [commentsToShow, prop.post.comments?.length]);

  const findPassedDay = () => {
    const al = Date.now();
    const temp = al / 86400000;
    const temp2 = prop.post.time / 86400000;
    const diff = Math.floor(temp - temp2);
    const dayDiff = diff;
    if (dayDiff !== 0) {
      setDatetime(`${dayDiff}d`);
    } else {
      const hourDiff = Math.floor(((temp - temp2) % 1) * 24);
      if (hourDiff !== 0) {
        setDatetime(`${hourDiff}h`);
      } else {
        const minuteDiff = Math.floor(((((temp - temp2) % 1) * 24) % 1) * 60);
        if (minuteDiff !== 0) {
          setDatetime(`${minuteDiff}m`);
        } else {
          setDatetime('Now');
        }
      }
    }
  };
  useEffect(() => {
    getUserInfo(prop.post.username).then((temp) => setData(temp));
    findPassedDay();
  }, [prop.post]);

  const deletePost = async () => {
    await deletePostdata(prop.post.username, prop.post.time).then(async () => {
      await prop.refreshData();
    });
  };
  useEffect(() => {
    const getid = async () => {
      const id = await getUserId(username);
      if (id) {
        setID(id);
      }
    };
    getid();
  }, [user]);

  const TestPost = () => {
    return (
      <div className='relative group/edit'>
        <div className='  px-4 py-2 bg-white flex flex-col rounded-lg gap-y-3 mb-4 border border-gray-200'>
          <div className=' flex gap-x-3 '>
            <Avatar src={data?.ProfileUrl} />
            <div>
              <a
                href={`profile/${data?.username}`}
                className=' text-lg font-medium hover:underline'
              >
                {data?.companyname}
              </a>
              <h3 className='text-xs'>{prop.post.email}</h3>
            </div>
          </div>
          <div className='relative flex flex-col gap-2'>
            <h1 className='text-base '>
              {isTest ? `${prop.post.testname}` : prop.post.information}
            </h1>
            <p className='text-sm'>{prop.post.information}</p>
            <div className='flex justify-between'>
              <h1 className='text-xs'>
                Test Time :{' '}
                <span className='font-medium'>{prop.post.qtime}</span> Seconds
              </h1>
              <h1 className='text-xs'>
                Number of questions :{' '}
                <span className='font-medium'>
                  {prop.post.questions.length}
                </span>{' '}
              </h1>
            </div>
            <a
              className='flex justify-end'
              href={`/profile/test/${prop.post.username}/${prop.post.id}`}
            >
              {prop.user?.type === 1 &&
                prop.post.scores?.find(
                  (element) => element.userid === prop.user.uid
                ) === undefined && (
                  <div className='border-t-2 w-full'>
                    <div className='flex justify-end'>
                      <button className='cursor-pointer mt-2 text-gray-700 hover:text-gray-600  text-sm py-1 px-2 rounded-full bg-slate-200'>
                        Take the exam
                      </button>
                    </div>
                  </div>
                )}
            </a>
            {prop.post.username === prop.user.username && (
              <div className='border-t-2 w-full -mt-1'>
                <div className='flex justify-end'>
                  <button
                    onClick={() => setshowtresults(true)}
                    className='cursor-pointer text-gray-700 mt-2 hover:text-gray-600 hover:bg-slate-300 text-sm py-1 px-2 rounded-full bg-slate-200'
                  >
                    Show Results
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <h1
          className={`${
            prop.post.username === prop.user.username &&
            `group-hover/edit:hidden`
          } absolute right-4 top-3 text-sm c text-gray-400  inline `}
        >
          {datetime}
        </h1>
        {prop.post.username === prop.user.username && (
          <div
            onClick={() => deletePost()}
            className='absolute right-2 top-2 cursor-pointer text-gray-400 hover:text-gray-600 hidden group-hover/edit:inline '
          >
            <CloseIcon />
          </div>
        )}

        {showtresults && prop.post.scores.sort((a, b) => b.score - a.score) && (
          <div>
            <div className='fixed top-0 left-0 bottom-0 right-0 z-50  bg-slate-900 opacity-75'></div>
            <div className='fixed flex flex-col  z-50 top-5 left-0 right-0 mx-auto max-w-xl max-h-[556px] px-4 py-3 rounded bg-white'>
              <div className='flex flex-col items-center border-b-2 relative'>
                <h1 className=' text-lg '>Test Results</h1>
                <div className='border-b-4 -mb-[1.7px] border-slate-500'>
                  <h1 className='p-2'>
                    All{' '}
                    <span className='font-medium 	'>
                      {prop.post.scores.length}
                    </span>
                  </h1>
                </div>
                <button
                  onClick={() => setshowtresults(false)}
                  className='absolute hover:bg-slate-400 rounded-lg p-1 right-0'
                >
                  <CloseIcon />
                </button>
              </div>
              <div className='flex flex-col gap-y-3 py-3 overflow-y-auto'>
                {prop.post.scores !== null ? (
                  prop.post.scores.map((element, index) => {
                    return <TestResultElement key={index} data={element} />;
                  })
                ) : (
                  <div>Loading </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  const { username } = user;
  useEffect(() => {
    const addScore = async () => {
      if (username) {
        const id = await getUserId(username);
        if (id && extraScore > 0) {
          await addMlScore(id, extraScore);
        }
      }
    };
    addScore();
  }, [extraScore, user]);
  const outerDivRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (outerDivRef.current && !outerDivRef.current.contains(event.target)) {
        setOpenSettingProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const JobPost = () => {
    const handleApply = async () => {
      const id = await getUserId(username);
      await applyJob(prop.post.username, id, prop.post.time);
      if (prop.post.isMilitaryService === 'true') {
        setIsObliged(true);
      }
    };
    const ShowApply = () =>
      prop.post.candidates?.indexOf(id) > -1 ? (
        <button
          disabled
          className='bg-slate-200 cursor-pointer text-sm mt-2 rounded-full  py-1 px-2  text-gray-700 hover:text-gray-600  transition-colors duration-200'
        >
          Applied
        </button>
      ) : (
        <button
          onClick={() => handleApply()}
          className='text-white bg-blue-400 hover:bg-blue-300 text-sm cursor-pointer mt-2 rounded-full py-1 px-4 text-gray-700 hover:text-white-600 transition-colors duration-200'
        >
          Apply
        </button>
      );

    const handleSubmitJob = async (values, actions) => {
      const milliseconds = values.startDate.getTime();

      const data = {
        jobname: values.job,
        information: values.information,
        testvalue: values.testvalue,
        mintestvalue: values.mintestvalue,
        testvaluescore: values.testvaluescore,
        wtestvalue: values.wtestvalue,
        wmintestvalue: values.wmintestvalue,
        wtestvaluescore: values.wtestvaluescore,
        salary: values.salary,
        time: Date.now(),
        endtime: milliseconds,
        name: user.companyname,
        username: user.username,
        email: user.email,
        numberRec: values.recomnumber,
        type: 3,
        experience: values.experience,
        major: values.major,
        isMilitaryService: values.isMilitaryService,
      };

      const id = await getUserId(user?.username);

      await editCompanyJob(id, prop.post.jobid, data).then(
        async () => await prop.refreshData()
      );
      setOpenSettingProfile(false);
    };

    return (
      <>
        {isObliged && !isAnswered && (
          <JobPortal
            setExtraScore={setExtraScore}
            setIsObliged={setIsObliged}
            setIsAnswered={setIsAnswered}
          />
        )}
        <div className='relative group/edit  bg-white shadow-md rounded-lg'>
          <div className='  px-4 py-2 bg-white flex flex-col rounded-lg  mb-4  border border-gray-200'>
            <div className=' flex gap-x-3 '>
              <Avatar src={data?.ProfileUrl} />
              <div>
                <a
                  href={`profile/${data?.username}`}
                  className=' text-lg font-medium hover:underline'
                >
                  {data?.companyname}
                </a>
                <h3 className='text-xs'>{prop.post.email}</h3>
              </div>
            </div>
            <div className='relative pt-2 '>
              <h1 className='text-2xl font-medium mb-3 flex  items-center gap-2'>
                <AiOutlineAppstoreAdd className='text-blue-500 mt-1' />
                {prop.post.jobname}
              </h1>

              <div className='mb-2 flex items-start gap-2'>
                <div className='flex flex-col'>
                  <p className='text-md font-semibold'>Description</p>
                  <h1 className='text-sm ml-2 font-medium text-gray-700'>
                    {prop.post.information}
                  </h1>
                </div>
              </div>
              <div className='mb-2 flex items-start gap-2'>
                <div className='flex flex-col'>
                  <p className='text-md font-semibold'>Salary</p>
                  <h1 className='text-sm ml-2 font-medium text-gray-700'>
                    {prop.post.salary}
                  </h1>
                </div>
              </div>
              <div className='mb-2 flex items-start gap-2'>
                <div className='flex flex-col'>
                  <p className='text-md font-semibold'>Experience</p>
                  <h1 className='text-sm ml-2 font-medium text-gray-700'>
                    {prop.post.experience}
                  </h1>
                </div>
              </div>
              <div className='mb-2 flex items-start gap-2'>
                <div className='flex flex-col'>
                  <p className='text-md font-semibold'>Education</p>
                  <h1 className='text-sm ml-2 font-medium text-gray-700'>
                    {prop.post.major}
                  </h1>
                </div>
              </div>
              <div className='border-t-2 w-full'>
                <div className='flex justify-end items-center p-2'>
                  {user?.type === 1 && ShowApply()}
                  {user && user?.type === 2 && (
                    <button
                      className='cursor-pointer text-gray-700 mt-2 hover:text-gray-600 hover:bg-slate-300 text-sm py-1 px-2 rounded-full bg-slate-200'
                      onClick={() => {
                        dispatch(setJobPost(prop.post));
                        setShowRnk(true);
                      }}
                    >
                      Show Ranking Results
                    </button>
                  )}
                  {showRnk && (
                    <div>
                      <div className='fixed top-0 left-0 bottom-0 right-0 z-50  bg-slate-900 opacity-75'></div>
                      <div className='fixed flex flex-col  z-50 top-5 left-0 right-0 mx-auto max-w-xl max-h-[556px] px-4 py-3 rounded bg-white'>
                        <div className='flex flex-col items-center border-b-2 relative'>
                          <h1 className=' text-lg p-2 font-medium'>
                            Candidates Ranking Results
                          </h1>
                          <button
                            onClick={() => setShowRnk(false)}
                            className='absolute hover:bg-slate-400 rounded-lg p-1 right-0'
                          >
                            <CloseIcon />
                          </button>
                        </div>
                        <div className='flex flex-col gap-y-3 py-3 overflow-y-auto'>
                          {<JbRnk />}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <h1
            className={`${
              prop.post.username === prop.user.username &&
              `group-hover/edit:hidden`
            } absolute right-4 top-3 text-sm c text-gray-400  inline `}
          >
            {datetime}
          </h1>
          {prop.post.username === prop.user.username && (
            <div className='group absolute right-2 top-2 flex space-x-2'>
              <div
                onClick={() => setOpenSettingProfile(!openSettingProfile)}
                className='opacity-0 group-hover:opacity-100 cursor-pointer text-gray-400 hover:text-gray-600 transition-opacity duration-200'
              >
                <SettingsIcon />
              </div>
              <div
                onClick={() => deletePost()}
                className='opacity-0 group-hover:opacity-100 cursor-pointer text-gray-400 hover:text-gray-600 transition-opacity duration-200'
              >
                <CloseIcon />
              </div>
            </div>
          )}

          {openSettingProfile && (
            <div ref={outerDivRef}>
              <div className='fixed flex flex-col z-[51] top-5 left-0 right-0 mx-auto max-w-xl max-h-[calc(100vh-64px)] px-4 py-3 gap-y-3 rounded bg-white items-center bg-gray-100 border-2 border-gray-300'>
                <div className='relative py-2  w-full text-center items-center '>
                  <h1 className='text-lg font-medium border-b-2'>Edit</h1>
                  {user && user?.type === 2 && (
                    <Formik
                      validationSchema={CompanyjobSchema}
                      initialValues={{
                        job: prop?.post?.jobname,
                        information: prop?.post?.information,
                        testvalue: prop?.post?.testvalue,
                        mintestvalue: prop?.post?.mintestvalue,
                        testvaluescore: prop?.post?.testvaluescore,
                        wtestvalue: prop?.post?.wtestvalue,
                        wmintestvalue: prop?.post?.wmintestvalue,
                        wtestvaluescore: prop?.post?.wtestvaluescore,
                        startDate: new Date(),
                        recomnumber: prop?.post?.numberRec,
                        salary: prop?.post?.salary,
                        experience: prop?.post?.experience,
                        major: prop?.post?.major,
                        isMilitaryService: prop?.post?.isMilitaryService,
                      }}
                      onSubmit={handleSubmitJob}
                    >
                      {({ values, errors, touched, handleChange }) => (
                        <Form>
                          <div className='flex flex-col gap-y-3 p-2 justify-start'>
                            <div className='flex gap-x-3  '>
                              <h1>Job:</h1>
                              <input
                                className='w-full outline-none border px-2 '
                                type='text'
                                name='job'
                                value={values.job}
                                onChange={handleChange}
                              />
                            </div>
                            {errors.job && touched.job && (
                              <div className=' text-red-600'>{errors.job}</div>
                            )}
                            <div className='flex gap-x-3 '>
                              <h1>Description:</h1>
                              <textarea
                                className='flex flex-1 px-2 py-1 outline-none border rounded-lg  overflow-y-auto resize-none scrollbar-hide text-sm'
                                onInput={(e) =>
                                  (e.target.style.height = `${e.target.scrollHeight}px`)
                                }
                                name='information'
                                value={values.information}
                                onChange={handleChange}
                              ></textarea>
                            </div>
                            {errors.information && touched.information && (
                              <div className=' text-red-600'>
                                {errors.information}
                              </div>
                            )}
                            <div className='flex justify-between gap-x-3 items-center whitespace-nowrap  h-8'>
                              <h1>Tests:</h1>
                              <Field
                                className='w-full h-full border-2'
                                as='select'
                                name='testvalue'
                              >
                                <option value=''>Choose</option>
                                {user.posts.map((value, index) => {
                                  return (
                                    value.type === 2 && (
                                      <option value={value.testname}>
                                        {value.testname}
                                      </option>
                                    )
                                  );
                                })}
                              </Field>
                              <div className='flex'>
                                <h1>If greater than</h1>
                                <Field
                                  className='w-12 text-center '
                                  name='mintestvalue'
                                  placeholder='0'
                                  type='number'
                                  min={0}
                                />
                              </div>
                              <div className='flex'>
                                <h1 className='font-medium'>Score:</h1>
                                <Field
                                  className='w-12 text-center '
                                  name='testvaluescore'
                                  placeholder='0'
                                  type='number'
                                  min={0}
                                />
                              </div>
                            </div>
                            {errors.testvalue && touched.testvalue && (
                              <div className=' text-red-600'>
                                {errors.testvalue}
                              </div>
                            )}
                            <div className='flex justify-between gap-x-3 items-center whitespace-nowrap  h-8 flex-wrap'>
                              <h1>W-MATCH Tests:</h1>
                              <Field
                                className='border-2 flex-grow'
                                as='select'
                                name='wtestvalue'
                                value={values.wtestvalue}
                              >
                                <option value=''>Choose</option>
                                <option value='CSS'>CSS</option>
                                <option value='HTML'>HTML</option>
                                <option value='JavaScript'>JavaScript</option>
                                <option value='React'>React.js</option>
                                <option value='Java'>Java</option>
                                <option value='Python'>Python</option>
                                <option value='PHP'>PHP</option>
                                <option value='Ruby'>Ruby</option>
                              </Field>
                              <div className='flex'>
                                <h1>If greater than</h1>
                                <Field
                                  className='w-12 text-center '
                                  name='wmintestvalue'
                                  placeholder='0'
                                  type='number'
                                  min={0}
                                />
                              </div>
                              <div className='flex'>
                                <h1 className='font-medium'>Score:</h1>
                                <Field
                                  className='w-12 text-center '
                                  name='wtestvaluescore'
                                  placeholder='0'
                                  type='number'
                                  min={0}
                                />
                              </div>
                            </div>
                            {errors.wtestvalue && touched.wtestvalue && (
                              <div className=' text-red-600'>
                                {errors.wtestvalue}
                              </div>
                            )}
                            <div className='flex justify-between whitespace-nowrap gap-3 '>
                              <h1>End Date:</h1>
                              <Field name='startDate'>
                                {({ field, form }) => (
                                  <DatePicker
                                    {...field}
                                    selected={values.startDate}
                                    onChange={(date) =>
                                      form.setFieldValue('startDate', date)
                                    }
                                    className='border w-full'
                                  />
                                )}
                              </Field>
                            </div>

                            <div className='flex justify-between whitespace-nowrap gap-3'>
                              <h1>How many people do you want recommended ?</h1>

                              <Field
                                className='w-full text-center border '
                                name='recomnumber'
                                placeholder='0'
                                type='number'
                                min={0}
                              />
                            </div>

                            <div className='flex gap-x-3 '>
                              <h1>Salary:</h1>
                              <input
                                className='w-full outline-none border px-2 '
                                name='salary'
                                value={values.salary}
                                onChange={handleChange}
                                type='text'
                              />
                            </div>
                            {errors.salary && touched.salary && (
                              <div className=' text-red-600'>
                                {errors.salary}
                              </div>
                            )}
                            <div className='flex gap-x-3 '>
                              <h1>Experience:</h1>
                              <input
                                className='w-full outline-none border px-2 '
                                name='experience'
                                value={values.experience}
                                onChange={handleChange}
                                type='text'
                              />
                            </div>
                            {errors.experience && touched.experience && (
                              <div className=' text-red-600'>
                                {errors.experience}
                              </div>
                            )}
                            <div className='flex gap-x-3 '>
                              <h1>Education:</h1>
                              <input
                                className='w-full outline-none border px-2 '
                                name='major'
                                value={values.major}
                                onChange={handleChange}
                                type='text'
                              />
                            </div>
                            {errors.major && touched.major && (
                              <div className=' text-red-600'>
                                {errors.major}
                              </div>
                            )}
                            <div className='w-full flex flex-col gap-y-3 justify-center mt-4 '>
                              <label className='block'>
                                Is employee obliged to complete military
                                service?
                              </label>
                              <div className='flex items-center gap-x-4'>
                                <div className='flex items-center mr-6 pl-2 '>
                                  <input
                                    checked={
                                      values.isMilitaryService === 'true'
                                    }
                                    id='tm'
                                    type='radio'
                                    name='isMilitaryService'
                                    value='true'
                                    onChange={handleChange}
                                    className='form-radio text-blue-600 h-3 w-3 cursor-pointer'
                                  />
                                  <label
                                    htmlFor='tm'
                                    className='ml-2 text-gray-700 cursor-pointer font-normal'
                                  >
                                    Yes
                                  </label>
                                </div>

                                <div className='flex items-center gap-x-4  '>
                                  <input
                                    id='fm'
                                    checked={
                                      values.isMilitaryService === 'false'
                                    }
                                    type='radio'
                                    name='isMilitaryService'
                                    value='false'
                                    onChange={handleChange}
                                    className='form-radio text-blue-600 h-3 w-3 cursor-pointer'
                                  />
                                  <label
                                    htmlFor='fm'
                                    className='ml-2 text-gray-700 cursor-pointer font-normal'
                                  >
                                    No
                                  </label>
                                </div>
                              </div>
                            </div>
                            {errors.isMilitaryService &&
                              touched.isMilitaryService && (
                                <div className=' text-red-600'>
                                  {errors.isMilitaryService}
                                </div>
                              )}
                          </div>
                          <div className='flex  '>
                            <button
                              type='submit'
                              className='bg-slate-300  p-2 rounded-lg  w-full hover:bg-slate-400'
                            >
                              Edit Job
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
        </div>
      </>
    );
  };

  if (prop.post.type === 2) {
    return TestPost();
  }

  if (prop.post.type === 3) {
    return JobPost();
  }

  const handleLike = async (e) => {
    await createLike(prop.post.username, prop.user.uid, prop.post.time).then(
      async () => await prop.refreshData()
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.type === 1) {
      if (commentValue !== '') {
        const att = {
          name: prop.uname,
          username: prop.user.username,
          about: prop.about,
          comment: commentValue,
          ctime: Date.now(),
        };

        await createComment(prop.post.username, att, prop.post.time).then(
          async () => await prop.refreshData()
        );
      }
    } else {
      const att = {
        name: data.companyname,
        username: data.username,
        about: data.about,
        comment: commentValue,
        ctime: Date.now(),
      };
      await createComment(prop.post.username, att, prop.post.time).then(
        async () => await prop.refreshData()
      );
    }

    setCommentValue('');
  };
  return (
    <div className='relative group/edit'>
      <div className='px-4 py-2 bg-white flex flex-col rounded-lg gap-y-3 mb-4 border border-gray-200'>
        <div className=' flex gap-x-3 '>
          <Avatar src={data?.ProfileUrl} />
          <div>
            <a
              href={`profile/${data?.username}`}
              className=' text-lg font-medium hover:underline'
            >
              {data?.companyname}
            </a>
            <h3 className='text-xs'>{prop.post.email}</h3>
          </div>
        </div>
        <div>
          <p>{prop.post.data}</p>
        </div>
        <div className='flex justify-between items-center text-xs'>
          <div className='flex items-center gap-x-1'>
            <ThumbUpOffAltIcon
              className='text-blue-400 '
              style={{ width: '16px', height: '16px' }}
            />
            <p
              onClick={() => setshowLikes(true)}
              className='hover:underline cursor-pointer '
            >
              {prop.post.likes.length} likes
            </p>
          </div>
          <h3
            onClick={() => setShowComments(!showComments)}
            className='hover:underline cursor-pointer'
          >
            {prop.post.comments.length} comments
          </h3>
        </div>
        {(prop.user?.type === 1 || prop.user?.type === 2) && (
          <div className='flex justify-evenly border-t-2 pt-2   '>
            <div
              onClick={() => handleLike()}
              className=' flex gap-x-2 hover:bg-slate-200 py-1 px-2 rounded-lg group items-center justify-center cursor-pointer '
            >
              <ThumbUpOffAltIcon className='group-hover:text-blue-400' />
              <h3>Like</h3>
            </div>
            <div
              onClick={() => setShowComments(!showComments)}
              className='flex gap-x-2 hover:bg-slate-200 py-1 px-3 rounded-lg group items-center  justify-center cursor-pointer '
            >
              <ChatBubbleOutlineIcon className='group-hover:text-blue-400' />
              <h3>Comment</h3>
            </div>
          </div>
        )}
        {showComments && (
          <div className='flex flex-col gap-y-3'>
            <div className='flex gap-x-2'>
              <Avatar src={prop.user.ProfileUrl} />
              <form
                onSubmit={(e) => handleSubmit(e)}
                className='flex w-full    '
              >
                <input
                  className='w-full border rounded-lg  outline-none px-2 focus:border-gray-500 '
                  type='text'
                  placeholder='Add a comment...'
                  value={commentValue}
                  onChange={(e) => setCommentValue(e.target.value)}
                />
              </form>
            </div>
            <div>
              {/* Bu kisim fallow sistemi gelidiginde güncellenecek */}
              {commentsToRender.map((comm, index) => {
                return (
                  <div>
                    <Comment
                      key={index}
                      val={comm}
                      ptime={prop.post.time}
                      refreshData={prop.refreshData}
                      pusername={prop.post.username}
                    />
                  </div>
                );
              })}
            </div>
            {flagshowmore && prop.post.comments.length > 3 && (
              <div className='flex justify-center hover:text-blue-300'>
                <AddIcon />
                <button
                  onClick={() => handleShowMoreComments()}
                  className='text-sm'
                >
                  Show More
                </button>
              </div>
            )}
          </div>
        )}
        {showlikes && (
          <div>
            <div className='fixed top-0 left-0 bottom-0 right-0 z-50  bg-slate-900 opacity-75'></div>
            <div className='fixed flex flex-col  z-50 top-5 left-0 right-0 mx-auto max-w-xl max-h-[556px] px-4 py-3 rounded bg-white'>
              <div className='flex flex-col items-center border-b-2 relative'>
                <h1 className=' text-lg '>Reactions</h1>
                <div className='border-b-4 -mb-[1.7px] border-slate-500'>
                  <h1 className='p-2'>
                    All{' '}
                    <span className='font-medium 	'>
                      {prop.post.likes.length}
                    </span>
                  </h1>
                </div>
                <button
                  onClick={() => setshowLikes(false)}
                  className='absolute hover:bg-slate-400 rounded-lg p-1 right-0'
                >
                  <CloseIcon />
                </button>
              </div>
              <div className='flex flex-col gap-y-3 py-3 overflow-y-auto'>
                {prop.post.likes !== null ? (
                  prop.post.likes.map((element, index) => {
                    return <Like key={index} likeid={element} />;
                  })
                ) : (
                  <div>Loading </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <h1
        className={`${
          prop.post.username === prop.user.username && `group-hover/edit:hidden`
        } absolute right-4 top-3 text-sm c text-gray-400  inline `}
      >
        {datetime}
      </h1>

      {prop.post.username === prop.user.username && (
        <div
          onClick={() => deletePost()}
          className='absolute right-2 top-2 cursor-pointer text-gray-400 hover:text-gray-600 hidden group-hover/edit:inline '
        >
          <CloseIcon />
        </div>
      )}
    </div>
  );
}

export default Post;
