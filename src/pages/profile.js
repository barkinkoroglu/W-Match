import React from 'react';
import Navbar from '../components/Navbar';
import UserProfile from '../components/Profile/UserProfile';
import Widget from '../components/Widget';
import TestInfo from '../components/TestInfo';
import { useSelector } from 'react-redux';
import TestRightInfo from '../components/TestRightInfo';
import { useEffect, useState } from 'react';
import { getUserInfo } from '../firebase';
import { useParams } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const param = useParams();
  const userr = useSelector((state) => state.auth.user);

  useEffect(() => {
    const callValue = async () => {
      await getUserInfo(param.id)
        .then((user) => {
          setUser(user);
        })
        .catch((err) => {
          setUser(false);
        });
    };
    callValue();
  }, [param.id]);

  if (user === false) {
    return <div>Profile not found.</div>;
  }
  if (user === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className='bg-gray-50'>
        <div className='md:flex max-w-6xl px-3 pt-3 md:mx-auto'>
          <div className='w-full md:w-[70%]'>
            <UserProfile user={user} param={param} />
          </div>
          <div className='flex flex-col w-full md:w-[30%]'>
            <Widget />
            <div className='mt-3  '>
              {!user.skill &&
                user &&
                userr?.username &&
                user?.username === userr.username && <TestInfo user={user} />}
            </div>
            <div className='mt-3'>
              {user && userr?.username && user?.username === userr.username && (
                <TestRightInfo user={user} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
