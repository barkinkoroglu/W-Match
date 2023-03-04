import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className=" ">
      <div className="flex flex-col  max-w-6xl px-3 mx-auto   ">
        <nav className="flex   justify-between items-center ">
          <div className=" py-3  h-16 font-bold text-4xl">W-MATCH</div>
          <div className="flex gap-x-5 items-center ">
            <a
              href="/register"
              className=" py-2 px-4 border border-gray-600 rounded-full hover:bg-slate-200"
            >
              Register
            </a>
            <a
              href="/login"
              className="py-2 px-6 border border-gray-600 rounded-full hover:bg-slate-200"
            >
              Login
            </a>
          </div>
        </nav>
        <div
          className=" flex flex-col sm:flex-row  py-5 mx-auto justify-between h-[calc(100vh-64px)] gap-x-4  "
          data-aos="fade-up"
        >
          <div className="flex flex-1 text-5xl sm:text-5xl lg:text-7xl items-center">
            <h1>Millions of jobs and people hiring </h1>
          </div>
          <div className="flex flex-1  ">
            <img
              src="https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Image_ExclusiveNewFeatures_2x_RE4Fm6b?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=1920&qlt=90&fmt=png-alpha"
              alt="homephoto"
              className=" rounded-lg object-cover  "
            />
          </div>
        </div>
        <div
          className=" flex flex-col sm:flex-row  py-5 mx-auto justify-between h-screen gap-x-4 "
          data-aos="fade-up"
        >
          <div className="flex flex-1  ">
            <img
              src="https://www.testim.io/wp-content/uploads/2019/11/Testim-What-is-a-Test-Environment_-A-Guide-to-Managing-Your-Testing-A.png"
              alt="homephoto"
              className=" rounded-lg object-cover  "
            />
          </div>
          <div className="flex flex-1 text-5xl sm:text-5xl lg:text-7xl items-center">
            <h1>Test your skill with appropriate tests </h1>
          </div>
        </div>

        <div
          className=" flex flex-col sm:flex-row  py-5 mx-auto justify-between h-[calc(100vh-64px)] gap-x-4  "
          data-aos="fade-up"
        >
          <div className="flex flex-1 text-5xl sm:text-5xl lg:text-7xl items-center">
            <h1>Take a step forward in your career </h1>
          </div>
          <div className="flex flex-1  ">
            <img
              src="https://jobcenter.cprs.org/sites/default/files/inline-images/find-job_0.jpg"
              alt="homephoto"
              className=" rounded-lg object-cover  "
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
