const {
  ajoutMatiere,
  getMatiere,
} = require("../controller/matiere.controller");

/**
 *
 * @param {import('express').Application} app
 */
module.exports = (app) => {
  app.post("/matiere", ajoutMatiere);
  app.get("/matiere", getMatiere);
};
