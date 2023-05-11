import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const JobPortal = ({ setIsObliged }) => {
  const [obligation, setObligation] = useState('');
  const [isMlDone, setIsMlDone] = useState(false);
  return ReactDOM.createPortal(
    <>
      <div className='fixed inset-0 bg-blue-500 opacity-50 z-40'></div>
      <div className='fixed inset-0 flex items-center justify-center z-50'>
        <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto'>
          <h4 className='text-2xl font-semibold mb-6'>
            Are you obliged to complete military service ?
          </h4>
          <div className='flex justify-center space-x-4 mb-6'>
            <button
              onClick={() => setObligation('yes')}
              className='w-32 bg-blue-500 px-4 py-2 rounded-lg text-white font-semibold hover:bg-blue-600 transition-colors duration-200'
            >
              Yes
            </button>
            <button
              onClick={() => {
                setIsObliged(false);
                setObligation('no');
              }}
              className='w-32 bg-pink-500 px-4 py-2 rounded-lg text-white font-semibold hover:bg-pink-600 transition-colors duration-200'
            >
              No
            </button>
          </div>
          {obligation === 'yes' && (
            <div>
              <h4 className='text-xl font-semibold mb-4'>
                Have you completed your military service ?
              </h4>
              <div className='flex justify-center space-x-4'>
                <button
                  onClick={() => setIsMlDone(true)}
                  className='w-32 bg-green-500 px-4 py-2 rounded-lg text-white font-semibold hover:bg-green-600 transition-colors duration-200'
                >
                  Yes
                </button>
                <button
                  onClick={() => setIsMlDone(false)}
                  className='w-32 bg-red-500 px-4 py-2 rounded-lg text-white font-semibold hover:bg-red-600 transition-colors duration-200'
                >
                  No
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>,
    document.body
  );
};

export default JobPortal;
