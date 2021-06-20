const { admin } = require("../configs/firebase");
const { ajout, obtenir } = require("./dao");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
const ajoutMatiere = async (req, res, next) => {
  try {
    const matiere = {
      nomMatiere: req.body.nomMatiere,
      niveau: admin.firestore().collection("niveau").doc(req.body.niveau),
      semestre: admin.firestore().collection("semestre").doc(req.body.semestre),
    };
    res.status(200).send(await ajout("matiere", matiere.nomMatiere, matiere));
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
const getMatiere = async (req, res, next) => {
  try {
    const { nomMatiere } = req.body;
    res.status(200).send(await obtenir("matiere", nomMatiere));
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

module.exports.ajoutMatiere = ajoutMatiere;
module.exports.getMatiere = getMatiere;
