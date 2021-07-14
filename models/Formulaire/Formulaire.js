class Formulaire {
  constructor(data) {
    this.formulaireId = "";
    this.semestre = {};
    this.niveau = {};
    this.ouvert = true;
    Object.assign(this, data);
  }
}
const formulaireConverter = {
  toFirestore(formulaire) {
    return {
      formulaireId: formulaire.formulaireId,
      niveau: admin.firestore().doc(`niveau/${formulaire.niveau}`),
      semestre: admin.firestore().doc(`semestre/${formulaire.semestre}`),
      ouvert: true,
    };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    data.niveau = data.niveau.id;
    data.semestre = data.semestre.id;
    return new Formulaire(data);
  },
};
module.exports.formulaireConverter = formulaireConverter;
