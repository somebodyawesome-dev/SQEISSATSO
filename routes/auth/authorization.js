const { admin, firebase, auth } = require("../../configs/firebase");

const isAdmin = async (uid) => {
  try {
    const snapShot = await admin
      .firestore()
      .collection("admin")
      .where("uid", "==", uid)
      .get();
    return !snapShot.empty;
  } catch (error) {
    console.log(error);
    return false;
  }
};
const isEtudiant = async (uid) => {
  try {
    const snapShot = await admin
      .firestore()
      .collection("etudiant")
      .where("uid", "==", uid)
      .get();
    return !snapShot.empty;
  } catch (error) {
    console.log(error);
    return false;
  }
};
const isProfesseur = async (uid) => {
  try {
    const snapShot = await admin
      .firestore()
      .collection("professeur")
      .where("uid", "==", uid)
      .get();
    return !snapShot.empty;
  } catch (error) {
    console.log(error);
    return false;
  }
};
module.exports.isAdmin = isAdmin;
module.exports.isEtudiant = isEtudiant;
module.exports.isProfesseur = isProfesseur;
