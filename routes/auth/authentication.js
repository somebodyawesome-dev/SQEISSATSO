const { admin, firebase, auth } = require("../../configs/firebase");

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

export const getAuthToken = getAuthToken;
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {*} next
 */
export const checkIfAuthenticated = (req, res, next) => {
  const { authToken } = req;
  getAuthToken(req, res, async () => {
    const decodedIdToken = await admin.auth().verifyIdToken(authToken);
    req.authId = decodedIdToken.uid;
  });
};
