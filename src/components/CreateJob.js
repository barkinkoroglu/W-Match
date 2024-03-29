import React, { useState, useId } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Form, Formik, Field } from 'formik';
import { CompanyjobSchema } from '../validation/index';
import { useSelector } from 'react-redux';
import { createCompanyJob, getUserId } from '../firebase';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CreateJob({ showCreateJob, setShowCreateJob, refreshData }) {
  const user = useSelector((state) => state.auth.user);
  const jobid = useId();

  const handleSubmit = async (values, actions) => {
    const milliseconds = values.startDate.getTime();

    const data = {
      jobname: values.job,
      information: values.information,
      testvalue: values.testvalue,
      mintestvalue: values.mintestvalue,
      testvaluescore: values.testvaluescore,
      wtestvalue: values.wtestvalue,
      wmintestvalue: values.wmintestvalue,
      wtestvaluescore: values.wtestvaluescore,
      salary: values.salary,
      time: Date.now(),
      endtime: milliseconds,
      name: user.companyname,
      username: user.username,
      email: user.email,
      candidates: [],
      numberRec: values.recomnumber,
      type: 3,
      experience: values.experience,
      major: values.major,
      isMilitaryService: values.isMilitaryService,
      jobid,
    };

    const id = await getUserId(user?.username);

    await createCompanyJob(id, data).then(async () => await refreshData());
    setShowCreateJob(false);
  };
  return (
    <div className="fixed flex flex-col z-50 top-5 left-0 right-0 mx-auto max-w-xl max-h-[calc(100vh-64px)] px-4 py-3 rounded bg-white ">
      <div className=" relative py-2 text-lg font-medium border-b-2 w-full text-center items-center ">
        Create a Job
        <button
          onClick={() => setShowCreateJob(!showCreateJob)}
          className="absolute top-0 right-0 p-1 rounded-lg flex justify-center items-center hover:bg-slate-400 "
        >
          <CloseIcon />
        </button>
      </div>
      <Formik
        validationSchema={CompanyjobSchema}
        initialValues={{
          job: '',
          information: '',
          testvalue: '',
          mintestvalue: '',
          testvaluescore: '',
          wtestvalue: '',
          wmintestvalue: '',
          wtestvaluescore: '',
          startDate: new Date(),
          recomnumber: '',
          salary: '',
          experience: '',
          major: '',
          isMilitaryService: '',
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
            <div className="flex flex-col gap-y-3 p-2 justify-start">
              <div className="flex gap-x-3  ">
                <h1>Job:</h1>
                <input
                  className="w-full outline-none border px-2 "
                  type="text"
                  name="job"
                  value={values.job}
                  onChange={handleChange}
                />
              </div>
              {errors.job && touched.job && (
                <div className=" text-red-600">{errors.job}</div>
              )}
              <div className="flex gap-x-3 ">
                <h1>Description:</h1>
                <textarea
                  className="flex flex-1 px-2 py-1 outline-none border rounded-lg  overflow-y-auto resize-none scrollbar-hide text-sm"
                  // onInput={(e) =>
                  //   (e.target.style.height = `${e.target.scrollHeight}px`)
                  // }s
                  name="information"
                  value={values.information}
                  onChange={handleChange}
                ></textarea>
              </div>
              {errors.information && touched.information && (
                <div className=" text-red-600">{errors.information}</div>
              )}
              <div className="flex justify-between gap-x-3 items-center whitespace-nowrap  h-8">
                <h1>Tests:</h1>
                <Field
                  className="w-full h-full border-2"
                  as="select"
                  name="testvalue"
                >
                  <option value="">Choose</option>
                  {user.posts.map((value, index) => {
                    return (
                      value.type === 2 && (
                        <option value={value.testname}>{value.testname}</option>
                      )
                    );
                  })}
                </Field>
                <div className="flex">
                  <h1>If greater than</h1>
                  <Field
                    className="w-12 text-center "
                    name="mintestvalue"
                    placeholder="0"
                    type="number"
                    min={0}
                  />
                </div>
                <div className="flex">
                  <h1 className="font-medium">Score:</h1>
                  <Field
                    className="w-12 text-center "
                    name="testvaluescore"
                    placeholder="0"
                    type="number"
                    min={0}
                  />
                </div>
              </div>
              {errors.testvalue && touched.testvalue && (
                <div className=" text-red-600">{errors.testvalue}</div>
              )}
              <div className="flex justify-between gap-x-3 items-center whitespace-nowrap  h-8">
                <h1>W-MATCH Tests:</h1>
                <Field
                  className="w-full h-full border-2"
                  as="select"
                  name="wtestvalue"
                >
                  <option value="">Choose</option>
                  <option value="CSS">CSS</option>
                  <option value="HTML">HTML</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="React">React.js</option>
                  <option value="Java">Java</option>
                  <option value="Python">Python</option>
                  <option value="PHP">PHP</option>
                  <option value="Ruby">Ruby</option>
                </Field>
                <div className="flex">
                  <h1>If greater than</h1>
                  <Field
                    className="w-12 text-center "
                    name="wmintestvalue"
                    placeholder="0"
                    type="number"
                    min={0}
                  />
                </div>
                <div className="flex">
                  <h1 className="font-medium">Score:</h1>
                  <Field
                    className="w-12 text-center "
                    name="wtestvaluescore"
                    placeholder="0"
                    type="number"
                    min={0}
                  />
                </div>
              </div>
              {errors.wtestvalue && touched.wtestvalue && (
                <div className=" text-red-600">{errors.wtestvalue}</div>
              )}
              <div className="flex justify-between whitespace-nowrap gap-3 ">
                <h1>End Date:</h1>
                <Field name="startDate">
                  {({ field, form }) => (
                    <DatePicker
                      {...field}
                      selected={values.startDate}
                      onChange={(date) => form.setFieldValue('startDate', date)}
                      className="border w-full"
                    />
                  )}
                </Field>
              </div>

              <div className="flex justify-between whitespace-nowrap gap-3">
                <h1>How many people do you want recommended ?</h1>

                <Field
                  className="w-full text-center border "
                  name="recomnumber"
                  placeholder="0"
                  type="number"
                  min={0}
                />
              </div>

              <div className="flex gap-x-3 ">
                <h1>Salary:</h1>
                <input
                  className="w-full outline-none border px-2 "
                  name="salary"
                  value={values.salary}
                  onChange={handleChange}
                  type="text"
                />
              </div>
              {errors.salary && touched.salary && (
                <div className=" text-red-600">{errors.salary}</div>
              )}
              <div className="flex gap-x-3 ">
                <h1>Experience:</h1>
                <input
                  className="w-full outline-none border px-2 "
                  name="experience"
                  value={values.experience}
                  onChange={handleChange}
                  type="text"
                />
              </div>
              {errors.experience && touched.experience && (
                <div className=" text-red-600">{errors.experience}</div>
              )}
              <div className="flex gap-x-3 ">
                <h1>Education:</h1>
                <input
                  className="w-full outline-none border px-2 "
                  name="major"
                  value={values.major}
                  onChange={handleChange}
                  type="text"
                />
              </div>
              {errors.major && touched.major && (
                <div className=" text-red-600">{errors.major}</div>
              )}
              <div className="w-full flex flex-col gap-y-3 justify-center mt-4 ">
                <label className="block">
                  Is employee obliged to complete military service?
                </label>
                <div className="flex items-center gap-x-4">
                  <div className="flex items-center mr-6 pl-2 ">
                    <input
                      id="tm"
                      type="radio"
                      name="isMilitaryService"
                      value="true"
                      onChange={handleChange}
                      className="form-radio text-blue-600 h-3 w-3 cursor-pointer"
                    />
                    <label
                      htmlFor="tm"
                      className="ml-2 text-gray-700 cursor-pointer font-normal"
                    >
                      Yes
                    </label>
                  </div>

                  <div className="flex items-center gap-x-4  ">
                    <input
                      id="fm"
                      type="radio"
                      name="isMilitaryService"
                      value="false"
                      onChange={handleChange}
                      className="form-radio text-blue-600 h-3 w-3 cursor-pointer"
                    />
                    <label
                      htmlFor="fm"
                      className="ml-2 text-gray-700 cursor-pointer font-normal"
                    >
                      No
                    </label>
                  </div>
                </div>
              </div>
              {errors.isMilitaryService && touched.isMilitaryService && (
                <div className=" text-red-600">{errors.isMilitaryService}</div>
              )}
            </div>
            <div className="flex  ">
              <button
                type="submit"
                className="bg-slate-300  p-2 rounded-lg  w-full hover:bg-slate-400"
              >
                Create Job
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateJob;
