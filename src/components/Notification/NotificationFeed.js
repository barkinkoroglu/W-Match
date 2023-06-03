import React, { useEffect, useState } from 'react';
import Notification from './Notification';
import { useSelector } from 'react-redux';
import { getCompanyInfo, getAllPostbyname } from '../../firebase';

function NotificationFeed() {
  const [companies, setCompanies] = useState([]);
  const [jobposts, setJobPosts] = useState([]);

  const companyUsernames = useSelector((state) => state.auth.user.following);
  const userType = useSelector((state) => state.auth.user.type);
  const user = useSelector((state) => state.auth.user);

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
  const handleComp = () => {
    return (
      jobposts &&
      jobposts.length > 0 &&
      jobposts?.map((p) => <Notification post={p} />)
    );
  };
  useEffect(() => {
    const getPosts = async () => {
      const posts = await getAllPostbyname(user);
      const posts2 =
        posts && posts.length > 0 && posts.filter((p) => p.type === 3);

      setJobPosts(posts2);
    };
    getPosts();
  }, [user]);

  return (
    <div className='flex-[0.6] flex-col md:mx-12'>
      {userType === 1 && handleJob()}
      {userType === 2 && (
        <div className=' overflow-auto max-h-600 '> {handleComp()}</div>
      )}
    </div>
  );
}

export default NotificationFeed;
