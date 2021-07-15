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
          ouvert: true,
        })
      );
    } else {
      res.status(500).send("formulaire existe deja");
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
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
const getForumulaireByNiveau = async (req, res, next) => {
  var formulaires = [];
  try {
    const querySnapShot = await admin
      .firestore()
      .collection("formulaire")
      .where("ouvert", "==", true)
      .where("niveau", "in", req.niveau)
      .get();
    const responseQuerySnapShot = await admin
      .firestore()
      .collection(`reponse`)
      .where(
        "ecritePar",
        "==",
        admin
          .firestore()
          .doc(`${req.etudiant ? "etudiant" : "professeur"}/${req.body.authId}`)
      )
      .get();
    let satisfiedForm = [];
    for (const doc of responseQuerySnapShot.docs) {
      const formulaire = doc.get("formulaire");
      if (!!formulaire) {
        satisfiedForm.push(formulaire);
      }
    }
    querySnapShot.forEach(async (formulaire) => {
      if (formulaire in satisfiedForm) {
        formulaires.push(formulaire.ref);
      }
    });
    req.formulaires = formulaires;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getAllForumulaire = async (req, res, next) => {
  var formulaires = [];
  try {
    const querySnapShot = await admin
      .firestore()
      .collection("formulaire")
      .get();
    querySnapShot.forEach(async (formulaire) => {
      formulaires.push(formulaire.ref);
    });
    req.formulaires = formulaires;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
module.exports.ajoutFormulaire = ajoutFormulaire;
module.exports.getFormulaire = getFormulaire;
module.exports.formulaireExist = formulaireExist;
module.exports.getForumulaireByNiveau = getForumulaireByNiveau;
module.exports.getAllForumulaire = getAllForumulaire;
