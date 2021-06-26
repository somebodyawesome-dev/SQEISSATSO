const { admin, firebase, auth } = require("../../configs/firebase");
const { isEtudiant } = require("./authorization");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {*} next
 */
const getAuthToken = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    req.authToken = req.headers.authorization.split(" ")[1];
  } else {
    req.authToken = null;
  }
  next();
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {*} next
 */
const checkIfAuthenticated = async (req, res, next) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      if (authToken != null) {
        const decodedIdToken = await admin.auth().verifyIdToken(authToken);

        req.authId = decodedIdToken.uid;
        req.admin = decodedIdToken.admin;
        req.etudiant = decodedIdToken.etudiant;
        req.professeur = decodedIdToken.professeur;
        next();
      } else {
        res.status(500).send("UNAUTHINTICATED");
      }
    } catch (error) {
      res.status(500).send("UNAUTHINTICATED");
    }
  });
};
module.exports.getAuthToken = getAuthToken;
module.exports.checkIfAuthenticated = checkIfAuthenticated;
