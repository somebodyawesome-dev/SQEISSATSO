const {
  ajoutFormulaire,
  getFormulaire,
} = require("../controller/formulaire.controller");

/**
 *
 * @param {import('express').Application} app
 */
module.exports = (app) => {
  app.post("/formulaire", ajoutFormulaire);
  app.get("/formulaire", getFormulaire);
};
