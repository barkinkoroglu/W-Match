import React from 'react';
import Navbar from '../components/Navbar';
import UserProfile from '../components/Profile/UserProfile';
import Widget from '../components/Widget';
import TestInfo from '../components/TestInfo';
import { useSelector } from 'react-redux';
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
  console.log('user1', user);
  return (
    <div>
      <Navbar />
      <div className='bg-gray-50'>
        <div className='flex max-w-6xl px-3 pt-3 mx-auto'>
          <div style={{ width: '70%' }}>
            <UserProfile user={user} param={param} />
          </div>
          <div className='flex flex-col' style={{ width: '30%' }}>
            <Widget />
            {!user.skill &&
              user &&
              user?.username === userr &&
              userr?.username && <TestInfo user={user} className='mt-0' />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
