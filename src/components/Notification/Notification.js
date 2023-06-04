import { Avatar } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setJobPost } from '../../store/jobpost';
import CloseIcon from '@mui/icons-material/Close';
import JbRnk from '../JbRnk';

function Notification({ cname, jname, desc, username, post }) {
  const [showRnk, setShowRnk] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className='p-4 bg-white mb-2 rounded-lg flex gap-x-2  items-start  '>
      {!post && (
        <>
          {' '}
          <div className='flex pt-1'>
            <Avatar />
          </div>
          <div className='w-full flex flex-col gap-y-2'>
            <p className='text-sm'>
              <span className='font-semibold'> {cname || ''} </span> is hiring{' '}
              <span className='font-semibold'> {jname || ''} </span>
              <br />
              {desc || ''}
            </p>
            <div>
              <button
                onClick={() => navigate(`/profile/${username}`)}
                className='px-3 py-1 border rounded-full hover:bg-slate-400'
              >
                See this Company
              </button>
            </div>
          </div>
        </>
      )}
      {post && post.candidates && post?.candidates?.length > 0 && (
        <>
          <div className=''>
            <div className='w-full flex flex-col gap-y-2'>
              <p className='text-sm'>
                <span className='font-semibold'>
                  {(post && post?.candidates && post?.candidates?.length) || ''}{' '}
                  people
                </span>{' '}
                is applied for
                <span className='font-semibold'> {post.jobname || ''}</span>
                <br />
              </p>
              <div>
                <button
                  onClick={() => {
                    dispatch(setJobPost(post));
                    setShowRnk(true);
                  }}
                  className='px-3 py-1 border rounded-full hover:bg-slate-400'
                >
                  {post?.candidates?.length < post.numberRec &&
                    `See applied best ${post?.candidates?.length} candidates`}
                  {post?.candidates?.length >= post.numberRec &&
                    `See applied best ${post.numberRec} candidates`}
                </button>
              </div>
            </div>
          </div>

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
                  {
                    <JbRnk
                      rec={
                        post?.candidates?.length < post?.numberRec
                          ? post?.candidates?.length
                          : post.numberRec
                      }
                    />
                  }
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Notification;
