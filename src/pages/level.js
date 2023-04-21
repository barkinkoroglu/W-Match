import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createLevel } from '../firebase';
import { addQuestionsBySection } from '../helpers/utils';
import { useDispatch } from 'react-redux';
import { setQuestions } from '../store/questions';

function Level() {
  const [dlevel, setDLevel] = useState('Select your level');
  const [showTooltip, setShowTooltip] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSelection = (e) => {
    if (e.target.value !== 'Select your level') {
      setDLevel(e.target.value);
      setShowTooltip(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('bb', dlevel, user?.JobCategory);

    if (dlevel !== 'Select your level' && user?.JobCategory) {
      setShowTooltip(false);
      const a = await createLevel(user?.username, dlevel);
      navigate(`/test/${user?.JobCategory}`);
      addQuestionsBySection(user?.JobCategory, dlevel).then((result) => {
        setShowTooltip(!result.success);
        dispatch(setQuestions(result.questions));
      });
    } else {
      setShowTooltip(true);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#e5e7eb] dark:bg-gray-800'>
      <form
        onSubmit={handleSubmit}
        className='bg-white dark:bg-gray-700 p-10 rounded-lg shadow-md w-full max-w-lg'
      >
        <label
          for='levels'
          className='block mb-4 text-sm font-medium text-gray-900 dark:text-white'
        >
          Your Level
        </label>
        <select
          value={dlevel}
          onChange={handleSelection}
          id='levels'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
          focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600
          dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
          mb-4 transition duration-200 ease-in-out w-full'
        >
          <option value='Select your level' disabled className='text-gray-400'>
            Select your starting level
          </option>
          <option value='easy'>easy</option>
          <option value='normal'>normal</option>
          <option value='difficult'>difficult</option>
        </select>
        {showTooltip && (
          <div className='text-red-500 text-xs mt-1'>
            Please select a level before proceeding.
          </div>
        )}
        <button
          type='submit'
          disabled={showTooltip}
          className='bg-blue-500 text-white text-center py-3 rounded-md hover:bg-blue-400 focus:outline-none w-full transition duration-200 ease-in-out transform hover:-translate-y-1 shadow-md disabled:bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none disabled:hover:-translate-y-0'
        >
          Start Your Test!
        </button>
      </form>
    </div>
  );
}

export default Level;
