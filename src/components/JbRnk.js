import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCandidateById } from '../firebase';
import { Avatar } from '@mui/material';

const JbRnk = () => {
  const [allCandidatesId, setAllCandidatesId] = useState([]);

  const [candidateObj, setCandidateObj] = useState([]);
  const [scores, setScores] = useState([]);
  const [calculatedUsers, setCalculatedUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);

  const { jobpost } = useSelector((state) => state.jobpost);

  const allPosts = useSelector((state) => state.auth.user.posts);

  const handleCandidate = () => {
    const candidates = jobpost.candidates;
    if (candidates && candidates.length > 0) {
      const handledCandidates = candidates.reduce((acc, curr) => {
        if (acc.indexOf(curr) === -1) {
          acc.push(curr);
        }
        return acc;
      }, []);
      setAllCandidatesId(handledCandidates);
    }
  };

  useEffect(() => {
    handleCandidate();
  }, [jobpost]);

  useEffect(() => {
    if (allCandidatesId && allCandidatesId.length > 0) {
      allCandidatesId.map(async (cid) => {
        const user = await getCandidateById(cid);
        setCandidateObj((prev) => [...prev, user]);
      });
    }
  }, [allCandidatesId]);
  useEffect(() => {
    if (allPosts && allPosts.length > 0) {
      allPosts.map((post) => {
        if (jobpost && jobpost.testvalue && post && post.testname) {
          if (jobpost.testvalue === post.testname) {
            setScores(post.scores);
          }
        }
      });
    }
  }, [jobpost, allPosts]);
  useEffect(() => {
    handleTotalPoint();
  }, [candidateObj, jobpost]);
  const handleTotalPoint = () => {
    if (jobpost.isMilitaryService === 'true') {
      candidateObj.map((candidate) => {
        let candidateWPoint = 0;
        const candidateMilitaryPoint = candidate.militaryServiceScore;
        if (jobpost.wtestvalue) {
          if (
            candidate.wmatchTests[jobpost.wtestvalue] &&
            candidate.wmatchTests[jobpost.wtestvalue] >= jobpost.wmintestvalue
          ) {
            candidateWPoint = jobpost.wtestvaluescore;
          }
        }

        if (jobpost.mintestvalue && jobpost.testvaluescore) {
          if (scores.length === 0) {
            const newUsr = {
              ...candidate,
              totalScore: candidateWPoint + candidateMilitaryPoint,
            };
            setCalculatedUsers((prev) => [...prev, newUsr]);
          }
          scores.map((score) => {
            console.log('hello');

            allCandidatesId &&
              allCandidatesId.map((id) => {
                if (
                  score.userid === id &&
                  score.score >= jobpost.mintestvalue
                ) {
                  const newUsr = {
                    ...candidate,
                    totalScore:
                      candidateWPoint +
                      candidateMilitaryPoint +
                      jobpost.testvaluescore,
                  };
                  setCalculatedUsers((prev) => [...prev, newUsr]);
                }
                const newUsr = {
                  ...candidate,
                  totalScore: candidateWPoint + candidateMilitaryPoint,
                };
                setCalculatedUsers((prev) => [...prev, newUsr]);
              });
          });
        }
      });
    }

    if (jobpost.isMilitaryService === 'false') {
      candidateObj.map((candidate) => {
        let candidateWPoint = 0;
        if (jobpost.wtestvalue) {
          if (
            candidate.wmatchTests[jobpost.wtestvalue] &&
            candidate.wmatchTests[jobpost.wtestvalue] >= jobpost.wmintestvalue
          ) {
            candidateWPoint = jobpost.wtestvaluescore;
          }
        }

        if (jobpost.mintestvalue && jobpost.testvaluescore) {
          if (scores.length === 0) {
            const newUsr = {
              ...candidate,
              totalScore: candidateWPoint,
            };
            setCalculatedUsers((prev) => [...prev, newUsr]);
          }
          scores.map((score) => {
            allCandidatesId &&
              allCandidatesId.map((id) => {
                if (
                  score.userid === id &&
                  score.score >= jobpost.mintestvalue
                ) {
                  const newUsr = {
                    ...candidate,
                    totalScore: candidateWPoint + jobpost.testvaluescore,
                  };
                  setCalculatedUsers((prev) => [...prev, newUsr]);
                }
              });
            const newUsr = {
              ...candidate,
              totalScore: candidateWPoint,
            };
            setCalculatedUsers((prev) => [...prev, newUsr]);
          });
        }
      });
    }
  };
  const eliminzeUsers = () => {
    return calculatedUsers.reduce((acc, current) => {
      if (!acc.some((el) => el.username === current.username)) {
        acc.push(current);
      }

      return acc;
    }, []);
  };
  useEffect(() => {
    const a = eliminzeUsers();
    const b = a
      .filter((el) => typeof el.totalScore === 'number')
      .sort((a, b) => b.totalScore - a.totalScore);
    if (b) {
      setSortedUsers(b);
    }
  }, [calculatedUsers]);
  return (
    <>
      {sortedUsers.map((s) => (
        <div
          className='flex gap-x-2 border-b-2 pb-3 border-gray-100'
          key={s?.username}
        >
          <div>
            <Avatar src={s.ProfileUrl} />
          </div>
          <div className='flex items-center justify-between w-full pr-6 '>
            <a href={`/profile/${s?.username}`} className=' hover:underline '>
              {s?.name} {s?.lastname}
            </a>
            <h1 className='text-lg font-semibold'>{s.totalScore}</h1>
          </div>
        </div>
      ))}
    </>
  );
};

export default JbRnk;
