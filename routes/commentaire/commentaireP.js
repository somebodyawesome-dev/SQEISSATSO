const { db } = require("../../configs/firebase");
const { ajout, mettre, obtenir, supprimer } = require("../../configs/dao");

module.exports = function (app) {
  app.post("/commentaireP", async (req, res) => {
    const commentairePDATA = {
      commentaireP: req.body.commentaireP,
    };
    try {
      res.send(
        await ajout(
          "commentaireP",
          commentairePc.commentaireP,
          commentairePDATA
        )
      );
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });
  app.get("/commentaireP/:commentairePID", async (req, res) => {
    const commentairePNom = req.params.commentairePID;
    try {
      res.send(await obtenir("commentaireP", commentairePNom));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.put("/commentaireP", async (req, res) => {
    const commentaireP = {
      commentaireP: req.body.commentaireP,
    };
    try {
      res.send(
        await mettre("commentaireP", commentaireP.commentaireP, commentaireP)
      );
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.delete("/commentaireP", async (req, res) => {
    const commentaireP = req.body.commentaireP;
    try {
      res.send(await supprimer("commentaireP", commentaireP));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });
};
