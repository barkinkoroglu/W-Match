import React from 'react';
import { useNavigate } from 'react-router-dom';

const TestInfo = ({ user }) => {
  console.log('usr', user);
  const navigate = useNavigate();
  const handleStartClick = () => {
    navigate(`/level`);
  };
  console.log('user.JobCategory', user.JobCategory);
  console.log(
    'user.wmatchTests[user.JobCategory]',
    user.wmatchTests[user.JobCategory]
  );

  return (
    <>
      {!user.wmatchTests[user.JobCategory] ? (
        <button
          onClick={handleStartClick}
          className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-150'
        >
          Start test
        </button>
      ) : (
        <div className='text-center p-6 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:from-purple-300 hover:via-pink-400 hover:to-red-400 transition duration-500 ease-in-out'>
          <h2 className='text-3xl font-bold text-white mb-4 tracking-tighter'>
            Skill Score
          </h2>
          <p className='text-2xl font-semibold text-white tracking-normal'>
            {user.wmatchTests[user.JobCategory]}
          </p>
        </div>
      )}
    </>
  );
};

export default TestInfo;
