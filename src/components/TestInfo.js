import React from 'react';
import { useNavigate } from 'react-router-dom';

const TestInfo = ({ user }) => {
  console.log('usr', user);
  const navigate = useNavigate();
  const handleStartClick = () => {
    navigate(`/level`);
  };
  return (
    <>
      {user.isTest === false ? (
        <button
          onClick={handleStartClick}
          className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-150'
        >
          Start test
        </button>
      ) : (
        <div className='text-center'>
          <h2 className='text-xl font-semibold text-gray-800 mb-2'>
            Test Score
          </h2>
          <p className='text-lg font-medium text-gray-700'>
            {user.wmatchTests}
          </p>
        </div>
      )}
    </>
  );
};

export default TestInfo;
