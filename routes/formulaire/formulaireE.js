const { db } = require("../../configs/firebase");
const { ajout, mettre, obtenir, supprimer } = require("../../configs/dao");

module.exports = function (app) {
  app.post("/formulaireE", async (req, res) => {
    const formulaireEDATA = {
      id: req.body.id,

      filiere: req.body.filiere,
      dep: db.collection("formulaireE").doc(req.body.dep),
    };
    try {
      res.send(await ajout("formulaireE", formulaireEDATA.id, formulaireEDATA));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.get("/formulaireE/:formulaireEID", async (req, res) => {
    const formulaireENom = req.params.utilisateurID;
    try {
      res.send(await obtenir("formulaireE", formulaireENom));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.put("/formulaireE", async (req, res) => {
    const formulaireE = {
      id: req.body.id,

      filiere: req.body.filiere,
    };
    try {
      res.send(await mettre("formulaireE", formulaireE.id));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.delete("/formulaireE", async (req, res) => {
    const formulaireE = req.body.id;
    try {
      res.send(await supprimer("formulaireE", formulaireE));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });
};
