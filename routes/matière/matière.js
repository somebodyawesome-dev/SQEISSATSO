const { db } = require("../../configs/firebase");
const { ajout, mettre, obtenir, supprimer } = require("../../configs/dao");

module.exports = function (app) {
  app.post("/matière", async (req, res) => {
    const réponsePDATA = {
      id: req.body.id,

      filiere: req.body.filiere,
      dep: db.collection("matière").doc(req.body.dep),
    };
    try {
      res.send(await ajout("matière", matireDATA.id, matièreDATA));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.get("/matière/:réponsePID", async (req, res) => {
    const réponsePNom = req.params.matièreID;
    try {
      res.send(await obtenir("matière", matièreNom));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.put("/matière", async (req, res) => {
    const matière = {
      id: req.body.id,

      filiere: req.body.filiere,
    };
    try {
      res.send(await mettre("matière", matière.id));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.delete("/matière", async (req, res) => {
    const matière = req.body.id;
    try {
      res.send(await supprimer("matière", matière));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });
};
