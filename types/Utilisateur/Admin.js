const { Utilisateur } = require("./Utilisateur");
class Admin extends Utilisateur {
  constructor(data) {
    super(data);
    Object.assign(this, data);
  }
}
