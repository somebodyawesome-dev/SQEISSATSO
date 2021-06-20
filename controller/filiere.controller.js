const { admin } = require("../configs/firebase");
const { Filiere } = require("../models/Filiere/Filiere");
const { ajout, obtenir } = require("./dao");
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
const ajoutFiliere = async (req, res, next) => {
  try {
    const filiere = new Filiere(req.body);
    res
      .status(200)
      .send(
        await ajout("filiere", filiere.id, JSON.parse(JSON.stringify(filiere)))
      );
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
const getFiliere = async (req, res, next) => {
  try {
    const { id } = req.body;
    res.status(200).send(await obtenir("filiere", id));
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
const filiereExist = async (id) => {
  try {
    const docSnap = await admin.firestore().collection("filiere").doc(id).get();
    return docSnap.exists;
  } catch (error) {
    throw new Error(" can't get " + id + " for this reasons: " + error);
  }
};
module.exports.ajoutFiliere = ajoutFiliere;
module.exports.getFiliere = getFiliere;
module.exports.filiereExist = filiereExist;
