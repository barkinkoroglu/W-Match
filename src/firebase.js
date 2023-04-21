import { initializeApp } from "firebase/app";

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
  arrayUnion,
  collection,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { shuffle, userHandle } from "./utils";
import { getStorage } from "firebase/storage";
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
export const storage = getStorage(app);

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const dbUser = await getDoc(doc(db, "users", user.uid));
    if (dbUser.data() === undefined || user.type === 2) {
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
  username,
  about,
  longabout,
  email,
  country,
  addressline1,
  addressline2 = " ",
  tnumber,
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

        let data = {
          email: email,
          type: 2,
          companyname: companyname,
          username: username,
          about: about,
          longabout: longabout,
          country: country,
          addressline1: addressline1,
          addressline2: addressline2,
          tnumber: tnumber,
          followers: [],
          following: [],
          notifications: [],
          posts: [],
          ProfileUrl: "",
          BackUrl: "",
        };
        userHandle(data);
        await setDoc(doc(db, "companies", response.user.uid), {
          email: email,
          type: 2,
          companyname: companyname,
          username: username,
          about: about,
          longabout: longabout,
          country: country,
          addressline1: addressline1,
          addressline2: addressline2,
          tnumber: tnumber,
          followers: [],
          following: [],
          notifications: [],
          posts: [],
          ProfileUrl: "",
          BackUrl: "",
        });
        console.log(response);
      }
      return response.user;
    }
  } catch (error) {
    toast.error("This E-Mail Is Already Used");
    throw new Error("E-Mail!");
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
  longabout,
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

        let data = {
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
          following: [],
          wmatchTests: [],
          ProfileUrl: "",
          BackUrl: "",
          CVdoc: "",
          longabout: longabout,
        };
        userHandle(data);
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
          following: [],
          wmatchTests: [],
          ProfileUrl: "",
          BackUrl: "",
          CVdoc: "",
          longabout: longabout,
        });
        //console.log(response);
      }
      return response.user;
    }
  } catch (error) {
    toast.error("This E-Mail Is Already Used");
    throw new Error("E-Mail!");
  }
};
export const createLevel = async (username, level) => {
  const userID = await getDoc(doc(db, "usernames", username));
  const user = userID.data();
  const dbUser = await getDoc(doc(db, "users", user.user_id));
  if (level.length > 0) {
    await setDoc(doc(db, "users", user.user_id), {
      ...dbUser.data(),
      level,
    });
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

export const getCompanyInfo = async (uname) => {
  const username = await getDoc(doc(db, "usernames", uname));
  if (username.exists()) {
    const res2 = (
      await getDoc(doc(db, "companies", username.data().user_id))
    ).data();
    return res2;
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

export const createComment = async (cusername, test, time) => {
  const compdataid = await getDoc(doc(db, "usernames", cusername));
  const companydataid = compdataid.data();
  const dbUser = await getDoc(doc(db, "companies", companydataid.user_id));
  const postlar = dbUser.data().posts;
  for (let i = 0; i < postlar.length; i++) {
    if (postlar[i].time === time) {
      postlar[i].comments.push(test);
      break;
    }
  }
  await setDoc(doc(db, "companies", companydataid.user_id), {
    ...dbUser.data(),
    posts: postlar,
  });
};

export const createLike = async (username, test, time) => {
  let flag = 0;
  let index = 0;
  let dindex = 0;

  const compdataid = await getDoc(doc(db, "usernames", username));
  const companydataid = compdataid.data();
  const dbUser = await getDoc(doc(db, "companies", companydataid.user_id));
  const postlar = await dbUser.data().posts;

  for (let i = 0; i < postlar.length; i++) {
    if (postlar[i].type === 1 && postlar[i].time === time) {
      index = i;
      break;
    }
  }
  for (let i = 0; i < postlar[index].likes.length; i++) {
    if (postlar[index].likes[i] === test) {
      flag = -1;
      dindex = i;
      break;
    }
  }
  if (flag === -1) {
    postlar[index].likes.splice(dindex, 1);
  } else {
    postlar[index].likes.push(test);
  }
  await setDoc(doc(db, "companies", companydataid.user_id), {
    ...dbUser.data(),
    posts: postlar,
  });
};

export const fallowUser = async (companyname, username, test) => {
  let flag = 0;
  const usedataid = await getDoc(doc(db, "usernames", username));
  const userdataid = usedataid.data();
  const compdataid = await getDoc(doc(db, "usernames", companyname));
  const companydataid = compdataid.data();
  const dbUser = await getDoc(doc(db, "users", userdataid.user_id));
  const dbCompanyUser = await getDoc(
    doc(db, "companies", companydataid.user_id)
  );

  const followers = dbCompanyUser.data().followers;
  // Company -> add to follower
  for (let i = 0; i < followers.length; i++) {
    if (followers[i] === username) {
      flag = -1;
      followers.splice(i, 1);
      break;
    }
  }
  if (flag !== -1) {
    followers.push(username);
  }
  await setDoc(doc(db, "companies", companydataid.user_id), {
    ...dbCompanyUser.data(),
    followers: followers,
  });

  flag = 0;
  // User -> for following
  const following = dbUser.data().following;
  for (let i = 0; i < following.length; i++) {
    if (following[i] === companyname) {
      flag = -1;
      following.splice(i, 1);
      break;
    }
  }
  if (flag !== -1) {
    following.push(companyname);
  }
  await setDoc(doc(db, "users", userdataid.user_id), {
    ...dbUser.data(),
    following: following,
  });
};

export const getCompany = async () => {
  let temp = [];
  const querySnapshot = await getDocs(collection(db, "companies"));
  querySnapshot.forEach((doc) => {
    temp.push(doc.data());
  });
  return temp;
};

export const getRandomCompany = async (username) => {
  let temp = [];
  const querySnapshot = await getDocs(collection(db, "companies"));
  querySnapshot.forEach((doc) => {
    let temp2 = doc.data();
    let flag = temp2.followers?.find((element) => element === username);
    if (typeof flag === "undefined") {
      temp.push(temp2);
    }
  });
  return shuffle(temp);
};
export const getAllPost = async (userInfo) => {
  let nposts = [];
  const { uid, type } = userInfo;

  //when company want to see their own posts
  if (type === 2) {
    const company = await getDoc(doc(db, "companies", uid));
    nposts = company.data().posts;
  }

  //when user wants to see their  posts
  if (type === 1) {
    const user = await getDoc(doc(db, "users", uid));
    const companyUsername = user.data().following;
    for (let i = 0; i < companyUsername.length; i++) {
      const companyID = await getDoc(doc(db, "usernames", companyUsername[i]));
      const company = await getDoc(
        doc(db, "companies", companyID.data().user_id)
      ).then((company) => company);
      company.data().posts.map((post) => nposts.push(post));
    }
  }
  nposts.sort((a, b) => b.time - a.time);
  return nposts;
};

export const getAllPostbyname = async (userInfo) => {
  let nposts = [];
  const { username, type } = userInfo;

  //when company want to see their own posts
  if (type === 2) {
    const compdataid = await getDoc(doc(db, "usernames", username));
    const companydataid = compdataid.data();
    const dbUser = await getDoc(doc(db, "companies", companydataid.user_id));
    nposts = dbUser.data().posts;
  }

  nposts.sort((a, b) => b.time - a.time);
  return nposts;
};

export const createCompanyTest = async (companyid, data) => {
  try {
    const dbUser = await getDoc(doc(db, "companies", companyid));
    const posts = dbUser.data().posts;
    posts.push(data);

    await setDoc(doc(db, "companies", companyid), {
      ...dbUser.data(),
      posts: posts,
    });
    toast.success("The test has been successfully created.");
  } catch (error) {
    toast.error("Oops! Something went wrong!");
  }
};

//In the future, different operations can be performed according to the above function.
export const createCompanyJob = async (companyid, data) => {
  try {
    const dbUser = await getDoc(doc(db, "companies", companyid));
    const posts = dbUser.data().posts;
    posts.push(data);

    await setDoc(doc(db, "companies", companyid), {
      ...dbUser.data(),
      posts: posts,
    });
    toast.success("The job has been successfully created.");
  } catch (error) {
    toast.error("Oops! Something went wrong!");
  }
};

export const getUserInfobyID = async (userid) => {
  const res = (await getDoc(doc(db, "users", userid))).data();
  if (res === undefined) {
    const res2 = (await getDoc(doc(db, "companies", userid))).data();

    return res2;
  }
  return res;
};

export const changeCompanyProfilePhoto = async (username, url) => {
  try {
    const compdataid = await getDoc(doc(db, "usernames", username));
    const companydataid = compdataid.data();
    const dbUser = await getDoc(doc(db, "companies", companydataid.user_id));
    await setDoc(doc(db, "companies", companydataid.user_id), {
      ...dbUser.data(),
      ProfileUrl: url,
    });
    toast.success("Profile photo has been successfully changed.");
  } catch (error) {
    toast.error("Oops! Something went wrong!");
  }
};

export const changeUserProfilePhoto = async (username, url) => {
  try {
    const userdataid = await getDoc(doc(db, "usernames", username));
    const ruserdataid = userdataid.data();
    const dbUser = await getDoc(doc(db, "users", ruserdataid.user_id));
    await setDoc(doc(db, "users", ruserdataid.user_id), {
      ...dbUser.data(),
      ProfileUrl: url,
    });
    toast.success("Profile photo has been successfully changed.");
  } catch (error) {
    toast.error("Oops! Something went wrong!");
  }
};

export const changeCompanyBackProfilePhoto = async (username, url) => {
  const compdataid = await getDoc(doc(db, "usernames", username));
  const companydataid = compdataid.data();
  const dbUser = await getDoc(doc(db, "companies", companydataid.user_id));
  await setDoc(doc(db, "companies", companydataid.user_id), {
    ...dbUser.data(),
    BackUrl: url,
  });
};

export const changeUserBackProfilePhoto = async (username, url) => {
  const userdataid = await getDoc(doc(db, "usernames", username));
  const ruserdataid = userdataid.data();
  const dbUser = await getDoc(doc(db, "users", ruserdataid.user_id));
  await setDoc(doc(db, "users", ruserdataid.user_id), {
    ...dbUser.data(),
    BackUrl: url,
  });
};

export const changeUserCV = async (username, url) => {
  const userdataid = await getDoc(doc(db, "usernames", username));
  const ruserdataid = userdataid.data();
  const dbUser = await getDoc(doc(db, "users", ruserdataid.user_id));
  await setDoc(doc(db, "users", ruserdataid.user_id), {
    ...dbUser.data(),
    CVdoc: url,
  });
};

export const getCompanyTest = async (companyname, testid) => {
  const compdataid = await getDoc(doc(db, "usernames", companyname));
  const companydataid = compdataid.data();
  const dbCompanyUser = await getDoc(
    doc(db, "companies", companydataid.user_id)
  );

  const posts = dbCompanyUser.data().posts;

  const foundtyp2 = posts.filter((element) => element.type === 2);
  const foundpost = foundtyp2.find((element) => element.id === testid);

  return foundpost;
};

export const updateCompanyTestScore = async (
  companyname,
  userid,
  testid,
  score
) => {
  let data = {
    userid: userid,
    score: score,
  };
  const compdataid = await getDoc(doc(db, "usernames", companyname));
  const companydataid = compdataid.data();
  const dbCompanyUser = await getDoc(
    doc(db, "companies", companydataid.user_id)
  );

  const posts = dbCompanyUser.data().posts;
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].type === 2 && posts[i].id === testid) {
      posts[i].scores.push(data);
      break;
    }
  }

  await setDoc(doc(db, "companies", companydataid.user_id), {
    ...dbCompanyUser.data(),
    posts: posts,
  });
};

export const applyJob = async (companyname, userid, time) => {
  const compdataid = await getDoc(doc(db, "usernames", companyname));
  const companydataid = compdataid.data();
  const dbCompanyUser = await getDoc(
    doc(db, "companies", companydataid.user_id)
  );

  const posts = dbCompanyUser.data().posts;

  for (let i = 0; i < posts.length; i++) {
    if (posts[i].time === time) {
      posts[i].candidates.push(userid);
      break;
    }
  }
  await setDoc(doc(db, "companies", companydataid.user_id), {
    ...dbCompanyUser.data(),
    posts: posts,
  });
};

export const userEditInformation = async (
  jobfunct,
  longabout,
  email,
  address,
  address2,
  username
) => {
  const userid = await getDoc(doc(db, "usernames", username));
  const userdata = userid.data();
  const dbUser = await getDoc(doc(db, "users", userdata.user_id));

  await setDoc(doc(db, "users", userdata.user_id), {
    ...dbUser.data(),
    jobfunct: jobfunct,
    longabout: longabout,
    email: email,
    addressline1: address,
    addressline2: address2,
  });
};

export const companyEditInformation = async (
  companyname,
  about,
  longabout,
  email,
  address,
  address2,
  username
) => {
  const userid = await getDoc(doc(db, "usernames", username));
  const userdata = userid.data();
  const dbUser = await getDoc(doc(db, "companies", userdata.user_id));
  await setDoc(doc(db, "companies", userdata.user_id), {
    ...dbUser.data(),
    companyname: companyname,
    about: about,
    longabout: longabout,
    email: email,
    addressline1: address,
    addressline2: address2,
  });
};

export const searchCompany = async (companydata, search) => {
  const result = companydata.filter(
    (element) => element?.companyname?.toLowerCase().includes(search) === true
  );
  const temp = result.slice(0, 3);
  console.log(temp);
  return temp;
};

export const fetchQuestions = async () => {
  let questions = [];
  try {
    const docsSnap = await getDocs(collection(db, "questions"));
    if (docsSnap.docs.length > 0) {
      docsSnap.forEach(async (doc) => {
        const question = await getDoc(doc(db, "questions", doc.id));
        questions.push(question.data());
      });
    }
    return questions;
  } catch (error) {}
};

export const getRandomCompanyJobs = async (userid) => {
  let temp = [];
  const querySnapshot = await getDocs(collection(db, "companies"));
  querySnapshot.forEach((doc) => {
    let temp2 = doc.data();
    for (let i = 0; i < temp2.posts?.length; i++) {
      if (temp2.posts[i].type === 3) {
        let flag = temp2.posts[i].candidates.find(
          (element) => element === userid
        );
        if (typeof flag === "undefined") {
          temp.push(temp2.posts[i]);
        }
      }
    }
  });
  const result = temp.slice(0, 5);
  return shuffle(result);
};

export const deletePostdata = async (username, time) => {
  const compdataid = await getDoc(doc(db, "usernames", username));
  const companydataid = compdataid.data();
  const dbCompanyUser = await getDoc(
    doc(db, "companies", companydataid.user_id)
  );

  const posts = dbCompanyUser.data().posts;

  const result = posts.filter((element) => element.time !== time);

  toast.success("The post is deleted!");

  await setDoc(doc(db, "companies", companydataid.user_id), {
    ...dbCompanyUser.data(),
    posts: result,
  });
};

export const deleteCommentdata = async (username, ptime, ctime) => {
  let foundPost = null;
  const tempdata = [];
  try {
    const compdataid = await getDoc(doc(db, "usernames", username));
    const companydataid = compdataid.data();
    const dbCompanyUser = await getDoc(
      doc(db, "companies", companydataid.user_id)
    );

    console.log(username, ptime, ctime);
    const posts = dbCompanyUser.data().posts;
    const pindex = (post) => post.time === ptime;
    const index = posts.findIndex(pindex);
    console.log(index);

    for (let i = 0; i < posts.length; i++) {
      if (posts[i].time === ptime) {
        foundPost = posts[i];
        break;
      }
    }
    console.log(foundPost);

    for (let i = 0; i < foundPost.comments.length; i++) {
      if (foundPost.comments[i].ctime !== ctime) {
        tempdata.push(foundPost.comments[i]);
      }
    }
    posts[index].comments = tempdata;
    console.log(tempdata);

    await setDoc(doc(db, "companies", companydataid.user_id), {
      ...dbCompanyUser.data(),
      posts: posts,
    });
    toast.success("The comment is deleted!");
  } catch (error) {
    toast.error("Oops! Something went wrong!");
  }
};

export const forgetPassword = async (email) => {
  try {
    return await sendPasswordResetEmail(auth, email).then((data) => {
      toast.success("Password reset email sent!");
    });
  } catch (err) {
    if (err.code === "auth/user-not-found") {
      toast.error("User not found!");
    } else {
      toast.error("Missing Email!");
    }
  }
};
