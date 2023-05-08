import React, { useState, useMemo, useEffect } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { RegionDropdown } from 'react-country-region-selector';
import { Helmet } from 'react-helmet';
import { RegisterSchema } from '../validation/index';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { userRegister } from '../firebase';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { v4 } from 'uuid';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, changeUserCV } from '../firebase';
function UserRegister() {
  const [country, setCountry] = useState('');
  const [tNumber, setTNumber] = useState('');
  const options = useMemo(() => countryList().getData(), []);
  const [cvUpload, setCvUpload] = useState(null);
  const [phoneCodeCountry, setPhoneCodeCountry] = useState('us');
  const [fileName, setFileName] = useState('');
  const [inputKey, setInputKey] = useState(Date.now());
  const [isTest, setIsTest] = useState(false);
  const [clickedButton, setClickedButton] = useState(null);
  const [add, setAdd] = useState(false);
  const [skill, SetSkill] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (values, actions) => {
    console.log(values, country.label, tNumber);
    const {
      firstname,
      lastname,
      username,
      email,
      adressline1,
      adressline2,
      password,
      jobfunct,
      longabout,
      JobCategory,
      isTest,
      skill,
    } = values;
    const response = await userRegister(
      firstname,
      lastname,
      username,
      email,
      country.label,
      adressline1,
      adressline2,
      tNumber,
      jobfunct,
      longabout,
      JobCategory,
      password,
      isTest,
      skill
    );
    if (response) {
      if (isTest) {
        console.log('skill', values.skill);
        if (values.skill) {
          return navigate(`/profile/${username}`);
        }
        return navigate(`/level`);
      }
      if (!isTest) {
        return navigate(`/profile/${username}`);
      }
      const imageRef = ref(storage, `CV/${username}/${cvUpload.name + v4()}`);
      uploadBytes(imageRef, cvUpload).then((snaphsot) => {
        getDownloadURL(snaphsot.ref).then((url) => {
          changeUserCV(username, url).then(() => navigate(`/level`));
        });
      });
    }
  };
  useEffect(() => {
    if (country.value) {
      setPhoneCodeCountry(country.value.toLowerCase());
    }
  }, [country]);

  const handleFileUpload = (e) => {
    setCvUpload(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const removeFile = () => {
    setCvUpload(null);
    setFileName('');
    setInputKey(Date.now());
  };
  const resetFileInput = (e) => {
    e.target.value = null;
  };

  return (
    <div className='bg-grey-lighter h-full flex flex-col relative'>
      <img
        src={require('../images/image1.jpg')}
        alt='background'
        className='absolute top-0 left-0 h-full w-full object-cover  '
      />
      <div className='absolute top-0 left-0  h-full w-full  bg-slate-600 opacity-50'></div>
      <div className='container max-w-xl mx-auto flex-1 flex flex-col items-center justify-center px-2 z-10 my-4'>
        <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
          <Formik
            //validationSchema={RegisterSchema}
            initialValues={{
              firstname: '',
              lastname: '',
              username: '',
              email: '',
              adressline1: '',
              adressline2: '',
              jobfunct: '',
              longabout: '',
              isTest: '',
              JobCategory: '',
              password: '',
              confirmpassword: '',
              skill: '',
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
                  name='firstname'
                  placeholder='First Name'
                  value={values.firstname}
                  onChange={handleChange}
                />
                {errors.firstname && touched.firstname && (
                  <div className=' text-red-600'>{errors.firstname}</div>
                )}
                {/* <p>{`You selected ${errors.firstname}`}</p> */}
                <input
                  type='text'
                  className='block border border-grey-light w-full p-3 rounded mt-4'
                  name='lastname'
                  placeholder='Last Name'
                  value={values.lastname}
                  onChange={handleChange}
                />
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
                <input
                  type='text'
                  className='block border border-grey-light w-full p-3 rounded mt-4'
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
                {/* <p>{`You selected ${values.adressline1}`}</p> */}
                <input
                  type='text'
                  class='block border border-grey-light w-full p-3 rounded mt-4'
                  name='adressline2'
                  id='adressline2'
                  placeholder='Adress Line 2 (Optional)'
                  value={values.adressline2}
                  onChange={handleChange}
                />
                {/* <p>{`You selected ${values.adressline2}`}</p> */}
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
                {/* <p>{`You selected ${tNumber}`}</p> */}
                <input
                  type='text'
                  class='block border border-grey-light w-full p-3 rounded mt-4'
                  name='jobfunct'
                  placeholder='Short About yourself (max 60 character) '
                  value={values.jobfunct}
                  onChange={handleChange}
                />
                {errors.jobfunct && touched.jobfunct && (
                  <div className='text-red-600'>{errors.jobfunct}</div>
                )}

                <textarea
                  className=' block border border-grey-light w-full p-3 rounded mt-4 overflow-y-auto resize-none scrollbar-hide'
                  type='text'
                  name='longabout'
                  placeholder='Detailed About yourself '
                  value={values.longabout}
                  onChange={handleChange}
                ></textarea>
                {errors.longabout && touched.longabout && (
                  <div className='text-red-600'>{errors.longabout}</div>
                )}
                <div className='w-full p-4'>
                  <label
                    htmlFor='fileUpload'
                    className='block text-sm font-medium text-gray-700'
                  >
                    CV
                  </label>
                  <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
                    <input
                      id='fileUpload'
                      type='file'
                      className='hidden'
                      onChange={handleFileUpload}
                      onClick={resetFileInput}
                    />
                    <div className='text-center'>
                      <svg
                        className='mx-auto h-12 w-12 text-gray-400'
                        stroke='currentColor'
                        fill='none'
                        viewBox='0 0 48 48'
                        aria-hidden='true'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M15 10.996H9a2 2 0 00-2 2v22a2 2 0 002 2h30a2 2 0 002-2v-22a2 2 0 00-2-2h-6m-3-5v5m0 0V5m0 5h5m-5 0H7'
                        />
                      </svg>
                      <p className='mt-1 text-sm text-gray-600'>
                        <label
                          htmlFor='fileUpload'
                          className='font-medium text-blue-600 hover:text-blue-500 cursor-pointer'
                        >
                          Upload a file
                        </label>
                      </p>
                      <p className='mt-1 text-xs text-gray-500'>
                        PDF, DOC, DOCX, TXT up to 10MB
                      </p>
                      {fileName && (
                        <div className='mt-2'>
                          <p className='text-sm text-gray-900'>
                            Uploaded file: {fileName}
                          </p>
                          <button
                            className='text-sm text-white bg-red-600 px-3 py-1 rounded hover:bg-red-500 transition-all duration-200 ease-in-out cursor-pointer'
                            onClick={removeFile}
                          >
                            Remove file
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {errors.jobfunct && touched.jobfunct && (
                  <div className='text-red-600'>{errors.jobfunct}</div>
                )}
                {/* <p>{`You selected ${values.jobfunct}`}</p> */}
                <div className='text-sm font-medium text-gray-700 mt-4'>
                  <h3>
                    Do you want to take test now or later? (You only have 2 test
                    right)
                  </h3>

                  <div className='flex gap-x-4 mt-2'>
                    <Field name='isTest'>
                      {({ field, form }) => (
                        <>
                          <label className='flex items-center cursor-pointer hover:bg-blue-100 hover:text-blue-600 rounded px-2 py-1 transition-colors duration-200'>
                            <input
                              type='radio'
                              {...field}
                              value='true'
                              className='form-radio text-blue-600'
                              checked={clickedButton === 'now'}
                              onChange={(e) => {
                                setIsTest(true);
                                setClickedButton('now');
                                form.setFieldValue('isTest', true);
                              }}
                            />
                            <span className='ml-2 font-normal'>Now</span>
                          </label>
                          <label className='flex items-center cursor-pointer hover:bg-blue-100 hover:text-blue-600 rounded px-2 py-1 transition-colors duration-200'>
                            <input
                              type='radio'
                              {...field}
                              value='false'
                              className='form-radio text-blue-600'
                              checked={clickedButton === 'later'}
                              onChange={(e) => {
                                setIsTest(false);
                                setClickedButton('later');
                                form.setFieldValue('isTest', false);
                                form.setFieldValue('JobCategory', '');
                                setAdd(false);
                              }}
                            />
                            <span className='ml-2 font-normal'>Later</span>
                          </label>
                        </>
                      )}
                    </Field>
                  </div>
                </div>
                {errors.isTest && touched.isTest && (
                  <div className='text-red-600'>{errors.isTest}</div>
                )}
                {isTest && (
                  <div className='w-full flex flex-col gap-y-3 justify-center mt-4 '>
                    <label className='block' for='jobs'>
                      Technologies:
                    </label>
                    <select
                      value={values.JobCategory}
                      onChange={handleChange}
                      name='JobCategory'
                      className='w-full block p-2 outline-none border border-grey-light rounded appearance-none bg-gray-50 border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500'
                    >
                      <option
                        value=''
                        disabled
                        hidden
                        style={{ color: 'transparent' }}
                      >
                        Choose a Programming Language
                      </option>
                      <option value='HTML'>HTML</option>
                      <option value='CSS'>CSS</option>
                      <option value='JavaScript'>JavaScript</option>
                      <option value='React'>React.js</option>
                    </select>
                    <p className='text-gray-600'>
                      If you can't find your skill{' '}
                      <span
                        onClick={() => setAdd(true)}
                        className='text-blue-500 cursor-pointer hover:underline'
                      >
                        click here
                      </span>{' '}
                      to add your
                    </p>
                    {add && (
                      <>
                        <input
                          type='text'
                          name='skill'
                          value={values.skill}
                          required={add}
                          onChange={handleChange}
                          placeholder='Type your skill'
                          className='w-full p-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200'
                        />
                      </>
                    )}
                  </div>
                )}

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
            <a
              className='no-underline border-b border-grey-dark text-grey-dark text-blue-600'
              href='#'
            >
              Terms of Service{' '}
            </a>
            and{' '}
            <a
              className='no-underline border-b border-grey-dark text-grey-dark text-blue-600'
              href='#'
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div className='text-grey-dark mt-6'>
          Already have an account?
          <a className=' no-underline text-blue-600 ' href='../login/'>
            {' '}
            Log in
          </a>
          .
        </div>
      </div>
    </div>
  );
}

export default UserRegister;
