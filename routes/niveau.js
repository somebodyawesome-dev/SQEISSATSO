const { ajoutNiveau, getNiveau } = require("../controller/niveau.controller");

/**
 *
 * @param {import('express').Application} app
 */
module.exports = (app) => {
  app.post("/niveau", ajoutNiveau);
  app.get("/niveau", getNiveau);
};
