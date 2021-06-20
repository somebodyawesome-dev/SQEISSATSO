const { Utilisateur } = require("./Utilisateur");
class Etudiant extends Utilisateur {
  inscri = "";
  niveau = {};
  constructor(data) {
    super(data);
    Object.assign(this, data);
  }
}
