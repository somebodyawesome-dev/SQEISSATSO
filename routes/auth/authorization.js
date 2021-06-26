const { admin, firebase, auth } = require("../../configs/firebase");

const isAdmin = async (uid) => {
  try {
    const snapShot = await admin
      .firestore()
      .collection("admin")
      .where("email", "==", uid)
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
      .where("email", "==", uid)
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
      .where("email", "==", uid)
      .get();
    return !snapShot.empty;
  } catch (error) {
    console.log(error);
    return false;
  }
};
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
const checkIfEtudiant = async (req, res, next) => {
  if (req.etudiant) {
    next();
  } else {
    res.status(500).send("UNAUTHORIZED");
  }
};
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
const checkIfProfesseur = async (req, res, next) => {
  if (req.professeur) {
    next();
  } else {
    res.status(500).send("UNAUTHORIZED");
  }
};
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
const checkIfAdmin = async (req, res, next) => {
  if (req.admin) {
    next();
  } else {
    res.status(500).send("UNAUTHORIZED");
  }
};
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
const checkIfProfesseurOrEtudiant = async (req, res, next) => {
  if (req.etudiant || req.professeur) {
    next();
  } else {
    res.status(500).send("UNAUTHORIZED");
  }
};
module.exports.isAdmin = isAdmin;
module.exports.isEtudiant = isEtudiant;
module.exports.isProfesseur = isProfesseur;
module.exports.checkIfEtudiant = checkIfEtudiant;
module.exports.checkIfProfesseur = checkIfProfesseur;
module.exports.checkIfAdmin = checkIfAdmin;
module.exports.checkIfProfesseurOrEtudiant = checkIfProfesseurOrEtudiant;
