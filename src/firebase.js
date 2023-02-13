import { initializeApp } from "firebase/app";

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDye5cZ1SUj2NU4amRvK9uVxWtm_AVI7rU",
  authDomain: "w-match-4f47d.firebaseapp.com",
  projectId: "w-match-4f47d",
  storageBucket: "w-match-4f47d.appspot.com",
  messagingSenderId: "30956022016",
  appId: "1:30956022016:web:527a4c29144642b1726be5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export const companyRegister = async (
  companyname,
  about,
  email,
  country,
  addressline1,
  addressline2 = " ",
  tnumber,
  password
) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (response) {
      await setDoc(doc(db, "companynames", companyname), {
        user_id: response.user.uid,
      });

      await setDoc(doc(db, "companies", response.user.uid), {
        type: 2,
        companyname: companyname,
        about: about,
        country: country,
        addressline1: addressline1,
        addressline2: addressline2,
        tnumber: tnumber,
        followers: [],
        following: [],
        notifications: [],
        posts: [],
      });
      console.log(response);
      return response.user;
    }
  } catch (error) {
    console.log(error);
  }
};

export const userRegister = async (
  name,
  lastname,
  username,
  email,
  country,
  addressline1,
  addressline2 = " ",
  tnumber,
  jobfunct,
  JobCategory,
  password
) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (response) {
      await setDoc(doc(db, "usernames", username), {
        user_id: response.user.uid,
      });

      await setDoc(doc(db, "users", response.user.uid), {
        type: 1,
        name: name,
        lastname: lastname,
        username: username,
        country: country,
        addressline1: addressline1,
        addressline2: addressline2,
        tnumber: tnumber,
        jobfunct: jobfunct,
        JobCategory: JobCategory,
        notifications: [],
      });
      console.log(response);
      return response.user;
    }
  } catch (error) {
    console.log(error);
  }
};
