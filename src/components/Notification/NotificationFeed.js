import React, { useEffect, useState } from 'react';
import Notification from './Notification';
import { useSelector } from 'react-redux';
import { getCompanyInfo } from '../../firebase';

function NotificationFeed() {
  const [companies, setCompanies] = useState([]);

  const companyUsernames = useSelector((state) => state.auth.user.following);
  const userType = useSelector((state) => state.auth.user.type);

  useEffect(() => {
    if (companyUsernames) {
      companyUsernames.map(async (u) => {
        const c = await getCompanyInfo(u);
        if (c) {
          setCompanies((prev) => [...prev, c]);
        }
      });
    }
  }, [companyUsernames]);
  const handleJob = () => {
    return companies.map((p) =>
      p.posts.map(
        (c) =>
          c.jobname && (
            <Notification
              username={c.username}
              jname={c.jobname}
              cname={c.name}
              desc={c.information}
            />
          )
      )
    );
  };
  return (
    <div className='flex-1 flex-col md:mx-12'>
      {userType === 1 && handleJob()}
    </div>
  );
}

export default NotificationFeed;
