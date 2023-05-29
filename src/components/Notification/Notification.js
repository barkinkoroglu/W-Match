import { Avatar } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Notification({ cname, jname, desc, username }) {
  const navigate = useNavigate();

  return (
    <div className='p-4 bg-white mb-2 rounded-lg flex gap-x-2  items-start  '>
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
            See this job
          </button>
        </div>
      </div>
    </div>
  );
}

export default Notification;
