const {
  ajoutEnseigne,
  getEnseigne,
} = require("../controller/enseigne.controller");

/**
 *
 * @param {import('express').Application} app
 */
module.exports = (app) => {
  app.post("/enseigne", ajoutEnseigne);
  app.get("/enseigne", getEnseigne);
};
