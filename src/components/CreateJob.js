import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Form, Formik } from "formik";
import { CompanyjobSchema } from "../validation/index";
import { useSelector } from "react-redux";
import { createCompanyJob } from "../firebase";

function CreateJob({ showCreateJob, setShowCreateJob }) {
  const user = useSelector((state) => state.auth.user);
  const handleSubmit = async (values, actions) => {
    const data = {
      jobname: values.job,
      information: values.information,
      salary: values.salary,
      time: Date.now(),
      name: user.companyname,
      username: user.username,
      email: user.email,
      candidates: [],
      type: 3,
    };
    console.log(data);
    createCompanyJob(user.uid, data);
    setShowCreateJob(false);
  };
  return (
    <div className="fixed flex flex-col z-50 top-5 left-0 right-0 mx-auto max-w-xl max-h-[calc(100vh-64px)] px-4 py-3 rounded bg-white ">
      <div className=" relative py-2 text-lg font-medium border-b-2 w-full text-center items-center ">
        Create a Job
        <div
          onClick={() => setShowCreateJob(!showCreateJob)}
          className="absolute top-0 right-0 p-1 rounded-lg flex justify-center items-center hover:bg-slate-400"
        >
          <CloseIcon />
        </div>
      </div>
      <Formik
        validationSchema={CompanyjobSchema}
        initialValues={{
          job: "",
          information: "",
          salary: "",
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
                <h1>Information:</h1>
                <textarea
                  className="flex flex-1 px-2 py-1 outline-none border rounded-lg  overflow-y-auto resize-none scrollbar-hide text-sm"
                  name="information"
                  value={values.information}
                  onChange={handleChange}
                ></textarea>
              </div>
              {errors.information && touched.information && (
                <div className=" text-red-600">{errors.information}</div>
              )}
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
