const { db } = require("../../configs/firebase");
const { ajout, mettre, obtenir, supprimer } = require("../../configs/dao");

module.exports = function (app) {
  app.post("/admin", async (req, res) => {
    const adminDATA = {
      ref: db.collection("utilisateur").doc(req.body.ref),
    };
    const utilisateurDATA = {
      id: req.body.id,
      nom: req.body.nom,
      prenom: req.body.prenom,
      filiere: req.body.filiere,
    };
    try {
      await ajout("utilisateur", utilisateurDATA.id, utilisateurDATA);
      res.send(await ajout("admin", adminDATA.id, adminDATA));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.get("/admin/:adminID", async (req, res) => {
    const adminNom = req.params.adminID;
    try {
      res.send(await obtenir("admin", adminNom));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.put("/admin", async (req, res) => {
    const admin = {
      id: req.body.id,
      nom: req.body.nom,
      prenom: req.body.prenom,
      filiere: req.body.filiere,
    };
    try {
      res.send(await mettre("admin", admin.id));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.delete("/admin", async (req, res) => {
    const admin = req.body.id;
    try {
      res.send(await supprimer("admin", admin));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });
};
