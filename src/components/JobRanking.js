import React, { useEffect, useState } from 'react';
import { getUserId, getJobTestInfos, getCandidateById } from '../firebase';
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';

const JobRanking = () => {
  const [infos, setInfos] = useState();
  const [candidates, setCandidates] = useState([]);
  const [suser, setSuser] = useState([]);
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
  const calulatee = () => {
    infos.map((i) => {
      if (i.scores && i.scores.length > 0) {
        i.scores?.map(async (s) => {
          const user = await getCandidateById(s.userid);
          const newusr = { ...user, companyscore: s.score || 0 };
          setSuser((prev) => [...prev, newusr]);
        });
      }
    });
  };
  const select = (c, b, info) => {
    if (c && b) {
      return info.wtestvaluescore + b;
    }
    if (c && !b) {
      return info.wtestvaluescore;
    }
    return b;
  };
  const select2 = (c, b, aMilitaryScore, info) => {
    if (c && b) {
      return aMilitaryScore + info.wtestvaluescore + b;
    }
    if (c && !b) {
      return aMilitaryScore + info.wtestvaluescore;
    }
    return aMilitaryScore + b;
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
              const c =
                info.wtestvalue &&
                info.wtestvalue.length > 0 &&
                candidate.wmatchTests[info.wtestvalue] &&
                candidate.wmatchTests[info.wtestvalue] > info.wmintestvalue;
              const b = suser.find(
                (u) => u.username === candidate.username && u.companyscore
              ).companyscore;
              candidate = {
                ...candidate,
                lastScore: select2(c, b, aMilitaryScore, info),
              };
            } else {
              const c =
                info.wtestvalue &&
                info.wtestvalue.length > 0 &&
                candidate.wmatchTests[info.wtestvalue] &&
                candidate.wmatchTests[info.wtestvalue] > info.wmintestvalue;
              const b = suser.find(
                (u) => u.username === candidate.username && u.companyscore
              ).companyscore;

              candidate = {
                ...candidate,
                lastScore: select(c, b, info),
              };
            }
            return candidate;
          })
          .filter((el) => typeof el.lastScore === 'number')
          .sort((a, b) => b.lastScore - a.lastScore)
    );

    const newArr = sortedCandidates.reduce((acc, current) => {
      if (!acc.some((el) => el.username === current.username)) {
        acc.push(current);
      }
      if (acc.find((el) => el.username === current.username)) {
        acc.push(current);
      }
      return acc;
    }, []);

    return newArr;
  };

  useEffect(() => {
    handleCandidate();
    if (infos) {
      calulatee();
    }
  }, [infos]);

  useEffect(() => {
    if (candidates && candidates.length > 0) {
      const rr = sortCandidates();
      let resultArr = rr.reduce((acc, curr) => {
        let existing = acc.find((user) => user.username === curr.username);

        if (!existing) {
          acc.push(curr);
        } else if (existing.lastScore < curr.lastScore) {
          existing.lastScore = curr.lastScore;
        }

        return acc;
      }, []);
      setSorted(resultArr);
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
