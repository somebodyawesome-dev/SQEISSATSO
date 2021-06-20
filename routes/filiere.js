const {
  ajoutFiliere,
  getFiliere,
} = require("../controller/filiere.controller");

/**
 *
 * @param {import('express').Application} app
 */
module.exports = (app) => {
  app.post("/filiere", ajoutFiliere);
  app.get("/filiere", getFiliere);
};
