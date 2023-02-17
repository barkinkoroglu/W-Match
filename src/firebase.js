import { initializeApp } from "firebase/app";

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { userHandle } from "./utils";

const firebaseConfig = {
  apiKey: "AIzaSyDye5cZ1SUj2NU4amRvK9uVxWtm_AVI7rU",
  authDomain: "w-match-4f47d.firebaseapp.com",
  projectId: "w-match-4f47d",
  storageBucket: "w-match-4f47d.appspot.com",
  messagingSenderId: "30956022016",
  appId: "1:30956022016:web:527a4c29144642b1726be5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const dbUser = await getDoc(doc(db, "users", user.uid));
    if (dbUser.data() === undefined) {
      const dbUser = await getDoc(doc(db, "companies", user.uid));
      let data = {
        uid: user.uid,
        email: user.email,
        ...dbUser.data(),
      };
      userHandle(data);
    } else {
      let data = {
        uid: user.uid,
        email: user.email,
        ...dbUser.data(),
      };
      userHandle(data);
    }
  } else {
    userHandle(false);
  }
});

export const login = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    toast.error(err.code);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    toast.error(err.code);
  }
};

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
      await setDoc(doc(db, "usernames", companyname), {
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
      return response.user;
    }
  } catch (error) {
    toast.error(error);
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
    const user = await getDoc(doc(db, "usernames", username));
    if (user.exists()) {
      toast.error(` The username "${username}" is being used by someone else.`);
    } else {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (response.user) {
        await setDoc(doc(db, "usernames", username), {
          user_id: response.user.uid,
        });

        await setDoc(doc(db, "users", response.user.uid), {
          type: 1,
          name: name,
          lastname: lastname,
          username: username,
          country: country,
          email: email,
          addressline1: addressline1,
          addressline2: addressline2,
          tnumber: tnumber,
          jobfunct: jobfunct,
          JobCategory: JobCategory,
          notifications: [],
          wmatchTests: [],
        });
      }
      return response.user;
    }
  } catch (error) {
    toast.error("This E-Mail Is Already Used");
    throw new Error("E-Mail!");
  }
};

export const updateExam = async (userid, test) => {
  const dbUser = doc(db, "users", userid);
  await updateDoc(dbUser, {
    wmatchTests: arrayUnion(test),
  });
};

export const getUserInfo = async (uname) => {
  const username = await getDoc(doc(db, "usernames", uname));
  if (username.exists()) {
    const res = (
      await getDoc(doc(db, "users", username.data().user_id))
    ).data();

    if (res === undefined) {
      const res2 = (
        await getDoc(doc(db, "companies", username.data().user_id))
      ).data();

      return res2;
    }
    return res;
  } else {
    toast.error("User not found!");
    throw new Error("User not found!");
  }
};

export const createPost = async (userid, test) => {
  const dbUser = doc(db, "companies", userid);
  await updateDoc(dbUser, {
    posts: arrayUnion(test),
  });
};

export const createComment = async (userid, test, index) => {
  // const dbUser = doc(db, "companies", userid);
  // let updatedComments = {
  //   ...dbUser.data(),
  //   post: {
  //     ...dbUser.data().posts,
  //     posts[0]: dbUser.data().posts[index],
  //   }
  // };
  // await updateDoc(dbUser, {
  //   posts: {
  //     comments: arrayUnion(test),
  //   },
  // });
};
