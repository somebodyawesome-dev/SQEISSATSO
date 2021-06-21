const {
  ajoutReponse,
  getReponse,
} = require("../controller/reponse.controller");

/**
 *
 * @param {import('express').Application} app
 */

module.exports = (app) => {
  app.post("/reponse", ajoutReponse);
  app.get("/reponse", getReponse);
};
