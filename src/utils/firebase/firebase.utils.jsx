import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
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

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore()


export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
        });
    } catch(error) {
        console.log('error creating the user', error.message); 
    }
  }
  return userDocRef;

}