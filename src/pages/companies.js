import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Business from '@mui/icons-material/Business';
import CompanyList from '../components/Company/CompanyList';
function Companies() {
  return (
    <div>
      <Navbar />
      <div className='bg-gray-50'>
        <div className='flex max-w-6xl px-3 pt-3 mx-auto  min-h-[calc(100vh-60px)] '>
          <div className='flex-[0.25]'>
            <div className='bg-white rounded-lg mr-2 flex flex-col justify-start items-start gap-y-3 p-2 shadow-sm '>
              <div className='flex items-center gap-x-2'>
                <Business sx={{ fontSize: 20 }} className='text-gray-500' />
                <h1 className='font-medium'>Companies</h1>
              </div>
            </div>
          </div>
          <CompanyList />
        </div>
      </div>
    </div>
  );
}

export default Companies;
