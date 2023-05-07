import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
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
} from '../firebase';
import Comment from './Comment';
import {
  AiOutlineDollar,
  AiOutlineFileText,
  AiOutlineAppstoreAdd,
  AiOutlineClockCircle,
  AiOutlineBook,
} from 'react-icons/ai';
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
                <span className='font-medium'>{prop.post.qtime}</span>{' '}
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
              href={`test/${prop.post.username}/${prop.post.id}`}
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
  const JobPost = () => {
    const handleApply = async () => {
      const id = await getUserId(username);
      console.log('id', id);
      await applyJob(prop.post.username, id, prop.post.time);
    };
    console.log('post', prop.post);
    return (
      <div className='relative group/edit  bg-white shadow-md rounded-lg'>
        <div className='  px-4 py-2 bg-white flex flex-col rounded-lg gap-y-3 mb-4  border border-gray-200'>
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
          <div className='relative p-4'>
            <h1 className='text-2xl font-medium mb-5 flex items-center gap-2'>
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

            {prop.user?.type === 1 &&
              prop.post.candidates?.find(
                (element) => element === prop.user.uid
              ) === undefined && (
                <button
                  onClick={() => handleApply()}
                  className='bg-blue-500 p-2 rounded-lg absolute right-4 bottom-4 text-white font-semibold hover:bg-blue-600 transition-colors duration-200'
                >
                  Apply
                </button>
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
      </div>
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
