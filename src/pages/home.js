import React, { useEffect } from "react";
import AOS from "aos";
import Footer from "../components/Footer";

function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className=" ">
      <div className="flex flex-col  max-w-6xl px-3 mx-auto   ">
        <nav className="flex   justify-between items-center pt-2 ">
          <a href="/" className=" font-bold  ">
            <img
              src={require("../images/logo.png")}
              className=" w-[160px] h-16 object-cover"
              alt=""
            />
          </a>
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
        <div className="md:flex mx-auto  justify-center min-h-[calc(100vh-100px)] mt-6 md:mt-0  items-center">
          <div className="z-10 md:basis-1/2">
            <div className=" md:gap-8  flex flex-col">
              <h1 className="text-5xl font-medium">Your Perfect Job Match</h1>
              <p className=" md:text-start h-full">
                Welcome to W-Match, the ultimate web application for job seekers
                and companies to connect! Our platform is designed to bridge the
                gap between job seekers and companies through a seamless and
                efficient process. With W-Match, you can take advantage of our
                cutting-edge features, including comprehensive testing and post
                sharing, to find the perfect match for your employment needs.
              </p>
            </div>
            {/* ACTIONS */}
            <div className="mt-8 flex items-center">
              <a
                href="/register"
                className="bg-slate-200 px-4 py-2 rounded-lg hover:bg-slate-300"
              >
                Join Now
              </a>
            </div>
          </div>

          {/* IMAGE */}
          <div className="flex basis-3/5 justify-center md:z-10 md:ml-40 h-full  md:justify-items-end">
            <img
              className="object-cover rounded-md"
              src={require("../images/home1.png")}
              alt="home-page-graphic"
            />
          </div>
        </div>
        <div
          className=" flex flex-col sm:flex-row  py-5 mx-auto justify-between h-[calc(100vh-64px)] gap-x-4  "
          data-aos="fade-up"
        >
          <div className="flex flex-1 text-5xl sm:text-5xl lg:text-7xl items-center">
            <h1>Streamlined Recruitment, Seamless Connections. </h1>
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
      <Footer />
    </div>
  );
}

export default Home;
