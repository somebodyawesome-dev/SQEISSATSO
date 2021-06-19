const { db } = require("../../configs/firebase");
const { ajout, mettre, obtenir, supprimer } = require("../../configs/dao");

module.exports = function (app) {
  app.post("/formulaireP", async (req, res) => {
    const formulairePDATA = {
      num: req.body.num,
      question: req.body.question,
    };
    try {
      res.send(
        await ajout("formulaireP", formulairePDATA.num, formulairePDATA)
      );
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.get("/formulaireP/:formulairePID", async (req, res) => {
    const formulairePNom = req.params.formulairePID;
    try {
      res.send(await obtenir("formulaireP", formulairePNom));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.put("/formulaireP", async (req, res) => {
    const formulaireP = {
      num: req.body.num,

      question: req.body.question,
    };
    try {
      res.send(await mettre("formulaireP", formulaireE.num));
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
