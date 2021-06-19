const { db } = require("../../configs/firebase");
const { ajout, mettre, obtenir, supprimer } = require("../../configs/dao");

module.exports = function (app) {
  app.post("/commentaireE", async (req, res) => {
    const commentaireEDATA = {
      commentaireE: req.body.commentaireE,
    };
    try {
      res.send(
        await ajout(
          "commentaireE",
          commentaireEc.commentaireE,
          commentaireEDATA
        )
      );
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });
  app.get("/commentaireE/:commentaireEID", async (req, res) => {
    const commentaireENom = req.params.commentaireEID;
    try {
      res.send(await obtenir("commentaireE", commentaireENom));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.put("/commentaireE", async (req, res) => {
    const commentaireE = {
      commentaireE: req.body.commentaireE,
    };
    try {
      res.send(
        await mettre("commentaireE", commentaireE.commentaireE, commentaireE)
      );
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.delete("/commentaireE", async (req, res) => {
    const commentaireE = req.body.commentaireE;
    try {
      res.send(await supprimer("commentaireE", commentaireE));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });
};
