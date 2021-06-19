const { db } = require("../../configs/firebase");
const { ajout, mettre, obtenir, supprimer } = require("../../configs/dao");

module.exports = function (app) {
  app.post("/professeur", async (req, res) => {
    const utilisateurDATA = {
      id: req.body.id,
      nom: req.body.nom,
      prenom: req.body.prenom,
      adress: req.body.adress,
      mdp: req.body.mdp,
    };
    try {
      await ajout("utilisateur", utilisateurDATA.id, utilisateurDATA);
      res.send(await ajout("professeur", professeurDATA.id, professeurDATA));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.get("/professeur/:professeurID", async (req, res) => {
    const professeurNom = req.params.professeurID;
    try {
      res.send(await obtenir("professeur", professeurNom));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.put("/professeur", async (req, res) => {
    const professeur = {
      id: req.body.id,
      nom: req.body.nom,
      prenom: req.body.prenom,
      adress: req.body.adress,
      mdp: req.body.mdp,
    };
    try {
      res.send(await mettre("professeur", professeur.id));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.delete("/professeur", async (req, res) => {
    const professeur = req.body.id;
    try {
      res.send(await supprimer("professeur", professeur));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });
};
