const { db } = require("../../configs/firebase");
const { ajout, mettre, obtenir } = require("../../configs/dao");

module.exports = function (app) {
  app.post("/utilisateur", async (req, res) => {
    const utilisateurDATA = {
      id: req.body.id,
      nom: req.body.nom,
      prenom: req.body.prenom,
      filiere: req.body.filiere,
      dep: db.collection("department").doc(req.body.dep),
    };
    res.send(await ajout("utilisateur", utilisateurDATA.id, utilisateurDATA));
  });

  app.get("/utilisateur/:utilisateurID", async (req, res) => {
    const utilisateurNom = req.params.utilisateurID;
    res.send(await obtenir("utilisateur", utilisateurNom));
  });

  app.put("/utilisateur", async (req, res) => {
    const utilisateur = {
      id: req.body.id,
      nom: req.body.nom,
      prenom: req.body.prenom,
      filiere: req.body.filiere,
    };
    res.send(await mettre("utilisateur", utilisateurDATA.id, utilisateurDATA));
  });
};
