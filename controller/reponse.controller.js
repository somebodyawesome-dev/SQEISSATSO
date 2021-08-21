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
    id: req.body.formulaire + "-" + req.body.ecritePar,
    userType: req.body.userType,
    ecritePar: admin
      .firestore()
      .doc(`${req.body.userType}/${req.body.ecritePar}`),
    formulaire: admin.firestore().doc(`formulaire/${req.body.formulaire}`),
    isValide: false,
  };
  const batch = admin.firestore().batch();
  req.body.commentaires.forEach((element) => {
    //prepare each comment to  be added to the data base
    element.reponse = admin
      .firestore()
      .collection("reponse")
      .doc(req.body.formulaire + "-" + req.body.ecritePar);
    element.relatedTo = admin
      .firestore()
      .doc(`${element.sujet}/${element.relatedTo}`);
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
const getAllReponse = async (req, res, next) => {
  var reponses = [];
  try {
    const querySnapShot = await admin.firestore().collection("reponse").get();
    querySnapShot.forEach(async (reponse) => {
      reponses.push(reponse.ref);
    });
    req.reponses = reponses;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getAllReponseNonValide = async (req, res, next) => {
  var reponses = [];
  try {
    const querySnapShot = await admin
      .firestore()
      .collection("reponse")
      .where("isValide", "==", false)
      .get();
    querySnapShot.forEach(async (reponse) => {
      reponses.push(reponse.ref);
    });
    req.reponses = reponses;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
const getAllReponseValide = async (req, res, next) => {
  var reponses = [];
  try {
    const querySnapShot = await admin
      .firestore()
      .collection("reponse")
      .where("isValide", "==", true)
      .get();
    querySnapShot.forEach(async (reponse) => {
      reponses.push(reponse.ref);
    });
    req.reponses = reponses;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
module.exports.ajoutReponse = ajoutReponse;
module.exports.getReponse = getReponse;
module.exports.getAllReponse = getAllReponse;
module.exports.getAllReponseNonValide = getAllReponseNonValide;
module.exports.getAllReponseValide = getAllReponseValide;
