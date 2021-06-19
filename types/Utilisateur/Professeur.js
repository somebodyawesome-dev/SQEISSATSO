const { Utilisateur } = require("./Utilisateur");
class Professeur extends Utilisateur {
  specialite = "";
  constructor(data) {
    super(data);
    Object.assign(this, data);
  }
}
