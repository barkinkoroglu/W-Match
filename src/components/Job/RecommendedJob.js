import React, { useEffect, useState } from 'react';
import JobList from './JobList';
import { getRandomCompanyJobs } from '../../firebase';
import { useSelector } from 'react-redux';

function RecommendedJob() {
  const [recjob, setRecjob] = useState(null);
  const ruser = useSelector((state) => state.auth.user);

  console.log(recjob);
  useEffect(() => {
    const callRec = async () => {
      await getRandomCompanyJobs(ruser?.uid).then((data) => {
        if (data) {
          setRecjob(data);
        }
      });
    };
    callRec();
  }, [ruser?.uid]);
  return (
    <div className='flex-[0.5]'>
      <div className='bg-white p-4 rounded-lg mx-4 shadow-sm'>
        <div className='border-b border-gray-200 pb-2'>
          <h1 className='font-medium text-lg leading-5'>Recommended for you</h1>
          <h1 className='font-light text-sm text-gray-400'>
            Based on your profile and search history
          </h1>
        </div>
        <div>
          {recjob?.map((element, index) => {
            return <JobList key={index} data={element} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default RecommendedJob;
