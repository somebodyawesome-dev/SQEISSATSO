const { admin } = require("../configs/firebase");
const { ajout, obtenir, supprimer } = require("./dao");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
const ajoutAdmin = async (req, res, next) => {
  const { cin, email, password, nom, prenom } = req.body;
  try {
    if (await adminExist(cin)) {
      res.status(500).send("Admin exist deja");
      console.log("Admin exist deja");
    } else {
      await ajout("admin", cin, { cin, email, nom, prenom });
      try {
        await admin.auth().createUser({
          email: email,
          password: password,
          uid: cin,
        });
        res.status(200).send("Admin est ajoute");
      } catch (error) {
        res.status(500).send(await supprimer("admin", cin));
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
const getAdmin = async (req, res, next) => {
  try {
    const { cin } = req.body;
    res.status(200).send(await obtenir("admin", cin));
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
const adminExist = async (cin) => {
  return (
    await admin
      .firestore()
      .doc("admin/" + cin)
      .get()
  ).exists;
};
module.exports.ajoutAdmin = ajoutAdmin;
module.exports.getAdmin = getAdmin;
module.exports.adminExist = adminExist;
