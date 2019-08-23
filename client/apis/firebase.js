import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: process.env.VUE_APP_API_KEY_FBASE,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN_FBASE,
  projectId: process.env.VUE_APP_PROJECT_ID_FBASE
});

const db = firebase.firestore();

export default db;