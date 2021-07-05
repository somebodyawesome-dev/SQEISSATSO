const { admin } = require("../configs/firebase");
const { matiereConverter } = require("../models/Matiere/Matiere");
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
      tp: req.body.tp,
    };
    if (await matiereExist(matiere.nomMatiere)) {
      res.status(500).send("matiere exist deja");
      console.log("matiere exist deja");
    } else {
      res.status(200).send(await ajout("matiere", matiere.nomMatiere, matiere));
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
const getMatiere = async (req, res, next) => {
  try {
    const { nomMatiere } = req.body;
    // res.status(200).send(await obtenir("matiere", nomMatiere));
    res
      .status(200)
      .send(
        (
          await admin
            .firestore()
            .doc(`matiere/${nomMatiere}`)
            .withConverter(matiereConverter)
            .get()
        ).data()
      );
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
const matiereExist = async (id) => {
  return (await admin.firestore().doc(`matiere/${id}`).get()).exist;
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
const getMatiereByNiveau = async (req, res, next) => {
  var matieres = [];
  try {
    const niveau = req.niveau;
    for (var i = 0; i < niveau.length; i++) {
      const snapShot = await admin
        .firestore()
        .collection("matiere")
        .where("niveau", "==", niveau[i])
        .get();
      snapShot.forEach(async (mat) => {
        matieres.push(mat.ref);
      });
      //TODO: handle case of prof (optional)
    }

    req.matieres = matieres;

    next();
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

module.exports.ajoutMatiere = ajoutMatiere;
module.exports.getMatiere = getMatiere;
module.exports.matiereExist = matiereExist;
module.exports.getMatiereByNiveau = getMatiereByNiveau;
