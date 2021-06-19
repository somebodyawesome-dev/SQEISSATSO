const { Utilisateur } = require("./Utilisateur");
class Etudiant extends Utilisateur {
  niveau = "";
  constructor(data) {
    super(data);
    Object.assign(this, data);
  }
}
