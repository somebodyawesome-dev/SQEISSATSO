const { ajoutAdmin, getAdmin } = require("../controller/admin.controller");
const { getAllProfesseur } = require("../controller/professeur.controller");
const { getAllEtudiant } = require("../controller/Etudiant.controller");
const { getAllFormulaire } = require("../controller/formulaire.controller");
const { getAllReponse } = require("../controller/reponse.controller");

const { checkIfAuthenticated } = require("./auth/authentication");
const { checkIfAdmin } = require("./auth/authorization");
const { etudiantConverter } = require("../models/Utilisateur/Etudiant");
const { formulaireConverter } = require("../models/Formulaire/Formulaire");
const { reponseConverter } = require("../models/Reponse/Reponse");

/**
 *
 * @param {import('express').Application} app
 */
module.exports = (app) => {
  app.post("/admin", ajoutAdmin);
  app.get("/admin", getAdmin);
  app.get(
    "/getDataForAdmin",
    getAllProfesseur,
    getAllEtudiant,
    getAllFormulaire,
    getAllReponse,
    async (req, res) => {
      console.log("zertyuio");
      try {
        var professeurs = [];
        const professeursRef = req.professeurs;
        for (var i = 0; i < professeursRef.length; i++) {
          professeurs.push((await professeursRef[i].get()).data());
        }

        var etudiant = [];
        const etudiantRef = req.etudiants;
        for (var i = 0; i < etudiantRef.length; i++) {
          etudiant.push(
            (await etudiantRef[i].withConverter(etudiantConverter).get()).data()
          );
        }

        var formulaires = [];
        const formulairesRef = req.formulaires;
        for (var i = 0; i < formulairesRef.length; i++) {
          formulaires.push(
            (
              await formulairesRef[i].withConverter(formulaireConverter).get()
            ).data()
          );
        }
        var reponses = [];
        const reponsesRef = req.reponses;
        for (var i = 0; i < reponsesRef.length; i++) {
          reponses.push(
            (await reponsesRef[i].withConverter(reponseConverter).get()).data()
          );
        }
        res.status(200).json({
          formulaires,
          etudiant,
          professeurs,
          reponses,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send(error);
      }
    }
  );
};
