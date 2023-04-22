import { Avatar } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getUserInfobyID, getWmatchTests } from '../firebase';

function TestResultElement(prop) {
  const [data, setData] = useState({});
  const [sum, setSum] = useState(0);
  const getData = async () => {
    setData(await getUserInfobyID(prop.data.userid));
  };
  console.log('props', prop);
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const testsData = await getWmatchTests(prop.data.userid);
      const point = +Object.values(testsData).toString();
      setSum(Math.floor((point + prop.data.score) / 2));
    };
    fetchData();
  }, []);

  if (data === null) {
    return <div>Loading</div>;
  }

  return (
    <div className='flex gap-x-2 border-b-2 pb-3 border-gray-100'>
      <div>
        <Avatar src={data.ProfileUrl} />
      </div>
      <div className='flex items-center justify-between w-full pr-6 '>
        <a href={`/profile/${data?.username}`} className=' hover:underline '>
          {data?.name} {data?.lastname}
        </a>
        <h1 className='text-lg font-semibold'>{sum}</h1>
      </div>
    </div>
  );
}

export default TestResultElement;
