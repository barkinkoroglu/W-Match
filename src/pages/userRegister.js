import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { RegionDropdown } from "react-country-region-selector";
import { Helmet } from "react-helmet";
import { RegisterSchema } from "../validation/index";
import { Formik, Form, ErrorMessage } from "formik";
import { userRegister } from "../firebase";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, changeUserCV } from "../firebase";
function UserRegister() {
  const [country, setCountry] = useState("");
  const [tNumber, setTNumber] = useState("");
  const options = useMemo(() => countryList().getData(), []);
  const [cvUpload, setCvUpload] = useState(null);

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
      JobCategory,
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
      JobCategory,
      password
    );
    if (response) {
      if (cvUpload == null) return navigate(`/level`);
      const imageRef = ref(storage, `CV/${username}/${cvUpload.name + v4()}`);
      uploadBytes(imageRef, cvUpload).then((snaphsot) => {
        getDownloadURL(snaphsot.ref).then((url) => {
          changeUserCV(username, url).then(() => navigate(`/level`));
        });
      });
    }
  };
  return (
    <div className="bg-grey-lighter h-full flex flex-col relative">
      <img
        src={require("../images/image1.jpg")}
        alt="background"
        className="absolute top-0 left-0 h-full w-full object-cover  "
      />
      <div className="absolute top-0 left-0  h-full w-full  bg-slate-600 opacity-50"></div>
      <div className="container max-w-xl mx-auto flex-1 flex flex-col items-center justify-center px-2 z-10 my-4">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <Formik
            validationSchema={RegisterSchema}
            initialValues={{
              firstname: "",
              lastname: "",
              username: "",
              email: "",
              adressline1: "",
              adressline2: "",
              jobfunct: "",

              JobCategory: "",
              password: "",
              confirmpassword: "",
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
                <h1 class="mb-8 text-3xl text-center">Sign Up</h1>
                <input
                  type="text"
                  class="block border border-grey-light w-full p-3 rounded mt-4"
                  name="firstname"
                  placeholder="First Name"
                  value={values.firstname}
                  onChange={handleChange}
                />
                {errors.firstname && touched.firstname && (
                  <div className=" text-red-600">{errors.firstname}</div>
                )}
                {/* <p>{`You selected ${errors.firstname}`}</p> */}
                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mt-4"
                  name="lastname"
                  placeholder="Last Name"
                  value={values.lastname}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mt-4"
                  name="username"
                  placeholder="Username"
                  value={values.username}
                  onChange={handleChange}
                />
                {errors.username && touched.username && (
                  <div className=" text-red-600">{errors.username}</div>
                )}
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
                <Select
                  options={options}
                  id="country"
                  value={country}
                  //onChange={handleChange}
                  onChange={(val) => setCountry(val)}
                  className=" w-full  rounded mt-4"
                  placeholder="Select Country"
                />
                {/* <p>{`You selected ${country.label}`}</p> */}
                {/* <p>{`You selected ${country.label}`}</p> */}
                {/* <RegionDropdown
            country={country}
            value={city}
            onChange={(val) => setTNumber(val)}
          /> */}
                <input
                  type="text"
                  class="block border border-grey-light w-full p-3 rounded mt-4"
                  name="adressline1"
                  placeholder="Adress Line 1"
                  id="adressline1"
                  value={values.adressline1}
                  onChange={handleChange}
                />
                {errors.adressline1 && touched.adressline1 && (
                  <div className="text-red-600">{errors.adressline1}</div>
                )}
                {/* <p>{`You selected ${values.adressline1}`}</p> */}
                <input
                  type="text"
                  class="block border border-grey-light w-full p-3 rounded mt-4"
                  name="adressline2"
                  id="adressline2"
                  placeholder="Adress Line 2 (Optional)"
                  value={values.adressline2}
                  onChange={handleChange}
                />
                {/* <p>{`You selected ${values.adressline2}`}</p> */}
                <PhoneInput
                  containerStyle={{
                    border: "none",
                    width: "100%",
                  }}
                  inputStyle={{
                    width: "100%",
                  }}
                  placeholder="Enter phone number"
                  value={tNumber}
                  country={"us"}
                  onChange={setTNumber}
                  id="phone"
                  //value={values.phone}
                  //onChange={handleChange}
                  className=" w-full flex border   rounded mt-4"
                />
                {/* <p>{`You selected ${tNumber}`}</p> */}
                <input
                  type="text"
                  class="block border border-grey-light w-full p-3 rounded mt-4"
                  name="jobfunct"
                  placeholder="Job Function (CV) "
                  value={values.jobfunct}
                  onChange={handleChange}
                />
                {errors.jobfunct && touched.jobfunct && (
                  <div className="text-red-600">{errors.jobfunct}</div>
                )}

                <input
                  type="file"
                  class="block border border-grey-light w-full p-3 rounded mt-4"
                  onChange={(e) => {
                    setCvUpload(e.target.files[0]);
                  }}
                />
                {errors.jobfunct && touched.jobfunct && (
                  <div className="text-red-600">{errors.jobfunct}</div>
                )}
                {/* <p>{`You selected ${values.jobfunct}`}</p> */}
                <div className="w-full flex flex-col gap-y-3 justify-center mt-4 ">
                  <label className="block" for="jobs">
                    Choose a Job Category:
                  </label>
                  <select
                    value={values.JobCategory}
                    onChange={handleChange}
                    name="JobCategory"
                    className="w-full block p-2 outline-none  border border-grey-light rounded appearance-none bg-gray-50  border-gray-300 text-gray-900  text-sm  focus:ring-blue-500 focus:border-blue-500 "
                    //value={jobcategory}
                    //onChange={(e) => setJobcategory(e.target.value)}
                  >
                    <option value="">Choose a test</option>
                    <option value="HTML">HTML</option>
                    <option value="CSS">CSS</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="React">React.js</option>
                  </select>
                  {/* <p>{`You selected ${jobcategory}`}</p> */}
                  {/* <p>{`You selected ${values.JobCategory}`}</p> */}
                </div>

                <input
                  type="password"
                  class="block border border-grey-light w-full p-3 rounded mt-4"
                  id="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password && touched.password && (
                  <div className="text-red-600">{errors.password}</div>
                )}
                <input
                  type="password"
                  class="block border border-grey-light w-full p-3 rounded my-4"
                  name="confirmpassword"
                  placeholder="Confirm Password"
                  value={values.confirmpassword}
                  onChange={handleChange}
                />
                {errors.confirmpassword && touched.confirmpassword && (
                  <div className="text-red-600">{errors.confirmpassword}</div>
                )}
                <button
                  type="submit"
                  class="w-full bg-slate-500 text-center py-3 rounded hover:bg-slate-400 focus:outline-none my-1"
                >
                  Create Account
                </button>
              </Form>
            )}
          </Formik>
          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Terms of Service
            </a>{" "}
            and
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account?
          <a className=" no-underline text-blue-600 " href="../login/">
            {" "}
            Log in
          </a>
          .
        </div>
      </div>
    </div>
  );
}

export default UserRegister;
