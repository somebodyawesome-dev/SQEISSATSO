module.exports = function (app) {
  require("./pages")(app);
  require("./login/login")(app);
  require("./semestre")(app);
  require("./filiere")(app);
  require("./niveau")(app);
  require("./matiere")(app);
  require("./etudiant")(app);
  require("./professeur")(app);
  require("./admin")(app);
  require("./formulaire")(app);
  require("./reponse")(app);
  require("./enseigne")(app);
  require("./user")(app);
};
