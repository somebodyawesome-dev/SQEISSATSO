const { admin } = require("../configs/firebase");
const { ajout, obtenir, ajoutAvecCleAleatoire } = require("./dao");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */

const ajoutCommentaire = async (data) => {
  try {
    const commentaire = {
      commentaire: data.commentaire,
      note: data.note,
      sujet: data.sujet,
      reponse: admin.firestore().doc(`reponse/${data.reponse}`),
      relatedTo: admin.firestore().doc(`${data.sujet}/${data.relatedTo}`),
    };
    return await ajoutAvecCleAleatoire("commentaire", commentaire);
  } catch (error) {
    throw new Error("cant add commentaire :" + error);
  }
};
const ajoutCommentaireAPI = async (req, res, next) => {
  try {
    const commentaire = {
      commentaire: req.body.commentaire,
      note: req.body.note,
      sujet: req.body.sujet,
      reponse: admin.firestore().doc(`reponse/${req.body.reponse}`),
      relatedTo: admin
        .firestore()
        .doc(`${req.body.sujet}/${req.body.relatedTo}`),
    };
    res
      .status(200)
      .send(await ajoutAvecCleAleatoire("commentaire", commentaire));
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
const getCommentaireByReponse = async (req, res, next) => {
  const reponse = admin.firestore().collection("reponse").doc(req.body.reponse);
  try {
    const querySnapShot = await admin
      .firestore()
      .collection("commentaire")
      .where("reponse", "==", reponse)
      .get();
    var result = [];

    querySnapShot.docs.forEach((element) => {
      result.push(element.data());
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

module.exports.ajoutCommentaire = ajoutCommentaire;
module.exports.getCommentaireByReponse = getCommentaireByReponse;
module.exports.ajoutCommentaireAPI = ajoutCommentaireAPI;
