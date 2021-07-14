const { admin } = require("../configs/firebase");
const {
  ajoutFormulaire,
  getFormulaire,
  getForumulaireByNiveau,
  getAllForumulaire,
} = require("../controller/formulaire.controller");
const { getMatiereByNiveau } = require("../controller/matiere.controller");
const { getNiveauByUser } = require("../controller/niveau.controller");
const { formulaireConverter } = require("../models/Formulaire/Formulaire");
const { matiereConverter } = require("../models/Matiere/Matiere");
const { niveauConverter } = require("../models/Niveau/Niveau");
const { checkIfAuthenticated } = require("./auth/authentication");
const {
  checkIfProfesseurOrEtudiant,
  checkIfAdmin,
} = require("./auth/authorization");

/**
 *
 * @param {import('express').Application} app
 */
module.exports = (app) => {
  app.post("/formulaire", ajoutFormulaire);
  app.get("/formulaire", getFormulaire);
  app.get(
    "/formulaireValable",
    checkIfAuthenticated,
    checkIfProfesseurOrEtudiant,
    getNiveauByUser,
    getMatiereByNiveau,
    getForumulaireByNiveau,
    async (req, res) => {
      try {
        var matieres = [];
        const matieresRef = req.matieres;
        for (var i = 0; i < matieresRef.length; i++) {
          matieres.push(
            (await matieresRef[i].withConverter(matiereConverter).get()).data()
          );
        }

        var niveau = [];
        const niveauRef = req.niveau;
        for (var i = 0; i < niveauRef.length; i++) {
          niveau.push(
            (await niveauRef[i].withConverter(niveauConverter).get()).data()
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

        res.status(200).json({
          formulaires,
          niveau,
          matieres,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send(error);
      }
    }
  );
  app.get(
    "/getAllFormulaire",
    checkIfAuthenticated,
    checkIfAdmin,
    getAllForumulaire,
    async (req, res) => {
      try {
        var formulaires = [];
        const formulairesRef = req.formulaires;
        for (var i = 0; i < formulairesRef.length; i++) {
          formulaires.push(
            (
              await formulairesRef[i].withConverter(formulaireConverter).get()
            ).data()
          );
        }

        res.status(200).json({
          formulaires,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send(error);
      }
    }
  );
};
