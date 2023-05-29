import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TestInfo = ({ user }) => {
  const [tests, setTests] = useState();
  const navigate = useNavigate();
  const handleStartClick = () => {
    navigate(`/level`);
  };
  const cptl = (name) => {
    const str = name.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  useEffect(() => {
    if (user) {
      setTests(Object.entries(user.wmatchTests));
    }
  }, [user]);
  return (
    <>
      {user?.type === 1 && !user.wmatchTests[user.JobCategory] ? (
        <button
          onClick={handleStartClick}
          className='w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-150'
        >
          Start test
        </button>
      ) : (
        <div className='text-center p-6 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:from-purple-300 hover:via-pink-400 hover:to-red-400 transition duration-500 ease-in-out'>
          <div className='max-h-64 overflow-y-auto'>
            <div>
              <h2 className='text-2xl font-bold text-white tracking-tighter mb-1'>
                {tests &&
                  tests.length > 0 &&
                  tests.map((test) => (
                    <div>
                      {' '}
                      Your W-Match {cptl(test[0])} Skill Score -{' '}
                      <span className='font-extrabold text-yellow-300'>
                        {' '}
                        <span className='font-extrabold text-yellow-300'>
                          {test[1]}
                        </span>
                      </span>
                    </div>
                  ))}
              </h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TestInfo;
