module.exports.Utilisateur = class Utilisateur {
  id = "";
  cin = "";
  nom = "";
  prenom = "";
  email = "";

  constructor(data) {
    Object.assign(this, data);
  }
};
