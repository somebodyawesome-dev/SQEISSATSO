const { admin } = require("../../configs/firebase");

class Niveau {
  id = "";
  filiere = {};
  niveau = 0;

  constructor(data) {
    Object.assign(this, data);
  }
}

module.exports.Niveau = Niveau;

const niveauConverter = {
  toFirestore(niveau) {
    return {
      id: niveau.id,
      niveau: niveau.niveau,
      filiere: admin.firestore().collection("filiere").doc(niveau.filiere),
    };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    data.filiere = data.filiere.id;
    return new Niveau(data);
  },
};
module.exports.niveauConverter = niveauConverter;
