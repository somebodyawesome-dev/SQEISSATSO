const {
  ajoutFormulaire,
  getFormulaire,
  getForumulaireByNiveau,
} = require("../controller/formulaire.controller");
const { getNiveauByUser } = require("../controller/niveau.controller");
const { checkIfAuthenticated } = require("./auth/authentication");
const { checkIfProfesseurOrEtudiant } = require("./auth/authorization");

/**
 *
 * @param {import('express').Application} app
 */
module.exports = (app) => {
  app.post("/formulaire", ajoutFormulaire);
  app.get("/formulaire", getFormulaire);
  app.get(
    "/formulaireValable",
    checkIfAuthenticated,
    checkIfProfesseurOrEtudiant,
    getNiveauByUser,
    getForumulaireByNiveau
  );
};
