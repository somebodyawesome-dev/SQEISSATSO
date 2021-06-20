const {
  ajoutEtudiant,
  getEtudiant,
} = require("../controller/etudiant.controller");

/**
 *
 * @param {import('express').Application} app
 */
module.exports = (app) => {
  app.post("/etudiant", ajoutEtudiant);
  app.get("/etudiant", getEtudiant);
};
