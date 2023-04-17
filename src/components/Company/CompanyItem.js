import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { fallowUser } from '../../firebase';

const CompanyItem = (props) => {
  const user = useSelector((state) => state.auth.user);
  const [followTrue, setfollowTrue] = useState(false);

  const aboutStyle = {
    fontStyle: 'italic',
    fontSize: '14px',
    color: '#6B7280',
  };
  const handleFollow = async () => {
    await fallowUser(props.company.username, user.username);
    setfollowTrue(!followTrue);
  };
  return (
    <div className='relative last:border-none border-b-2 '>
      <div className='flex  justify-between pt-3 group  pb-2 '>
        <div className='flex gap-x-2   '>
          <div className='flex-1  j'>
            <Avatar
              src={props.company.proifleUrl}
              sx={{ height: 50, width: 50 }}
              variant='square'
            />
          </div>
          <div className='flex flex-col gap-y-1'>
            <h1 className='font-medium'>{props.company.companyname}</h1>
            <span style={aboutStyle}>{props.company.about}</span>
          </div>
        </div>
        <div className='flex flex-col'>
          <button
            onClick={() => handleFollow()}
            className='text-center text-sm font-medium bg-slate-200 hover:bg-slate-300 w-20 py-1 px-2 my-2 rounded-full'
          >
            {followTrue ? 'Unfollow' : 'Follow'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyItem;
