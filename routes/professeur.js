const {
  ajoutProfesseur,
  getProfesseur,
} = require("../controller/professeur.controller");

/**
 *
 * @param {import('express').Application} app
 */
module.exports = (app) => {
  app.post("/professeur", ajoutProfesseur);
  app.get("/professeur", getProfesseur);
};
