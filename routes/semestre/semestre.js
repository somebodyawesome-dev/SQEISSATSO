const { db } = require("../../configs/firebase");
const { ajout, mettre, obtenir, supprimer } = require("../../configs/dao");

module.exports = function (app) {
  app.post("/semestre", async (req, res) => {
    const réponsePDATA = {
      id: req.body.id,

      filiere: req.body.filiere,
      dep: db.collection("semestre").doc(req.body.dep),
    };
    try {
      res.send(await ajout("semestre", matireDATA.id, semestreDATA));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.get("/semestre/:réponsePID", async (req, res) => {
    const réponsePNom = req.params.semestreID;
    try {
      res.send(await obtenir("semestre", semestreNom));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.put("/semestre", async (req, res) => {
    const semestre = {
      id: req.body.id,

      filiere: req.body.filiere,
    };
    try {
      res.send(await mettre("semestre", semestre.id));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.delete("/semestre", async (req, res) => {
    const semestre = req.body.id;
    try {
      res.send(await supprimer("semestre", semestre));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });
};
