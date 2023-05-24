import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateSkill, getTestRight } from '../../firebase';
function MyTestList({ data }) {
  const [testR, setTestR] = useState();
  const { name, src } = data;

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleMyTest = async (jc) => {
    await updateSkill(user?.username, jc);
    navigate(`/level`);
  };
  useEffect(() => {
    const getR = async () => {
      const reslt = await getTestRight(user?.username);
      if (reslt) setTestR(Object.entries(reslt));
    };
    getR();
  }, [user]);
  console.log('🚀 ~ file: MyTestList.js:8 ~ MyTestList ~ testR:', testR);

  return (
    <div className='relative last:border-none border-b-2'>
      <div className='flex justify-between pt-3 group pb-2'>
        <div className='flex gap-x-2'>
          <div className='flex-1 j'>
            <Avatar
              src={src}
              sx={{ height: 50, width: 50 }}
              variant='square'
              className='transform group-hover:scale-110 transition-all duration-300'
            />
          </div>
          <div className='flex flex-col gap-y-1'>
            <h1 className='group-hover:underline font-medium text-xl group-hover:text-blue-500 transition-colors duration-300'>
              {name}
            </h1>
          </div>
        </div>
        <button
          disabled={
            testR &&
            testR.length > 0 &&
            testR.find((r) => r[0] === name && r[1] === 0)
          }
          onClick={() => handleMyTest(name)}
          className='text-white absolute bottom-1 right-0 px-2 py-1 text-sm font-semibold bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 rounded-lg hover:from-blue-500 hover:via-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl'
        >
          Take the test
        </button>
      </div>
    </div>
  );
}

export default MyTestList;
