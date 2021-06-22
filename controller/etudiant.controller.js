const { admin, db } = require("../configs/firebase");
const { ajout, obtenir, supprimer } = require("./dao");
const { randomPassword, mailer } = require("./nodemailer");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
const ajoutEtudiant = async (req, res, next) => {
  const { email } = req.body;

  try {
    const niveau = admin.firestore().collection("niveau").doc(req.body.niveau);
    if (await etudiantExist(email)) {
      res.status(500).send("Etudiant exist deja");
      console.log("Etudiant exist deja");
    } else {
      await ajout("etudiant", email, { email, niveau });
      try {
        const password = randomPassword();
        await admin.auth().createUser({
          email: email,
          password: password,
          uid: email,
        });
        const mailOptions = {
          from: "SQEISSATSO BOT",
          to: email,
          subject: "Welcome to SQEISSATSO !",
          text: "Your password is :" + password,
        };

        mailer.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        res.status(200).send("etudiant est ajoute");
      } catch (error) {
        await supprimer("etudiant", email);
        res.status(500).send(error);
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
    const { email } = req.body;
    res.status(200).send(await obtenir("etudiant", email));
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
const etudiantExist = async (email) => {
  return (
    await admin
      .firestore()
      .doc("etudiant/" + email)
      .get()
  ).exists;
};
module.exports.ajoutEtudiant = ajoutEtudiant;
module.exports.getEtudiant = getEtudiant;
module.exports.etudiantExist = etudiantExist;
