const {
  ajoutSemestre,
  getSemestre,
} = require("../controller/semestre.controller");

/**
 *
 * @param {import('express').Application} app
 */
module.exports = (app) => {
  app.post("/semestre", ajoutSemestre);
  app.get("/semestre", getSemestre);
};
