import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import SideBarElement from '../components/SideBarElement';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const user = useSelector((state) => state.auth.user);
  const [showData, setShowData] = useState(false);
  const navigate = useNavigate();

  return (
    <div className='flex-[0.2]  mx-12 mb-6 md:mx-0 md:mb-0    '>
      <div className='flex flex-col sticky top-[72px] z-40 py-2  gap-y-3 items-center justify-center rounded-lg shadow-lg     bg-white'>
        <div
          onClick={() => navigate(`/profile/${user.username}`)}
          className='cursor-pointer'
        >
          <Avatar src={user.ProfileUrl} sx={{ width: 48, height: 48 }} />
        </div>
        {user.type === 1 ? (
          <div className='w-full space-y-3 '>
            <div className='flex flex-col text-center px-4 '>
              <h1 className='text-lg font-medium'>{`${user.name} ${user.lastname}`}</h1>
              <p className=' text-xs'>{user.jobfunct}</p>
            </div>
            <div className='flex flex-col border-t-2 gap-y-3 '>
              <div className='px-4'>
                <div
                  onClick={() => setShowData(true)}
                  className='flex justify-between items-center text-sm mt-2 cursor-pointer '
                >
                  <h1 className=''>Following</h1>
                  <h1 className=''>{user?.following?.length}</h1>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='w-full space-y-3 '>
            <div className='flex flex-col text-center px-4 '>
              <h1 className='text-lg font-medium'>{user.companyname}</h1>
              <p className=' text-xs'>{user.about}</p>
            </div>
            <div className='flex flex-col border-t-2 gap-y-3 '>
              <div className='px-4'>
                <div
                  onClick={() => setShowData(true)}
                  className='flex justify-between items-center text-sm mt-2 cursor-pointer '
                >
                  <h1 className=''>Followers</h1>
                  <h1 className=''>{user?.followers?.length}</h1>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showData && (
        <div>
          <div className='fixed top-0 left-0 bottom-0 right-0 z-50  bg-slate-900 opacity-75'></div>
          <div className='fixed flex flex-col  z-50 top-5 left-0 right-0 mx-auto max-w-xl max-h-[556px] px-4 py-3 rounded bg-white'>
            <div className='flex flex-col items-center border-b-2 relative'>
              <h1 className=' text-lg '>
                {user && user?.type === 2
                  ? 'Followers'
                  : 'Followed Companies by you'}
              </h1>
              <div className='border-b-4 -mb-[1.7px] border-slate-500'>
                <h1 className='p-2'>
                  All{' '}
                  <span className='font-medium 	'>
                    {' '}
                    {user.type === 2
                      ? user.followers.length
                      : user.following.length}
                  </span>
                </h1>
              </div>
              <button
                onClick={() => setShowData(false)}
                className='absolute hover:bg-slate-400 rounded-lg p-1 right-0'
              >
                <CloseIcon />
              </button>
            </div>
            <div className='flex flex-col gap-y-3 py-3 overflow-y-auto'>
              {user.type === 2 ? (
                user.followers !== null ? (
                  user.followers.map((element, index) => {
                    return (
                      <SideBarElement key={index} data={element} type={2} />
                    );
                  })
                ) : (
                  <div>Loading </div>
                )
              ) : user.following !== null ? (
                user.following.map((element, index) => {
                  return <SideBarElement key={index} data={element} type={1} />;
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
}

export default Sidebar;
