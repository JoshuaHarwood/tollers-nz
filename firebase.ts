import { initializeApp } from "firebase/app";
​​import {
​​  GoogleAuthProvider,
​​  getAuth,
​​  signInWithPopup,
​​  signInWithEmailAndPassword,
​​  createUserWithEmailAndPassword,
​​  sendPasswordResetEmail,
​​  signOut,
​​} from "firebase/auth";
​​import {
​​  getFirestore,
​​  query,
​​  getDocs,
  getDoc,
​​  collection,
  doc,
​​  where,
​​  addDoc,
​​} from "firebase/firestore";

const firebaseConfig = {
  // ADD config here
};

const app = ​​initializeApp(firebaseConfig);
​​const auth = getAuth(app);
​​const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

const getTollerTree = async (id: String) => {
  const val = await getDoc(doc(db, 'tollers', id))
  let dog = val.data()
  if(dog.motherId){
    const mother = await getTollerTree(dog.motherId)
    dog = {...dog, mother: mother}
  }
  if(dog.fatherId){
    const father = await getTollerTree(dog.fatherId)
    dog = {...dog, father: father}
  }
  return dog
}


const getTollerById = async (id: String) => {
  const val = await getDoc(doc(db, 'tollers', id))
  return val.data();
}

const getAll = async (): Promise<Array<any>> => {
  const q = query(collection(db, "tollers"));
  const docs = await getDocs(q);
  const obs = []
  docs.forEach((doc) => {
    obs.push({ data: doc.data(), id: doc.id })
  })
  return obs;
}

const getMales = async (): Promise<Array<any>> => {
  const q = query(collection(db, "tollers"), where("gender", "==", 'M'));
  const docs = await getDocs(q);
  const obs = []
  docs.forEach((doc) => {
    obs.push({ data: doc.data(), id: doc.id })
  })
  return obs;
}

const getFemales = async (): Promise<Array<any>> => {
  const q = query(collection(db, "tollers"), where("gender", "==", 'F'));
  const docs = await getDocs(q);
  const obs = []
  docs.forEach((doc) => {
    obs.push({ data: doc.data(), id: doc.id })
  })
  return obs;
}

const writeTollerData = async (microChipId, dogName, gender, location, litter, kennel, motherId, fatherId, ownerEmail) => {
  try {
    await addDoc(collection(db, "tollers"), {
      microChipId: microChipId,
      dogName: dogName,
      gender: gender,
      location: location,
      litter: litter,
      kennel: kennel,
      motherId: motherId,
      fatherId: fatherId,
      ownerEmail: ownerEmail
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  writeTollerData,
  getTollerById,
  getTollerTree,
  getAll,
  getMales,
  getFemales,
};