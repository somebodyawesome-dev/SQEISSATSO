const { firebase, admin } = require("../../configs/firebase");
const { isAdmin, isEtudiant, isProfesseur } = require("../auth/authorization");
/**
 *
 * @param {import('express').Application } app
 */
module.exports = (app) => {
  //login user

  app.post("/login", async function (req, res, next) {
    console.log(req.body);
    if (!req.body.email)
      return res.status(400).json({ error: "missing email" });
    if (!req.body.password)
      return res.status(400).json({ error: "missing password" });

    try {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE); // don't persist auth session
      const userCred = await firebase
        .auth()
        .signInWithEmailAndPassword(req.body.email, req.body.password);
      const { uid } = userCred.user;
      const token = await admin.auth().createCustomToken(uid, {
        admin: await isAdmin(uid),
        etudiant: await isEtudiant(uid),
        professeur: await isProfesseur(uid),
      });

      res.status(200).send({ idToken: token });
      await firebase.auth().signOut(); //clears session from memory
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });
  //logout user
  app.get("/logout", (req, res) => {
    res.clearCookie("session");
    res.redirect("/");
  });
};
