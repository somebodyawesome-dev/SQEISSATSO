module.exports = function (app) {
  //app.use(verifLogin);

  require("./utilisateur/utilisateur")(app);
  require("./departement/departement")(app);
};
