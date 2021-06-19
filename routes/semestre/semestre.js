const { db } = require("../../configs/firebase");
const { ajout, mettre, obtenir, supprimer } = require("../../configs/dao");

module.exports = function (app) {
  app.post("/semestre", async (req, res) => {
    const réponsePDATA = {
      semestre: req.body.semestre,
    };
    try {
      res.send(await ajout("semestre", matireDATA.semestre, semestreDATA));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.get("/semestre/:semestrePID", async (req, res) => {
    const semestre = req.params.semestre;
    try {
      res.send(await obtenir("semestre", semestre));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.put("/semestre", async (req, res) => {
    const semestre = {
      semestre: req.body.semestre,
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
