module.exports = function (app) {
  //app.use(verifLogin);

  require("./utilisateur/utilisateur")(app);
  require("./departement/departement")(app);
  require("./formulaire/formulaireE")(app);
  require("./formulaire/formulaireP")(app);
  require("./réponse/réponseE")(app);
  require("./réponse/réponseP")(app);
  require("./matériel/matériel")(app);
  require("./matière/matière")(app);
  require("./semestre/semestre")(app);
  require("./admin/admin")(app);
  require("./étudiant/étudiant")(app);
  require("./professeur/professeur")(app);
};
