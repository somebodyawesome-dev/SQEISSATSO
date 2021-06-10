const { db } = require("../../configs/firebase");
const { ajout, mettre, obtenir, supprimer } = require("../../configs/dao");

module.exports = function (app) {
  app.post("/formulaireP", async (req, res) => {
    const formulairePDATA = {
      id: req.body.id,
      filiere: req.body.filiere,
      dep: db.collection("formulaireP").doc(req.body.dep),
    };
    try {
      res.send(await ajout("formulaireP", formulairePDATA.id, formulairePDATA));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.get("/formulaireP/:formulairePID", async (req, res) => {
    const formulairePNom = req.params.utilisateurID;
    try {
      res.send(await obtenir("formulaireP", formulairePNom));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.put("/formulaireP", async (req, res) => {
    const formulaireP = {
      id: req.body.id,

      filiere: req.body.filiere,
    };
    try {
      res.send(await mettre("formulaireP", formulaireE.id));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.delete("/formulaireP", async (req, res) => {
    const formulaireP = req.body.id;
    try {
      res.send(await supprimer("formulaireP", formulaireP));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });
};
