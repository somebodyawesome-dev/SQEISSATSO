const { get } = require("http");
const { admin } = require("../configs/firebase");
const { ajout, obtenir, ajoutAvecCleAleatoire } = require("./dao");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
const ajoutReponse = async (req, res, next) => {
  const reponse = {
    id: req.body.formulaire + "-" + req.body.ecrirePar,
    userType: req.body.userType,
    ecritePar: admin
      .firestore()
      .doc(`${req.body.userType}/${req.body.ecrirePar}`),
    formulaire: admin.firestore().doc(`formulaire/${req.body.formulaire}`),
  };
  const batch = admin.firestore().batch();
  req.body.commentaires.forEach((element) => {
    element.reponse = admin
      .firestore()
      .collection("reponse")
      .doc(req.body.formulaire + "-" + req.body.ecrirePar);
    element.relatedTo;
    batch.set(admin.firestore().collection("commentaire").doc(), element);
  });
  batch.set(admin.firestore().collection("reponse").doc(reponse.id), reponse);

  try {
    await batch.commit();
    res.status(200).send("reponse est ajoute");
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
const getReponse = async (req, res, next) => {
  try {
    const { id } = req.body;
    res.status(200).send(await obtenir("reponse", id));
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

module.exports.ajoutReponse = ajoutReponse;
module.exports.getReponse = getReponse;