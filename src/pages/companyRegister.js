import React, { useState, useMemo, useEffect } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { RegionDropdown } from 'react-country-region-selector';
import { Helmet } from 'react-helmet';
import { CompanyRegisterSchema } from '../validation/index';
import { Formik, Form, ErrorMessage } from 'formik';
import { companyRegister } from '../firebase';
import { useNavigate, useLocation, Link } from 'react-router-dom';

function CompanyRegister() {
  const [country, setCountry] = useState('');
  const [tNumber, setTNumber] = useState('');
  const [phoneCodeCountry, setPhoneCodeCountry] = useState('us');
  const options = useMemo(() => countryList().getData(), []);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (values, actions) => {
    const {
      companyname,
      username,
      about,
      longabout,
      email,
      adressline1,
      adressline2,
      password,
    } = values;

    const response = await companyRegister(
      companyname,
      username,
      about,
      longabout,
      email,
      country.label,
      adressline1,
      adressline2,
      tNumber,
      password
    );
    if (response) {
      navigate(location.state?.return_url || '/home', {
        replace: true,
      });
    }
  };
  useEffect(() => {
    if (country.value) {
      setPhoneCodeCountry(country.value.toLowerCase());
    }
  }, [country]);
  return (
    <div class='bg-grey-lighter h-full flex flex-col relative'>
      <Helmet>
        <title>Register • W-MATCH</title>
      </Helmet>
      <img
        src={require('../images/image1.jpg')}
        alt='background'
        className='absolute top-0 left-0 h-full w-full object-cover  '
      />
      <div className='absolute top-0 left-0  h-full w-full  bg-slate-600 opacity-50'></div>
      <div className='container max-w-xl mx-auto flex-1 flex flex-col items-center justify-center px-2 z-10 my-4'>
        <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
          <Formik
            validationSchema={CompanyRegisterSchema}
            initialValues={{
              companyname: '',
              username: '',
              about: '',
              longabout: '',
              email: '',
              adressline1: '',
              adressline2: '',
              password: '',
              confirmpassword: '',
            }}
            onSubmit={handleSubmit}
          >
            {({
              isSubmitting,
              isValid,
              dirty,
              values,
              errors,
              touched,
              handleChange,
            }) => (
              <Form>
                <h1 class='mb-8 text-3xl text-center'>Sign Up</h1>
                <input
                  type='text'
                  class='block border border-grey-light w-full p-3 rounded mt-4'
                  name='companyname'
                  placeholder='Company Name'
                  value={values.companyname}
                  onChange={handleChange}
                />
                {errors.companyname && touched.companyname && (
                  <div className=' text-red-600'>{errors.companyname}</div>
                )}
                <input
                  type='text'
                  className='block border border-grey-light w-full p-3 rounded mt-4'
                  name='username'
                  placeholder='Username'
                  value={values.username}
                  onChange={handleChange}
                />
                {errors.username && touched.username && (
                  <div className=' text-red-600'>{errors.username}</div>
                )}
                {/* <p>{`You selected ${errors.firstname}`}</p> */}
                <textarea
                  className='block border border-grey-light w-full p-3 rounded mt-4  outline-none   overflow-y-auto resize-none scrollbar-hide '
                  name='about'
                  placeholder='Please provide short information about your company (max 80 characters)'
                  value={values.about}
                  onChange={handleChange}
                ></textarea>
                {errors.about && touched.about && (
                  <div className=' text-red-600'>{errors.about}</div>
                )}
                <textarea
                  className=' block border border-grey-light w-full p-3 rounded mt-4 overflow-y-auto resize-none scrollbar-hide'
                  type='text'
                  name='longabout'
                  placeholder='Detailed About the company '
                  value={values.longabout}
                  onChange={handleChange}
                ></textarea>
                {errors.longabout && touched.longabout && (
                  <div className='text-red-600'>{errors.longabout}</div>
                )}
                <input
                  type='text'
                  class='block border border-grey-light w-full p-3 rounded mt-4'
                  name='email'
                  placeholder='Email'
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && touched.email && (
                  <div className=' text-red-600'>{errors.email}</div>
                )}
                <Select
                  options={options}
                  id='country'
                  value={country}
                  //onChange={handleChange}
                  onChange={(val) => setCountry(val)}
                  className=' w-full  rounded mt-4'
                  placeholder='Select Country'
                />
                {/* <p>{`You selected ${country.label}`}</p> */}
                {/* <RegionDropdown
            country={country}
            value={city}
            onChange={(val) => setTNumber(val)}
          /> */}
                <input
                  type='text'
                  class='block border border-grey-light w-full p-3 rounded mt-4'
                  name='adressline1'
                  placeholder='Adress Line 1'
                  id='adressline1'
                  value={values.adressline1}
                  onChange={handleChange}
                />
                {errors.adressline1 && touched.adressline1 && (
                  <div className='text-red-600'>{errors.adressline1}</div>
                )}
                <input
                  type='text'
                  class='block border border-grey-light w-full p-3 rounded mt-4'
                  name='adressline2'
                  id='adressline2'
                  placeholder='Adress Line 2 (Optional)'
                  value={values.adressline2}
                  onChange={handleChange}
                />
                <PhoneInput
                  containerStyle={{
                    border: 'none',
                    width: '100%',
                  }}
                  inputStyle={{
                    width: '100%',
                  }}
                  placeholder='Enter phone number'
                  value={tNumber}
                  country={phoneCodeCountry}
                  onChange={setTNumber}
                  id='phone'
                  //value={values.phone}
                  //onChange={handleChange}
                  className=' w-full flex border   rounded mt-4'
                />

                <input
                  type='password'
                  class='block border border-grey-light w-full p-3 rounded mt-4'
                  id='password'
                  placeholder='Password'
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password && touched.password && (
                  <div className='text-red-600'>{errors.password}</div>
                )}
                <input
                  type='password'
                  class='block border border-grey-light w-full p-3 rounded my-4'
                  name='confirmpassword'
                  placeholder='Confirm Password'
                  value={values.confirmpassword}
                  onChange={handleChange}
                />
                {errors.confirmpassword && touched.confirmpassword && (
                  <div className='text-red-600'>{errors.confirmpassword}</div>
                )}
                <button
                  type='submit'
                  class='w-full bg-slate-500 text-center py-3 rounded hover:bg-slate-400 focus:outline-none my-1'
                >
                  Create Account
                </button>
              </Form>
            )}
          </Formik>
          <div className='text-center text-sm text-grey-dark mt-4'>
            By signing up, you agree to the{' '}
            <Link
              className='no-underline border-b border-grey-dark text-grey-dark text-blue-600'
              to='#'
            >
              Terms of Service{' '}
            </Link>
            and{' '}
            <Link
              className='no-underline border-b border-grey-dark text-grey-dark text-blue-600'
              to='#'
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className='text-grey-dark mt-6'>
          Already have an account?
          <Link className=' no-underline text-blue-600 ' to='../login/'>
            {' '}
            Log in
          </Link>
          .
        </div>
      </div>
    </div>
  );
}

export default CompanyRegister;
