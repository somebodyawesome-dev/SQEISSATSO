const { admin, db } = require("../configs/firebase");
const { ajout, obtenir, supprimer } = require("./dao");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
const ajoutEtudiant = async (req, res, next) => {
  const { cin, email, password, nom, prenom, inscri } = req.body;
  const niveau = admin.firestore().collection("niveau").doc(req.body.niveau);
  try {
    if (await etudiantExist(cin)) {
      res.status(500).send("Etudiant exist deja");
      console.log("Etudiant exist deja");
    } else {
      await ajout("etudiant", cin, { cin, email, nom, prenom, inscri, niveau });
      try {
        await admin.auth().createUser({
          email: email,
          password: password,
          uid: cin,
        });
        res.status(200).send("etudiant est ajoute");
      } catch (error) {
        res.status(500).send(await supprimer("etudiant", cin));
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
const getEtudiant = async (req, res, next) => {
  try {
    const { cin } = req.body;
    res.status(200).send(await obtenir("etudiant", cin));
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
const etudiantExist = async (cin) => {
  return (
    await admin
      .firestore()
      .doc("etudiant/" + cin)
      .get()
  ).exists;
};
module.exports.ajoutEtudiant = ajoutEtudiant;
module.exports.getEtudiant = getEtudiant;
module.exports.etudiantExist = etudiantExist;
