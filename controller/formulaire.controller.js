const { admin } = require("../configs/firebase");
const { ajout, obtenir, supprimer } = require("./dao");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
const ajoutFormulaire = async (req, res, next) => {
  const formulaireId = req.body.semestre + "-" + req.body.niveau;
  const niveau = admin.firestore().doc(`niveau/${req.body.niveau}`);
  const semestre = admin.firestore().doc(`semestre/${req.body.semestre}`);
  try {
    if (!(await formulaireExist(formulaireId))) {
      res.status(200).send(
        await ajout("formulaire", formulaireId, {
          formulaireId,
          niveau,
          semestre,
        })
      );
    } else {
      res.status(500).send("formulaire exist deja");
    }
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
const getFormulaire = async (req, res, next) => {
  try {
    const id = req.body.semestre + "-" + req.body.niveau;
    res.status(200).send(await obtenir("formulaire", id));
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
const formulaireExist = async (id) => {
  return (
    await admin
      .firestore()
      .doc("formulaire/" + id)
      .get()
  ).exists;
};
module.exports.ajoutFormulaire = ajoutFormulaire;
module.exports.getFormulaire = getFormulaire;
module.exports.formulaireExist = formulaireExist;
