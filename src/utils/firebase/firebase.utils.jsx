import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,

} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  getDocFromCache
} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDw9jvvyAZ8JenpQalJPHxjZvG_IL0_M4c",  
    authDomain: "rugburn-world-b098b.firebaseapp.com",  
    projectId: "rugburn-world-b098b",  
    storageBucket: "rugburn-world-b098b.appspot.com",  
    messagingSenderId: "1023260371391",  
    appId: "1:1023260371391:web:c42d078590f568996d590a"  
  };   
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);


export const db = getFirestore()


export const createUserDocumentFromAuth = async (
  userAuth, 
  additionalInformation = {}) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
        });
    } catch(error) {
        console.log('error creating the user', error.message); 
    }
  }
  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}