import React, { useEffect, useRef, useState } from 'react';
import TestElement from '../components/Test/TestElement';
import Data2 from '../questions/examquestion.json';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { updateExam, fetchQuestions, getUserId } from '../firebase';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Test() {
  const [data, setData] = useState([]);
  const [score, setScore] = useState(0);
  const [disButton, setdisButton] = useState(false);
  const [cquestion, setCquestion] = useState(0);
  const [examtime, setExamtime] = useState(300);
  const { questions } = useSelector((state) => state.questions);

  const timerId = useRef();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  console.log('User bilgisi', user);
  const param = useParams();
  console.log('Param bilgisi', param.id);

  useEffect(() => {
    timerId.current = setInterval(() => {
      setExamtime((examtime) => examtime - 1);
    }, 1000);
    return () => clearInterval(timerId.current);
  }, []);

  useEffect(() => {
    const handleTime = async () => {
      if (examtime === 0) {
        if (score >= 45) {
          const id = await getUserId(user.username);

          await updateExam(id, param.id);
        }
        clearInterval(timerId.current);
        navigate(`/home`);
      }
    };
    handleTime();
  }, [examtime]);

  const handleCurrentIndex = () => {
    setCquestion((prev) => prev + 1);
    if (questions.length === cquestion + 2) {
      setdisButton(true);
    }
  };
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  const calculateScore = (totalPoint) => {
    const kalan = totalPoint > 100 ? totalPoint % 100 : totalPoint;
    const score = totalPoint > 100 ? totalPoint - kalan : totalPoint;
    return Math.ceil(score);
  };

  useEffect(() => {
    const handleExam = async () => {
      const id = await getUserId(user.username);

      if (id) {
        if (cquestion + 1 > 15) {
          await updateExam(id, param.id, calculateScore(score));
          navigate(`/home`);
        }
      }
    };
    handleExam();
  }, [cquestion]);

  return (
    <div className='h-screen bg-gray-200 relative flex flex-col items-center gap-y-3'>
      <div className='absolute right-4 top-1 bg-slate-300 px-4 py-2 rounded-full font-medium text-lg text-center z-10 w-24 sm:w-32 md:w-40 lg:w-48 xl:w-56 2xl:w-64'>
        {formatTime(examtime)}
      </div>
      <div className='fixed right-4 top-1/2 bg-slate-300 px-6 py-5 rounded-full font-medium text-lg'>
        {calculateScore(score)}
      </div>
      <h1 className='text-3xl font-semibold'>
        {cquestion + 1} / {questions.length}
      </h1>
      <div className='max-w-2xl mx-auto w-full shadow-md relative mb-4'>
        {' '}
        {/* Added mb-4 class here */}
        <div className='flex rounded-lg px-3 py-5 bg-white flex-col gap-y-4'>
          <TestElement
            index={cquestion}
            record={questions[cquestion]}
            setScore={setScore}
            handleCurrentIndex={handleCurrentIndex}
          />
        </div>
      </div>
    </div>
  );
}

export default Test;
