const { db } = require("../../configs/firebase");
const { ajout, mettre, obtenir, supprimer } = require("../../configs/dao");

module.exports = function (app) {
  app.post("/réponseP", async (req, res) => {
    const réponsePDATA = {
      id: req.body.id,

      commentaire: req.body.commentaire,
      note: req.body.note,
    };
    try {
      res.send(await ajout("réponseP", réponsePDATA.id, réponsePDATA));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.get("/réponseP/:réponsePID", async (req, res) => {
    const réponsePNom = req.params.réponsePID;
    try {
      res.send(await obtenir("réponseP", réponsePNom));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.put("/réponseP", async (req, res) => {
    const réponseP = {
      id: req.body.id,

      commentaire: req.body.commentaire,
      note: req.body.note,
    };
    try {
      res.send(await mettre("réponseP", réponseP.id));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.delete("/réponseP", async (req, res) => {
    const réponseP = req.body.id;
    try {
      res.send(await supprimer("réponseP", réponseP));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });
};
