class Commentaire {
  id = "";
  commentaire = {};
  sujet = {};
  relatedTo = {};
  reponse = {};
  note = 0;
  tp = false;
  constructor(data) {
    Object.assign(this, data);
  }
}
const commentaireConverter = {
  toFirestore(commentaire) {
    return {
      id: commentaire.id,
      commentaire: commentaire.commentaire,
      note: commentaire.note,
      sujet: commentaire.sujet,
      tp: commentaire.tp,
      relatedTo: admin.firestore().doc(`relatedTo/${commentaire.relatedTo}`),
      reponse: admin.firestore().doc(`reponse/${commentaire.reponse}`),
    };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    data.relatedTo = data.relatedTo.id;
    data.reponse = data.reponse.id;

    return data;
  },
};
module.exports.commentaireConverter = commentaireConverter;
