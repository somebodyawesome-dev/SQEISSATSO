const { admin } = require("../../configs/firebase");

class Niveau {
  constructor(data) {
    this.id = "";
    this.filiere = {};
    this.niveau = 0;

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
