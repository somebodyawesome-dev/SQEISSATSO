const { admin } = require("../configs/firebase");
const { ajout, obtenir } = require("./dao");
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
const ajoutEnseigne = async (req, res, next) => {
  const enseigne = {
    id: req.body.niveau + "-" + req.body.professeur,
    professeur: admin.firestore().doc(`professeur/${req.body.professeur}`),
    niveau: admin.firestore().doc(`niveau/${req.body.niveau}`),
  };
  try {
    res.status(200).send(await ajout("enseigne", enseigne.id, enseigne));
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
const getEnseigne = async (req, res, next) => {
  const id = req.body.id;
  try {
    res.status(200).send(await obtenir("enseigne", id));
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

module.exports.ajoutEnseigne = ajoutEnseigne;
module.exports.getEnseigne = getEnseigne;
