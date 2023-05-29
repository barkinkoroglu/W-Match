import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const LeaveBtn = () => {
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(-1);
  }
  return (
    <div
      className='mt-10'
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <button
        onClick={handleGoBack}
        className='bg-blue-500 text-white py-3 px-6 rounded-lg text-lg font-medium hover:bg-blue-400 transition duration-200 ease-in-out'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.2rem',
        }}
      >
        <FaArrowLeft className='mr-2' size={20} />
        You can leave and continue later
      </button>
    </div>
  );
};
export default LeaveBtn;
