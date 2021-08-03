const {
  ajoutProfesseur,
  getProfesseur,
  getAllProfesseur,
} = require("../controller/professeur.controller");

/**
 *
 * @param {import('express').Application} app
 */
module.exports = (app) => {
  app.post("/professeur", ajoutProfesseur);
  app.get("/professeur", getProfesseur);

  app.get(
    "/professeur",

    getAllProfesseur,
    async (req, res) => {
      try {
        var professeurs = [];
        const professeursRef = req.professeurs;
        for (var i = 0; i < professeursRef.length; i++) {
          professeurs.push((await professeursRef[i].get()).data());
        }

        res.status(200).json({
          professeurs,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send(error);
      }
    }
  );
};
