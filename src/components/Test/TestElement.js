import React, { useEffect, useState } from 'react';

function TestElement({ record, index, setScore, handleCurrentIndex }) {
  const handleScore = (chosen) => {
    if (chosen === record?.correct) {
      setScore((prevScore) => prevScore + 6.67);
    }
    if (chosen !== record?.correct) {
      setScore((prevScore) => (prevScore - 6.67 > 0 ? prevScore - 6.67 : 0));
    }
  };

  return (
    <div className='flex flex-col gap-y-1'>
      {record ? (
        <>
          <div className='flex gap-x-1 items-center flex-wrap'>
            <h1 className='font-medium'>{`${index + 1}. `}</h1>
            <p className='text-lg'>{record?.question}</p>
          </div>
          <div className='inline-flex flex-col gap-y-2 md:gap-x-2 md:flex-row'>
            <div
              onClick={() => {
                handleCurrentIndex();
                handleScore('a');
              }}
              className={`px-2 py-1 rounded-lg w-full md:w-auto hover:bg-slate-500 bg-slate-300 cursor-pointer`}
            >{`A-) ${record?.a}`}</div>
            <div
              onClick={() => {
                handleCurrentIndex();
                handleScore('b');
              }}
              className={`px-2 py-1 rounded-lg w-full md:w-auto hover:bg-slate-500 bg-slate-300 cursor-pointer`}
            >{`B-) ${record?.b}`}</div>
            <div
              onClick={() => {
                handleCurrentIndex();
                handleScore('c');
              }}
              className={`px-2 py-1 rounded-lg w-full md:w-auto hover:bg-slate-500 bg-slate-300 cursor-pointer `}
            >{`C-) ${record?.c}`}</div>
            <div
              onClick={() => {
                handleCurrentIndex();
                handleScore('d');
              }}
              className={`px-2 py-1 rounded-lg w-full md:w-auto hover:bg-slate-500 bg-slate-300 cursor-pointer `}
            >{`D-) ${record?.d}`}</div>
          </div>
        </>
      ) : (
        'Loading...'
      )}
    </div>
  );
}

export default TestElement;
