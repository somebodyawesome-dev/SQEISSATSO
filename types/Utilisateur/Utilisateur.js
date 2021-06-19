module.exports.Utilisateur = class Utilisateur {
  id = "";
  nom = "";
  prenom = "";
  adress = "";
  mdp = "";
  constructor(data) {
    Object.assign(this, data);
  }
};
