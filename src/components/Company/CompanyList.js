import React, { useEffect, useState } from 'react';
import CompanyItem from './CompanyItem';
import { getCompany } from '../../firebase';

const CompanyList = () => {
  const [companies, setCompanies] = useState();
  useEffect(() => {
    const getCompanies = async () => {
      const data = await getCompany();
      if (data) {
        setCompanies(data);
      }
    };
    getCompanies();
  }, []);
  return (
    <div className='flex-[0.5]'>
      <div className='bg-white p-4 rounded-lg mx-4 shadow-sm '>
        <div>
          <h1 className='font-medium text-lg leading-5'>Companies</h1>
          <h1 className='font-light text-sm text-gray-400'>
            You can follow any company which fits your carrer
          </h1>
        </div>
        <div className=''>
          {companies &&
            companies.length > 0 &&
            companies.map((company, index) => {
              return <CompanyItem key={index} company={company} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default CompanyList;
