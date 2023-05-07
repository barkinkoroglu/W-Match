import { Avatar } from '@mui/material';
import React from 'react';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useState, useEffect } from 'react';
import { getCompanyInfo, applyJob } from '../../firebase';
import { useSelector } from 'react-redux';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
function JobList({ data }) {
  const [company, setCompany] = useState(null);
  const [isapply, setIsapply] = useState(false);
  const [datetime, setDatetime] = useState(null);

  const user = useSelector((state) => state.auth.user);
  const findPassedDay = () => {
    const al = Date.now();
    const temp = al / 86400000;
    const temp2 = data.time / 86400000;
    const result = Math.floor(temp - temp2);
    if (result !== 0) {
      setDatetime(result);
    } else {
      setDatetime('Today');
    }
  };
  useEffect(() => {
    const callRec = async () => {
      await getCompanyInfo(data.username).then((temp) => {
        if (temp) {
          setCompany(temp);
        }
      });
    };
    callRec();
    findPassedDay();
  }, [data.username]);

  const handleApply = async () => {
    await applyJob(data.username, user.uid, data.time);
    setIsapply(true);
  };
  return (
    <div className='relative group/edit  bg-white shadow-md rounded-lg mb-4 mt-5'>
      <div className='relative p-4'>
        <h1 className='text-2xl font-medium mb-5 flex items-center gap-2'>
          <AiOutlineAppstoreAdd className='text-blue-500 mt-1' />
          {data.jobname}
        </h1>

        <div className='mb-2 flex items-start gap-2'>
          <div className='flex flex-col'>
            <p className='text-md font-semibold'>Description</p>
            <h1 className='text-sm ml-2 font-medium text-gray-700'>
              {data.information}
            </h1>
          </div>
        </div>

        <div className='mb-2 flex items-start gap-2'>
          <div className='flex flex-col'>
            <p className='text-md font-semibold'>Salary</p>
            <h1 className='text-sm ml-2 font-medium text-gray-700'>
              {data.salary}
            </h1>
          </div>
        </div>

        <div className='mb-2 flex items-start gap-2'>
          <div className='flex flex-col'>
            <p className='text-md font-semibold'>Experience</p>
            <h1 className='text-sm ml-2 font-medium text-gray-700'>
              {data.experience}
            </h1>
          </div>
        </div>

        <div className='mb-2 flex items-start gap-2'>
          <div className='flex flex-col'>
            <p className='text-md font-semibold'>Education</p>
            <h1 className='text-sm ml-2 font-medium text-gray-700'>
              {data.major}
            </h1>
          </div>
        </div>

        {data?.type === 1 && (
          <button
            onClick={() => handleApply()}
            className='bg-blue-500 p-2 rounded-lg absolute right-4 bottom-4 text-white font-semibold hover:bg-blue-600 transition-colors duration-200'
          >
            Apply
          </button>
        )}
      </div>
    </div>
  );
}

export default JobList;
