const { db } = require("../../configs/firebase");
const { ajout, mettre, obtenir } = require("../../configs/dao");

module.exports = function (app) {
  app.post("/departement", async (req, res) => {
    const departementDATA = {
      id: req.body.id,
      nomdep: req.body.nomdep,
    };
    res.send(await ajout("departement", departementData.id, departementDATA));
  });
  app.get("/departement/:departementID", async (req, res) => {
    const departementNom = req.params.departementID;
    try {
      const departementDoc = await db
        .collection("departement")
        .doc(departementNom)
        .get();
      if (departementDoc.exists) {
        res.status(200).json(departementDoc.data());
      } else {
        res
          .status(404)
          .send(
            "Error Cant get departement : departement document doesn't exist"
          );
      }
    } catch (error) {
      console.log(" can't get character for this reasons: " + error);
      res.send(" can't get character for this reasons: " + error);
    }
  });

  app.put("/departement", async (req, res) => {
    try {
      const departement = {
        id: req.body.id,
        nomdep: req.body.nomdep,
      };
      await db
        .collection("departement")
        .doc(departement.id)
        .update(departement);
      res.send(departement);
    } catch (err) {
      console.log("Error cant update : " + err);
      res.send(err);
    }
  });
};
