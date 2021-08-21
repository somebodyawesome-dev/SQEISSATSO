const { getAllCommentaire } = require("../controller/commentaire.controller");
const { getAllFormulaire } = require("../controller/formulaire.controller");
const { getAllNiveau } = require("../controller/niveau.controller");
const { getAllReponseValide } = require("../controller/reponse.controller");
const { formulaireConverter } = require("../models/Formulaire/Formulaire");
const { niveauConverter } = require("../models/Niveau/Niveau");
const { commentaireConverter } = require("../models/Reponse/commentaire");
const { reponseConverter } = require("../models/Reponse/Reponse");

/**
 *
 * @param {import('express').Application} app
 */
module.exports = (app) => {
  app.get(
    "/getValideResponses",
    getAllFormulaire,
    getAllNiveau,
    getAllReponseValide,
    getAllCommentaire,
    async (req, res) => {
      try {
        let reponses = [];
        const reponsesRef = req.reponses;
        for (var i = 0; i < reponsesRef.length; i++) {
          reponses.push(
            (await reponsesRef[i].withConverter(reponseConverter).get()).data()
          );
        }

        let commentaires = [];
        const commentairesRef = req.commentaires;
        for (var i = 0; i < commentairesRef.length; i++) {
          commentaires.push(
            (
              await commentairesRef[i].withConverter(commentaireConverter).get()
            ).data()
          );
        }
        let niveau = [];
        const niveauRef = req.niveau;
        for (var i = 0; i < niveauRef.length; i++) {
          niveau.push(
            (await niveauRef[i].withConverter(niveauConverter).get()).data()
          );
        }
        let formulaires = [];
        const formulaireRef = req.formulaires;
        for (var i = 0; i < formulaireRef.length; i++) {
          formulaires.push(
            (
              await formulaireRef[i].withConverter(formulaireConverter).get()
            ).data()
          );
        }
        res.status(200).json({ niveau, reponses, commentaires, formulaires });
      } catch (error) {
        res.status(500).send(error);
        console.log(error);
      }
    }
  );
};
