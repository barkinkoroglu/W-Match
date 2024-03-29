import React, { useEffect, useState } from 'react';
import JobList from './JobList';
import { useSelector } from 'react-redux';
import MyTestList from './MyTestList';

function MyTests() {
  const tests = [
    {
      name: 'CSS',
      src: 'https://play-lh.googleusercontent.com/RTAZb9E639F4JBcuBRTPEk9_92I-kaKgBMw4LFxTGhdCQeqWukXh74rTngbQpBVGxqo',
    },
    {
      name: 'HTML',
      src: 'https://play-lh.googleusercontent.com/RslBy1o2NEBYUdRjQtUqLbN-ZM2hpks1mHPMiHMrpAuLqxeBPcFSAjo65nQHbTA53YYn',
    },
    {
      name: 'JavaScript',
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png',
    },
    {
      name: 'React',
      src: 'https://www.freecodecamp.org/news/content/images/2021/06/Ekran-Resmi-2019-11-18-18.08.13.png',
    },
    {
      name: 'Java',
      src: 'https://thekingsacademy.info/wp-content/uploads/2020/10/java1.jpeg',
    },
    {
      name: 'Python',
      src: 'https://img.freepik.com/free-icon/snakes_318-368381.jpg',
    },
    {
      name: 'PHP',
      src: 'https://logowik.com/content/uploads/images/php.jpg',
    },
    {
      name: 'Ruby',
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Ruby_logo.svg/2048px-Ruby_logo.svg.png',
    },
  ];
  return (
    <div className="flex-[0.5]">
      <div className="bg-white p-4 rounded-lg mx-4 shadow-sm  ">
        <div>
          <h1 className="font-medium text-lg leading-5	 ">W-MATCH Tests</h1>
          <h1 className="font-light text-sm text-gray-400">
            These tests are done by W-Match.
          </h1>
        </div>
        <div className=" h-[440px] overflow-auto scrollbar-hide">
          {tests.map((element, index) => {
            return <MyTestList key={index} data={element} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default MyTests;
