const {
  ajoutReponse,
  getReponse,
} = require("../controller/reponse.controller");
const { checkIfAuthenticated } = require("./auth/authentication");
const { checkIfProfesseurOrEtudiant } = require("./auth/authorization");

/**
 *
 * @param {import('express').Application} app
 */

module.exports = (app) => {
  app.post(
    "/reponse",
    checkIfAuthenticated,
    checkIfProfesseurOrEtudiant,
    ajoutReponse
  );
  app.get("/reponse", getReponse);
};
