const { ajoutAdmin, getAdmin } = require("../controller/admin.controller");

/**
 *
 * @param {import('express').Application} app
 */
module.exports = (app) => {
  app.post("/admin", ajoutAdmin);
  app.get("/admin", getAdmin);
};
