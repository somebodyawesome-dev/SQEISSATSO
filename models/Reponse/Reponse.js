const { admin } = require("../../configs/firebase");

class Reponse {
  id = "";
  commentaires = {};
  fromulaire = {};
  ecritePar = {};
  userType = "";

  constructor(data) {
    Object.assign(this, data);
  }
}
const reponseConverter = {
  toFirestore(reponse) {
    return {
      id: reponse.id,
      commentaires: reponse.commentaires,
      userType: reponse.userType,
      ecritePar: admin.firestore().doc(`ecritePar/${reponse.ecritePar}`),
      fromulaire: admin.firestore().doc(`formulaire/${reponse.formulaire}`),
    };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    data.ecritePar = data.ecritePar.id;
    data.formulaire = data.formulaire.id;

    return data;
  },
};
module.exports.reponseConverter = reponseConverter;
