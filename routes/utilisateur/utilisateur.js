const { db } = require("../../configs/firebase");

module.exports = function (app) {
  app.post("/utilisateur", async (req, res) => {
    await db
      .collection("utilisateur")
      .doc("wejden")
      .set({ nom: "wejden", prenom: "hasni" })
      .catch((err) => {
        console.log(err.message);
        res.send(err);
      });
    res.send("utilisateur est ajoute");
  });
};
