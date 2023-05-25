import React from 'react';
import Navbar from '../components/Navbar';
import NotificationFeed from '../components/Notification/NotificationFeed';
import Sidebar from '../components/Sidebar';
import Widget from '../components/Widget';
import { useSelector } from 'react-redux';
import Datee from '../components/Datee';
function Notifications() {
  const user = useSelector((state) => state.auth.user);
  if (user === null) {
    return <div>Loading...</div>;
  }
  return (
    <div className='w-full'>
      <Navbar />
      <div className='bg-gray-50'>
        <div className='md:flex max-w-6xl px-3 pt-3 mx-auto'>
          <div className='flex flex-col md:w-1/5 space-y-1'>
            <div className='my-0 py-0 mb-4'>
              <Sidebar />
            </div>
            <div className='my-0 py-0'>
              <Datee />
            </div>
          </div>
          <NotificationFeed />
          <Widget />
        </div>
      </div>
    </div>
  );
}

export default Notifications;
