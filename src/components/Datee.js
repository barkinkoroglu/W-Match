import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
const CustomInput = ({ value, onClick }) => (
  <button
    onClick={onClick}
    className='py-2 px-4 w-full bg-white text-gray-800 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200'
  >
    {value}
  </button>
);

const Datee = () => {
  const [startDate, setStartDate] = useState(new Date());
  console.log('🚀 ~ file: Datee.js:15 ~ Datee ~ startDate:', startDate);

  return (
    <div className='w-full'>
      <h1 className='text-lg font-bold mb-2 text-blue-600'>
        When do you want to get candidates ranking information ?
      </h1>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        customInput={<CustomInput />}
      />
    </div>
  );
};

export default Datee;
