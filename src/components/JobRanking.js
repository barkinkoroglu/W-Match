import React, { useEffect, useState } from 'react';
import { getUserId, getJobTestInfos, getCandidateById } from '../firebase';
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';

const JobRanking = () => {
  const [infos, setInfos] = useState();
  const [candidates, setCandidates] = useState([]);
  const [sorted, setSorted] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user && user?.username) {
      const getId = async () => {
        const id = await getUserId(user?.username);
        const fetchedinfos = await getJobTestInfos(id);
        if (fetchedinfos) {
          setInfos(fetchedinfos);
        }
      };
      getId();
    }
  }, [user]);

  const handleCandidate = async () => {
    infos &&
      infos.length > 0 &&
      Promise.all(
        infos?.map((info) => {
          return (
            info.candidates &&
            info.candidates?.map(async (candidate) => {
              const user = await getCandidateById(candidate);
              return user;
            })
          );
        })
      ).then((nestedUsers) => {
        const users = [].concat(...nestedUsers);
        const validUsers = users.filter(Boolean);

        validUsers.map((a) =>
          a.then((data) =>
            setCandidates((prevCandidates) => [...prevCandidates, data])
          )
        );
      });
  };

  const sortCandidates = () => {
    if (!infos || infos.length === 0) return;

    const sortedCandidates = infos.flatMap(
      (info) =>
        candidates &&
        [...candidates]
          .map((candidate) => {
            const aMilitaryScore =
              candidate.militaryServiceScore &&
              candidate.militaryServiceScore > 0
                ? candidate.militaryServiceScore
                : 0;
            if (info.isMilitaryService === 'true') {
              candidate.lastScore =
                aMilitaryScore + candidate.wmatchTests[info.wtestvalue];
            } else {
              candidate.lastScore = candidate.wmatchTests[info.wtestvalue];
            }
            return candidate;
          })
          .sort((a, b) => b.lastScore - a.lastScore)
    );

    return [...new Set(sortedCandidates)];
  };
  console.log('HADİ AMK', sortCandidates());
  useEffect(() => {
    handleCandidate();
  }, [infos]);

  useEffect(() => {
    if (candidates && candidates.length > 0) {
      setSorted(sortCandidates());
    }
  }, [candidates]);

  return (
    <>
      {sorted.map((s) => (
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
            <h1 className='text-lg font-semibold'>{s.lastScore}</h1>
          </div>
        </div>
      ))}
    </>
  );
};

export default JobRanking;
