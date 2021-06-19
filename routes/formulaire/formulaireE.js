const { db } = require("../../configs/firebase");
const { ajout, mettre, obtenir, supprimer } = require("../../configs/dao");

module.exports = function (app) {
  app.post("/formulaireE", async (req, res) => {
    const formulaireEDATA = {
      question: req.body.question,
      semestre: db.collection("semestre").doc(req.body.semestre),
    };

    try {
      res.send(
        await ajout("formulaireE", formulaireEDATA.num, formulaireEDATA)
      );
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.get("/formulaireE/:formulaireEID", async (req, res) => {
    const formulaireENom = req.params.formulaireEID;
    try {
      res.send(await obtenir("formulaireE", formulaireENom));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.put("/formulaireE", async (req, res) => {
    const formulaireE = {
      num: req.body.num,

      question: req.body.question,
    };
    try {
      res.send(await mettre("formulaireE", formulaireE.num));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.delete("/formulaireE", async (req, res) => {
    const formulaireE = req.body.num;
    try {
      res.send(await supprimer("formulaireE", formulaireE));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });
};
