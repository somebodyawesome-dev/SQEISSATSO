const { db } = require("../../configs/firebase");
const { ajout, mettre, obtenir, supprimer } = require("../../configs/dao");

module.exports = function (app) {
  app.post("/departement", async (req, res) => {
    const departementDATA = {
      id: req.body.id,
      nomdep: req.body.nomdep,
    };
    try {
      res.send(await ajout("departement", departementDATA.id, departementDATA));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });
  app.get("/departement/:departementID", async (req, res) => {
    const departementNom = req.params.departementID;
    try {
      res.send(await obtenir("departement", departementNom));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.put("/departement", async (req, res) => {
    const departement = {
      id: req.body.id,
      nomdep: req.body.nomdep,
    };
    try {
      res.send(await mettre("departement", departement.id, departement));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  app.delete("/departement", async (req, res) => {
    const departement = req.body.id;
    try {
      res.send(await supprimer("departement", departement));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });
};
