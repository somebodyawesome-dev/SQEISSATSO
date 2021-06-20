const { admin } = require("../configs/firebase");
const { ajout, obtenir } = require("./dao");
const { formulaireExist } = require("./formulaire.controller");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
const ajoutSemestre = async (req, res, next) => {
  try {
    const { semestre, annee } = req.body;

    if (await formulaireExist(annee + "-" + semestre)) {
      res.status(500).send("semestre exist deja");
      console.log("semestre exist deja");
    } else {
      res
        .status(200)
        .send(
          await ajout("semestre", annee + "-" + semestre, { semestre, annee })
        );
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
const getSemestre = async (req, res, next) => {
  try {
    const { id } = req.body;
    res.status(200).send(await obtenir("semestre ", id));
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
const semestreExist = async (id) => {
  return (await admin.firestore().doc(`semestre/${id}`).get()).exist;
};
module.exports.ajoutSemestre = ajoutSemestre;
module.exports.getSemestre = getSemestre;
module.exports.semestreExist = semestreExist;
