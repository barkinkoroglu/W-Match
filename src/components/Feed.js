import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AbcIcon from '@mui/icons-material/Abc';
import WorkIcon from '@mui/icons-material/Work';
import Post from './Post';
import Createtest from './Createtest';
import CreateJob from './CreateJob';
import { useSelector } from 'react-redux';
import { createPost, getAllPost } from '../firebase';

function Feed() {
  const [showCreateTest, setShowCreateTest] = useState(false);
  const [showCreateJob, setShowCreateJob] = useState(false);
  const [allposts, setAllPost] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const user = useSelector((state) => state.auth.user);
  const groupSize = 5;
  const [visiblePostCount, setVisiblePostCount] = useState(5);
  const [flag, setFlag] = useState(false);
  const getVisiblePosts = (posts, visiblePostCount) => {
    return posts.slice(0, visiblePostCount);
  };
  const visiblePosts = getVisiblePosts(allposts, visiblePostCount);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setVisiblePostCount((prevCount) => prevCount + groupSize);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const refreshData = async () => {
    await getAllPost(user)
      .then((data) => setAllPost(data))
      .catch((error) => console.log('ERROR', error));
  };

  useEffect(() => {
    (async () => {
      await getAllPost(user)
        .then((data) => setAllPost(data))
        .catch((error) => console.log('ERROR', error));
    })();
  }, [user, flag]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputValue !== '') {
      const att = {
        username: user.username,
        name: user.companyname,
        email: user.email,
        likes: [],
        comments: [],
        data: inputValue,
        time: Date.now(),
        type: 1,
      };

      await createPost(user.uid, att);
      setFlag(!flag);
      setInputValue('');
    }
  };
  return (
    <div className='flex-[0.5]  flex-col mx-12'>
      {user.type === 2 && (
        <div>
          <div className='  p-4 bg-white flex flex-col rounded-lg gap-y-3'>
            <div className='flex gap-x-4'>
              <Avatar alt='profilphoto' src={user.ProfileUrl} />
              <form onSubmit={(e) => handleSubmit(e)} className='flex flex-1'>
                <input
                  className=' w-full rounded-full border pl-5'
                  type='text'
                  placeholder='Start a post'
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </form>
            </div>
            <div className=' flex items-center justify-end gap-x-4'>
              <div
                onClick={() => setShowCreateTest(!showCreateTest)}
                className='flex gap-x-2 hover:bg-slate-200 py-1 px-3 rounded-full cursor-pointer'
              >
                <AbcIcon className='text-green-500' />
                <h3>Create Test</h3>
              </div>
              <div
                onClick={() => setShowCreateJob(!showCreateJob)}
                className='flex gap-x-2 hover:bg-slate-200 py-1 px-3 rounded-full cursor-pointer'
              >
                <WorkIcon className='text-amber-900' />
                <h3>Create Job</h3>
              </div>
            </div>
          </div>
          {(showCreateTest || showCreateJob) && (
            <div className='fixed top-0 left-0 right-0 bottom-0 z-50 bg-slate-900 opacity-75'></div>
          )}

          {showCreateTest && (
            <Createtest
              showCreateTest={showCreateTest}
              setShowCreateTest={setShowCreateTest}
              refreshData={refreshData}
            />
          )}

          {showCreateJob && (
            <CreateJob
              showCreateJob={showCreateJob}
              setShowCreateJob={setShowCreateJob}
              refreshData={refreshData}
            />
          )}

          <span className='flex w-full border-b-2 my-3  border-gray-300 border-solid'></span>
        </div>
      )}
      <div>
        {visiblePosts.length > 0 ? (
          visiblePosts.map((post, index) => {
            return (
              <Post
                key={index}
                post={post}
                user={user}
                name={post.name}
                username={user.username}
                about={user.jobfunct}
                //It will change for company comments
                uname={`${user.name} ${user.lastname}`}
                refreshData={refreshData}
              />
            );
          })
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Feed;
