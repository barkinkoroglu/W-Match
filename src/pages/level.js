import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createLevel, updateSkill } from '../firebase';
import { addQuestionsBySection } from '../helpers/utils';
import { useDispatch } from 'react-redux';
import { setQuestions } from '../store/questions';
import LeaveBtn from '../components/LeaveBtn';
function Level() {
  const [dlevel, setDLevel] = useState('Select your level');
  const [showTooltip, setShowTooltip] = useState(true);
  const [values, setValues] = useState({
    JobCategory: '',
  });
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
      await createLevel(user?.username, dlevel);
      navigate(`/test/${user?.JobCategory}`);
      addQuestionsBySection(user?.JobCategory, dlevel).then((result) => {
        setShowTooltip(!result.success);
        dispatch(setQuestions(result.questions));
      });
    } else {
      setShowTooltip(true);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  useEffect(() => {
    if (values.JobCategory) {
      const fetchData = async () => {
        await updateSkill(user?.username, values.JobCategory);
      };
      fetchData();
    }
  }, [values.JobCategory, user?.username]);
  return (
    <div className='min-h-screen flex items-center justify-center bg-[#e5e7eb] dark:bg-gray-800'>
      <div className='flex flex-col items-center w-full'>
        <h1 className='text-center text-4xl font-bold text-gray-900 dark:text-white'>
          This is W-MATCH's programming skill test.
        </h1>
        <h2 className='text-center text-lg font-medium text-gray-500 dark:text-gray-400 mt-2 mb-10'>
          This test will determine your programming skill score.
        </h2>
        {user && !user?.isTest && user?.JobCategory ? (
          <form
            onSubmit={handleSubmit}
            className='bg-white dark:bg-gray-700 p-10 rounded-lg shadow-md w-full max-w-lg'
          >
            <label
              for='levels'
              className='block mb-4 text-sm font-medium text-gray-900 dark:text-white'
            >
              Your Test Level
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
              <option
                value='Select your level'
                disabled
                className='text-gray-400'
              >
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
        ) : (
          <div className='w-full max-w-lg'>
            <label
              htmlFor='JobCategory'
              className='block mb-4 text-sm font-medium text-gray-900 dark:text-white'
            >
              Your Programming Language
            </label>
            <select
              value={values.JobCategory}
              onChange={handleChange}
              name='JobCategory'
              className='w-full block p-2 outline-none border border-grey-light rounded appearance-none bg-gray-50 border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500'
            >
              <option value='' disabled hidden style={{ color: 'transparent' }}>
                Choose a Programming Language
              </option>
              <option value='HTML'>HTML</option>
              <option value='CSS'>CSS</option>
              <option value='JavaScript'>JavaScript</option>
              <option value='React'>React.js</option>
            </select>
          </div>
        )}
        <LeaveBtn />
      </div>
    </div>
  );
}

export default Level;
