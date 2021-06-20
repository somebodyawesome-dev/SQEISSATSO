module.exports.Filiere = class Filiere {
  id = "";
  nom = "";
  dep = "";
  niveauMax = "";

  constructor(data) {
    Object.assign(this, data);
  }
};
