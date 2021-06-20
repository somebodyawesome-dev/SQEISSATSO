const { admin, db } = require("../configs/firebase");
const { ajout, obtenir } = require("./dao");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
const ajoutNiveau = async (req, res, next) => {
  try {
    const niveau = {
      id: req.body.id,
      niveau: req.body.niveau,
      filiere: admin.firestore().collection("filiere").doc(req.body.filiere),
    };
    res.status(200).send(await ajout("niveau", niveau.id, niveau));
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
const getNiveau = async (req, res, next) => {
  try {
    const { id } = req.body;
    res.status(200).send(await obtenir("niveau", id));
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

module.exports.ajoutNiveau = ajoutNiveau;
module.exports.getNiveau = getNiveau;
