import React, { useState } from "react";
import { Helmet } from "react-helmet";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div class="bg-grey-lighter max-h-screen flex flex-col  items-center relative">
      <img
        src="https://img.freepik.com/free-photo/side-view-cropped-unrecognizable-business-people-working-common-desk_1098-20474.jpg?w=1060&t=st=1673169877~exp=1673170477~hmac=94ebd6bf3c88b11997d9ef383652990376f38e10fdcd809e1bc97f7f2bda444a"
        alt="background"
        className="absolute top-0 left-0  h-screen w-screen object-fill   "
      />
      <div className="absolute top-0 left-0  h-screen w-screen bg-slate-600 opacity-50"></div>
      <a
        className="text-white z-10 flex w-full p-3 md:pl-10 justify-start items-center h-16 font-bold text-4xl"
        href="/"
      >
        {" "}
        W-MATCH
      </a>
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 z-10 ">
        <Helmet>
          <title>Login • W-MATCH</title>
        </Helmet>
        <div className="bg-white px-6 py-8 mt-10 rounded shadow-md text-black w-full">
          <h1 class="mb-8 text-3xl text-center">Login</h1>
          <input
            type="email"
            class="block border border-grey-light w-full p-3 rounded mt-4"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <input
            type="password"
            class="block border border-grey-light w-full p-3 rounded my-4"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />

          <button
            type="submit"
            className="w-full bg-slate-500 text-center py-3 rounded hover:bg-slate-400 focus:outline-none my-1"
          >
            Sign In
          </button>
        </div>
        <div class="text-white mt-6">
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
