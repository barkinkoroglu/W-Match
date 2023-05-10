import React, { useEffect, useState } from 'react';
import { getTestRight } from '../firebase';
const TestRightInfo = ({ user }) => {
  const [testRight, setTestRight] = useState();

  useEffect(() => {
    const getRight = async () => {
      const right = await getTestRight(user?.username);
      setTestRight(Object.entries(right));
    };
    getRight();
  }, [user]);
  const handleRight = () =>
    testRight &&
    testRight.length > 0 &&
    testRight.map((r) => (
      <h2 className='text-2xl font-bold text-white mb-4 tracking-tighter border-b-2 border-solid border-yellow-300'>
        Left {r[0]} Test Right -{' '}
        <span className='text-2xl font-extrabold text-yellow-300'>{r[1]}</span>
      </h2>
    ));

  return (
    <>
      {user?.type === 1 && (
        <div className='max-h-64 overflow-y-auto text-center p-6 rounded-lg bg-gradient-to-r from-blue-400 via-indigo-500 to-cyan-500 hover:from-blue-300 hover:via-indigo-400 hover:to-cyan-400 transition duration-500 ease-in-out'>
          {handleRight()}
        </div>
      )}
    </>
  );
};

export default TestRightInfo;
