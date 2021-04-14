import firebase from 'firebase';
const REACT_APP_API_KEY_FIREBASE = process.env.REACT_APP_API_KEY_FIREBASE;
const REACT_APP_authDomain = process.env.REACT_APP_authDomain
const REACT_APP_projectId = process.env.REACT_APP_projectId
const REACT_APP_storageBucket = process.env.REACT_APP_storageBucket
const REACT_APP_messagingSenderId = process.env.REACT_APP_messagingSenderId
const REACT_APP_appId = process.env.REACT_APP_appId
const REACT_APP_measurementId = process.env.REACT_APP_measurementId


const configFirebase = {
  apiKey: REACT_APP_API_KEY_FIREBASE,
  authDomain: REACT_APP_authDomain,
  projectId: REACT_APP_projectId,
  storageBucket: REACT_APP_storageBucket,
  messagingSenderId: REACT_APP_messagingSenderId,
  appId: REACT_APP_appId,
  measurementId: REACT_APP_measurementId
};
const fb = firebase.initializeApp(configFirebase);
const auth = fb.auth();
const db = firebase.firestore();
export { fb, auth, db };

