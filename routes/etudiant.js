const {
  ajoutEtudiant,
  getEtudiant,
  getAllEtudiant,
} = require("../controller/etudiant.controller");

/**
 *
 * @param {import('express').Application} app
 */
module.exports = (app) => {
  app.post("/etudiant", ajoutEtudiant);
  app.get("/etudiant", getEtudiant);

  app.get(
    "/etudiant",

    getAllEtudiant,
    async (req, res) => {
      try {
        var etudiants = [];
        const etudiantsRef = req.etudiants;
        for (var i = 0; i < etudiantsRef.length; i++) {
          etudiants.push(
            (
              await etudiantsRef[i].withConverter(etudiantConverter).get()
            ).data()
          );
        }

        res.status(200).json({
          etudiants,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send(error);
      }
    }
  );
};
