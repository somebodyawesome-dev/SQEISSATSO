const firebase = require("firebase/app").default;
require("firebase/firestore");
require("firebase/auth");
var admin = require("firebase-admin");
var serviceAccount = require("./sqeissatso-firebase-adminsdk-4izi1-359b82c2f3.json");
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
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
module.exports = {
  admin: admin,
  firebase: firebase,
  db: firebase.firestore(),
  auth: firebase.auth(),
};
