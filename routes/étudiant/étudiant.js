const { db } = require("../../configs/firebase");
const { ajout, mettre, obtenir, supprimer } = require("../../configs/dao");

module.exports = function (app) {
  app.post("/étudiant", async (req, res) => {
    const étudiantDATA = {
      id: req.body.id,
      nom: req.body.nom,
      prenom: req.body.prenom,
      filiere: req.body.filiere,
      dep: db.collection("étudiant").doc(req.body.dep),
    };
    try {
      res.send(await ajout("étudiant", étudiantDATA.id, étudiantDATA));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.get("/étudiant/:étudiantID", async (req, res) => {
    const étudiantNom = req.params.étudiantID;
    try {
      res.send(await obtenir("étudiant", étudiantNom));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.put("/étudiant", async (req, res) => {
    const étudiant = {
      id: req.body.id,
      nom: req.body.nom,
      prenom: req.body.prenom,
      filiere: req.body.filiere,
    };
    try {
      res.send(await mettre("étudiant", étudiant.id));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.delete("/étudiant", async (req, res) => {
    const étudiant = req.body.id;
    try {
      res.send(await supprimer("étudiant", étudiant));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });
};
