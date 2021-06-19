const { db } = require("../../configs/firebase");
const { ajout, mettre, obtenir, supprimer } = require("../../configs/dao");

module.exports = function (app) {
  app.post("/réponseE", async (req, res) => {
    const réponseEDATA = {
      id: req.body.id,
      commentaire: req.body.commentaire,
      note: req.body.note,
    };
    try {
      res.send(await ajout("réponseE", réponseEDATA.id, réponseEDATA));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.get("/réponseE/:réponseEID", async (req, res) => {
    const réponseENom = req.params.réponseEID;
    try {
      res.send(await obtenir("réponseE", réponseENom));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.put("/réponseE", async (req, res) => {
    const réponseE = {
      id: req.body.id,

      commentaire: req.body.commentaire,
      note: req.body.note,
    };
    try {
      res.send(await mettre("réponseE", réponseE.id));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.delete("/réponseE", async (req, res) => {
    const réponseE = req.body.id;
    try {
      res.send(await supprimer("réponseE", réponseE));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });
};
