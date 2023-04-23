import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { fallowUser } from '../firebase';
import { Link } from 'react-router-dom';
function WidgetElement({ widg, index }) {
  const user = useSelector((state) => state.auth.user);
  const [followTrue, setfollowTrue] = useState(false);
  const handleFollow = async () => {
    await fallowUser(widg.username, user.username);
    setfollowTrue(!followTrue);
  };
  return (
    <div className='flex gap-x-2 items-start'>
      <div className='pt-1'>
        <Avatar
          src={widg.ProfileUrl}
          className=''
          sx={{ width: 40, height: 40 }}
        />
      </div>
      <div className='flex flex-col'>
        <Link
          to={`/profile/${widg.username}`}
          className=' font-medium leading-5 hover:underline 	'
        >
          {widg.companyname}
        </Link>
        <p className=' text-xs'>{widg.about}</p>
        {/* if isFollowing true ise butona solukluk ver */}
        <button
          onClick={() => handleFollow()}
          className='text-center text-sm font-medium bg-slate-200 hover:bg-slate-300 w-20 py-1 px-2 my-2 rounded-full'
        >
          {followTrue ? 'Unfollow' : 'Follow'}
        </button>
      </div>
    </div>
  );
}

export default WidgetElement;
