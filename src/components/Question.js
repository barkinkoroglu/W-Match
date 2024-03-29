import React from 'react';
import { Form, Formik } from 'formik';
import { QuestionSchema } from '../validation/index';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { createCompanyTest, getUserId } from '../firebase';
import { useId } from 'react';
import { v4 } from 'uuid';

function Question({
  nquestions,
  setShowCreateTest,
  time,
  companyname,
  email,
  tname,
  qinform,
  qscore,
  username,
  refreshData,
}) {
  const user = useSelector((state) => state.auth.user);
  const [nindex, setNindex] = useState(0);
  const [tempData, setTempData] = useState(null);
  const [value, setvalue] = useState(false);
  const [value2, setvalue2] = useState(false);
  const [value3, setvalue3] = useState(false);
  const [value4, setvalue4] = useState(false);
  const testID = useId();
  const [darray, setDarray] = useState([]);

  const handleBack = () => {
    setTempData(darray.pop());
    setNindex(nindex - 1);
  };

  const handleSubmit = async (values, actions) => {
    let flag = 0;
    let trueAns = '';
    if (
      value === false &&
      value2 === false &&
      value3 === false &&
      value4 === false
    ) {
      window.alert('Please tick the correct option.');
      return -1;
    } else {
      if (value === true) {
        flag = 1;
        trueAns = 'option1';
      }
      if (value2 === true) {
        if (flag === 1) {
          window.alert('Please tick only 1 option');
          return -1;
        }
        trueAns = 'option2';
        flag = 1;
      }
      if (value3 === true) {
        if (flag === 1) {
          window.alert('Please tick only 1 option');
          return -1;
        }
        trueAns = 'option3';
        flag = 1;
      }
      if (value4 === true) {
        if (flag === 1) {
          window.alert('Please tick only 1 option');
          return -1;
        }
        flag = 1;
        trueAns = 'option4';
      }
    }
    const data = {
      question: values.question,
      questionTime: values.questionTime,
      option1: values.option1,
      option2: values.option2,
      option3: values.option3,
      option4: values.option4,
      correct: trueAns,
    };

    darray.push(data);

    values.question = '';
    values.questionTime = '';
    values.option1 = '';
    values.option2 = '';
    values.option3 = '';
    values.option4 = '';
    setvalue(false);
    setvalue2(false);
    setvalue3(false);
    setvalue4(false);
    const uid = await getUserId(user?.username);
    if (nindex + 1 === parseInt(nquestions)) {
      //await createCompanyTest(user.uid, darray);
      const finaldata = {
        type: 2,
        id: v4(),
        questions: darray,
        time: Date.now(),
        scores: [],
        uid,
        name: companyname,
        email: email,
        testname: tname,
        information: qinform,
        qscore: qscore,
        username: username,
      };
      await createCompanyTest(uid, finaldata).then(
        async () => await refreshData()
      );

      setShowCreateTest(false);
    } else {
      setNindex(nindex + 1);
    }
  };

  if (parseInt(nquestions) <= 0) {
    return (
      <div className='text-center w-full text-xl '>
        Please enter a value greater than 0 for the number of questions
      </div>
    );
  }
  return (
    <div className='w-full my-1 pb-3  border-b-2 border-gray-300 px-2 '>
      <h1 className='text-center text-lg font-medium py-2'>{`${
        nindex + 1
      }/${nquestions}`}</h1>
      <Formik
        validationSchema={QuestionSchema}
        initialValues={{
          question: '',
          questionTime: 0,
          option1: '',
          option2: '',
          option3: '',
          option4: '',
        }}
        onSubmit={handleSubmit}
      >
        {({
          isSubmitting,
          isValid,
          dirty,
          values,
          errors,
          touched,
          handleChange,
        }) => (
          <Form>
            <div className='flex flex-col gap-y-3'>
              <div className='flex gap-x-3 '>
                <h1>{`Question ${nindex + 1}: `} </h1>
                <textarea
                  className='flex flex-1 px-2 py-1 outline-none border rounded-lg  overflow-y-auto resize-none scrollbar-hide text-sm'
                  name='question'
                  value={values.question}
                  onChange={handleChange}
                  style={{ height: 'auto', minHeight: '50px' }}
                  onInput={(e) =>
                    (e.target.style.height = `${e.target.scrollHeight}px`)
                  }
                ></textarea>
              </div>

              <div className='flex gap-x-3 '>
                <h1>{`Question ${nindex + 1}`}'s Time</h1>
                <input
                  className='flex flex-1 px-2 py-1 outline-none border rounded-lg  overflow-y-auto resize-none scrollbar-hide text-sm'
                  name='questionTime'
                  value={values.questionTime}
                  placeholder={`in seconds`}
                  onChange={handleChange}
                  type='number'
                />
              </div>

              <div className='flex gap-x-3 '>
                <h1>Option 1:</h1>
                <textarea
                  className='flex flex-1 px-2 py-1 outline-none border rounded-lg  overflow-y-auto resize-none scrollbar-hide text-sm'
                  name='option1'
                  value={values.option1}
                  onChange={handleChange}
                  rows='1'
                />
                <input
                  type='checkbox'
                  value={value}
                  onChange={() => setvalue(!value)}
                  checked={value === true}
                />
              </div>

              <div className='flex gap-x-3'>
                <h1>Option 2:</h1>
                <textarea
                  className='flex flex-1 px-2 py-1 outline-none border rounded-lg  overflow-y-auto resize-none scrollbar-hide text-sm'
                  name='option2'
                  value={values.option2}
                  onChange={handleChange}
                  rows='1'
                />
                <input
                  type='checkbox'
                  value={value2}
                  onChange={() => setvalue2(!value2)}
                  checked={value2 === true}
                />
              </div>

              <div className='flex gap-x-3'>
                <h1>Option 3:</h1>
                <textarea
                  className='flex flex-1 px-2 py-1 outline-none border rounded-lg  overflow-y-auto resize-none scrollbar-hide text-sm'
                  name='option3'
                  value={values.option3}
                  onChange={handleChange}
                  rows='1'
                />
                <input
                  type='checkbox'
                  value={value3}
                  onChange={() => setvalue3(!value3)}
                  checked={value3 === true}
                />
              </div>

              <div className='flex gap-x-3'>
                <h1>Option 4:</h1>
                <textarea
                  className='flex flex-1 px-2 py-1 outline-none border rounded-lg  overflow-y-auto resize-none scrollbar-hide text-sm'
                  name='option4'
                  value={values.option4}
                  onChange={handleChange}
                  rows='1'
                />
                <input
                  type='checkbox'
                  value={value4}
                  onChange={() => setvalue4(!value4)}
                  checked={value4 === true}
                />
              </div>
            </div>
            <div className='flex  gap-x-10 mt-3 w-full relative justify-center'>
              <button
                className='p-2 hover:bg-slate-500 hover:text-white rounded-full flex items-center justify-center cursor-pointer'
                disabled={nindex === 0 ? true : false}
                onClick={() => handleBack()}
                type='button'
              >
                Prev Question
              </button>

              <button
                className='p-2 hover:bg-slate-500 hover:text-white rounded-full flex items-center justify-center cursor-pointer'
                type='submit'
                // disabled={nindex + 1 === parseInt(nquestions) ? true : false}
              >
                {nindex + 1 === parseInt(nquestions)
                  ? 'Create Test'
                  : 'Next Question'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Question;
