const firebase = require("firebase");
require("firebase/firestore");
require("firebase/auth");
const env = require("dotenv");
env.config();
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDERID,
  appId: process.env.APP_ID,
  measurementId: process.env.MESUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
module.exports = {
  db: firebase.firestore(),
  auth: firebase.auth(),
};
