const { db } = require("../../configs/firebase");
const { ajout, mettre, obtenir, supprimer } = require("../../configs/dao");

module.exports = function (app) {
  app.post("/utilisateur", async (req, res) => {
    const utilisateurDATA = {
      id: req.body.id,
      nom: req.body.nom,
      prenom: req.body.prenom,
      filiere: req.body.filiere,
    };
    try {
      res.send(await ajout("utilisateur", utilisateurDATA.id, utilisateurDATA));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.get("/utilisateur/:utilisateurID", async (req, res) => {
    const utilisateurNom = req.params.utilisateurID;
    try {
      res.send(await obtenir("utilisateur", utilisateurNom));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.put("/utilisateur", async (req, res) => {
    const utilisateur = {
      id: req.body.id,
      nom: req.body.nom,
      prenom: req.body.prenom,
      filiere: req.body.filiere,
    };
    try {
      res.send(await mettre("utilisateur", utilisateur.id));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.delete("/utilisateur", async (req, res) => {
    const utilisateur = req.body.id;
    try {
      res.send(await supprimer("utilisateur", utilisateur));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });
};
