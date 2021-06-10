const { db } = require("../../configs/firebase");
const { ajout, mettre, obtenir, supprimer } = require("../../configs/dao");

module.exports = function (app) {
  app.post("/matériel", async (req, res) => {
    const matérielDATA = {
      id: req.body.id,

      filiere: req.body.filiere,
      dep: db.collection("matériel").doc(req.body.dep),
    };
    try {
      res.send(await ajout("matériel", matérielDATA.id, matérielDATA));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.get("/matériel/:matérielID", async (req, res) => {
    const matérielNom = req.params.matérielID;
    try {
      res.send(await obtenir("matériel", matérielNom));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.put("/matériel", async (req, res) => {
    const matériel = {
      id: req.body.id,

      filiere: req.body.filiere,
    };
    try {
      res.send(await mettre("matériel", matériel.id));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.delete("/matériel", async (req, res) => {
    const matériel = req.body.id;
    try {
      res.send(await supprimer("matériel", matériel));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });
};
