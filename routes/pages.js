const { isEtudiant } = require("./auth/authorization");

/**
 *
 * @param {import('express').Application} app
 */
module.exports = (app) => {
  app.get("/", function (req, res) {
    res.render("index.html");
  });
  app.get("/signup", function (req, res) {
    res.render("signup.html");
  });
  app.get("/signin", function (req, res) {
    res.render("signin.html");
  });
  app.get("/remplirFormulaire", function (req, res) {
    res.render("formulaire.html");
  });
  app.get("/test", function (req, res) {
    res.render("index copy.html", { data: "wiow" });
  });
};
