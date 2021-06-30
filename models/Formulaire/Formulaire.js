class Formulaire {
  id = "";
  semestre = {};
  niveau = {};
  ouvert = true;
  constructor(data) {
    Object.assign(this, data);
  }
}
const formulaireConverter = {
  toFirestore(formulaire) {
    return {
      id: formulaire.id,
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
