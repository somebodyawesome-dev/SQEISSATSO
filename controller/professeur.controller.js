const { admin, db } = require("../configs/firebase");
const { ajout, obtenir, supprimer } = require("./dao");
const { mailer, randomPassword } = require("./nodemailer");
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
const ajoutProfesseur = async (req, res, next) => {
  const { email } = req.body;
  const password = randomPassword();
  try {
    if (await professeurExist(email)) {
      res.status(500).send("Professeur exist deja");
      console.log("Professeur exist deja");
    } else {
      await ajout("professeur", email, { email });
      try {
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

        res.status(200).send("Professeur est ajoute");
      } catch (error) {
        res.status(500).send(await supprimer("professeur", email));
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
    const { email } = req.body;
    res.status(200).send(await obtenir("professeur", email));
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
const professeurExist = async (email) => {
  return (
    await admin
      .firestore()
      .doc("professeur/" + email)
      .get()
  ).exists;
};
module.exports.ajoutProfesseur = ajoutProfesseur;
module.exports.getProfesseur = getProfesseur;
module.exports.professeurExist = professeurExist;
