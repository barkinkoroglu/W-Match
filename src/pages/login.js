import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Formik, Form } from "formik";
import { LoginSchema } from "../validation/index";
import { login } from "../firebase";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Login() {
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  if (user) {
    return <Navigate to="/home" />;
  }

  const handleSubmit = async (values, actions) => {
    await login(values.email, values.password);
  };
  return (
    <div className="bg-grey-lighter max-h-screen flex flex-col  items-center relative">
      <img
        src="https://img.freepik.com/free-photo/side-view-cropped-unrecognizable-business-people-working-common-desk_1098-20474.jpg?w=1060&t=st=1673169877~exp=1673170477~hmac=94ebd6bf3c88b11997d9ef383652990376f38e10fdcd809e1bc97f7f2bda444a"
        alt="background"
        className="absolute top-0 left-0  h-screen w-full object-fill   "
      />
      <div className="absolute top-0 left-0  h-screen w-full bg-slate-600 opacity-50"></div>
      <a
        className="text-white z-10 flex w-full p-3 md:pl-10 justify-start items-center h-16 font-bold text-4xl"
        href="/"
      >
        {" "}
        W-MATCH
      </a>
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 z-10 ">
        <div className="bg-white px-6 py-8 mt-10 rounded shadow-md text-black w-full">
          <Formik
            validationSchema={LoginSchema}
            initialValues={{
              email: "",
              password: "",
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
                <h1 className="mb-8 text-3xl text-center">Login</h1>
                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mt-4"
                  name="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && touched.email && (
                  <div className=" text-red-600">{errors.email}</div>
                )}
                <input
                  type="password"
                  className="block border border-grey-light w-full p-3 rounded mt-4"
                  id="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password && touched.password && (
                  <div className="text-red-600">{errors.password}</div>
                )}

                <button
                  type="submit"
                  className="w-full bg-slate-500 text-center py-3 rounded hover:bg-slate-400 focus:outline-none my-1"
                >
                  Sign In
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="text-white mt-6">
          New to W-MATCH?
          <a className=" text-blue-600 no-underline " href="/register">
            {" "}
            Sign up now.
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
