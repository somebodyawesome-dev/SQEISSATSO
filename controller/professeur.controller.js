const { admin, db } = require("../configs/firebase");
const { ajout, obtenir, supprimer } = require("./dao");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
const ajoutProfesseur = async (req, res, next) => {
  const { cin, email, password, nom, prenom, specialite } = req.body;
  try {
    if (await professeurExist(cin)) {
      res.status(500).send("Professeur exist deja");
      console.log("Professeur exist deja");
    } else {
      await ajout("professeur", cin, { cin, email, nom, prenom, specialite });
      try {
        await admin.auth().createUser({
          email: email,
          password: password,
          uid: cin,
        });
        res.status(200).send("Professeur est ajoute");
      } catch (error) {
        res.status(500).send(await supprimer("professeur", cin));
      }
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
const getProfesseur = async (req, res, next) => {
  try {
    const { cin } = req.body;
    res.status(200).send(await obtenir("professeur", cin));
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
const professeurExist = async (cin) => {
  return (
    await admin
      .firestore()
      .doc("professeur/" + cin)
      .get()
  ).exists;
};
module.exports.ajoutProfesseur = ajoutProfesseur;
module.exports.getProfesseur = getProfesseur;
module.exports.professeurExist = professeurExist;
