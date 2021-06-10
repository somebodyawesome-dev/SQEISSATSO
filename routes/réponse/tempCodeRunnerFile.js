const { db } = require("../../configs/firebase");
const { ajout, mettre, obtenir, supprimer } = require("../../configs/dao");

module.exports = function (app) {
  app.post("/réponseP", async (req, res) => {
    const réponsePDATA = {
      id: req.body.id,

      filiere: req.body.filiere,
      dep: db.collection("réponseP").doc(req.body.dep),
    };
    res.send(await ajout("réponseP", réponsePDATA.id, réponsePDATA));
  });

  app.get("/réponseP/:réponsePID", async (req, res) => {
    const réponsePNom = req.params.réponsePID;
    res.send(await obtenir("réponseP", réponsePNom));
  });

  app.put("/réponseP", async (req, res) => {
    const réponseP = {
      id: req.body.id,

      filiere: req.body.filiere,
    };
    res.send(await mettre("réponseP", réponseP.id));
  });

  app.delete("/réponseP", async (req, res) => {
    const réponseP = req.body.id;
    res.send(await supprimer("réponseP", réponseP));
  });
};
