const { Utilisateur } = require("./Utilisateur");
class Etudiant extends Utilisateur {
  inscri = "";
  niveau = {};
  constructor(data) {
    super(data);
    Object.assign(this, data);
  }
}
const etudiantConverter = {
  toFirestore(etudiant) {
    return {
      etudiantId: etudiant.etudiantId,
      niveau: admin.firestore().doc(`niveau/${etudiant.niveau}`),
    };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    data.niveau = data.niveau.id;
    return data;
  },
};
module.exports.etudiantConverter = etudiantConverter;
