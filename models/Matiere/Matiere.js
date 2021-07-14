const { admin } = require("../../configs/firebase");

class Matiere {
  constructor(data) {
    this.nomMatiere = "";
    this.niveau = {};
    this.semestre = {};
    this.tp = false;
    Object.assign(this, data);
  }
}

module.exports.Matiere = Matiere;
const matiereConverter = {
  toFirestore(matiere) {
    return {
      nomMatiere: matiere.title,
      niveau: admin.firestore().doc(`niveau/${matiere.niveau}`),
      semestre: admin.firestore().doc(`semestre/${matiere.semestre}`),
      tp: matiere.tp,
    };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    data.niveau = data.niveau.id;
    data.semestre = data.semestre.id;
    return new Matiere(data);
  },
};
module.exports.matiereConverter = matiereConverter;
