import React from 'react';
import Feed from '../components/Feed';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Widget from '../components/Widget';
import { useSelector } from 'react-redux';

function Homepage() {
  const user = useSelector((state) => state.auth.user);
  if (user === null) {
    return <div>Loading...</div>;
  }
  return (
    <div className='w-full  '>
      <Navbar />
      <div className=' bg-gray-50  min-h-[calc(100vh-60px)]'>
        <div className=' flex flex-col md:flex-row  max-w-6xl px-3 pt-3 mx-auto  '>
          <Sidebar />
          <Feed />
          <Widget />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
