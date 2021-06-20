const { admin } = require("../configs/firebase");
const { ajout, obtenir } = require("./dao");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
const ajoutSemestre = async (req, res, next) => {
  try {
    const semestre = {
      semestre: req.body.semestre,
      annee: req.body.annee,
    };
    res
      .status(200)
      .send(
        await ajout(
          "semestre",
          semestre.annee + "-" + semestre.semestre,
          semestre
        )
      );
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

module.exports.ajoutSemestre = ajoutSemestre;
module.exports.getSemestre = getSemestre;
