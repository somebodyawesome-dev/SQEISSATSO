const { ajoutAdmin, getAdmin } = require("../controller/admin.controller");
const { getAllProfesseur } = require("../controller/professeur.controller");
const { getAllEtudiant } = require("../controller/Etudiant.controller");
const { getAllFormulaire } = require("../controller/formulaire.controller");
const { getAllReponseNonValide } = require("../controller/reponse.controller");
const { getAllCommentaire } = require("../controller/commentaire.controller");

const { checkIfAuthenticated } = require("./auth/authentication");
const { checkIfAdmin } = require("./auth/authorization");
const { etudiantConverter } = require("../models/Utilisateur/Etudiant");
const { formulaireConverter } = require("../models/Formulaire/Formulaire");
const { reponseConverter } = require("../models/Reponse/Reponse");
const { commentaireConverter } = require("../models/Reponse/commentaire");
const { request, query } = require("express");
const { admin } = require("../configs/firebase");

/**
 *
 * @param {import('express').Application} app
 */
module.exports = (app) => {
  app.post("/admin", ajoutAdmin);
  app.get("/admin", getAdmin);
  app.post(
    "/updateReponse",
    checkIfAuthenticated,
    checkIfAdmin,
    async (req, res) => {
      const valideR = req.body.reponseValide;
      const nValideR = req.body.reponseNonValide;
      try {
        const batch = admin.firestore().batch();
        for (const resp of valideR) {
          batch.update(admin.firestore().collection("reponse").doc(resp), {
            isValide: true,
          });
        }
        for (const resp of nValideR) {
          const respRef = admin.firestore().collection("reponse").doc(resp);
          const querySnapchot = await admin
            .firestore()
            .collection("commentaire")
            .where("reponse", "==", respRef)
            .get();
          for (const doc of querySnapchot.docs) {
            console.log("tfasa5");
            batch.delete(doc.ref);
          }

          batch.delete(respRef);
        }
        await batch.commit();
        res.status(200).send("reponse updated");
      } catch (error) {
        res.status(500).send(error);
        console.log(error);
      }
    }
  );

  app.get(
    "/getDataForAdmin",
    checkIfAuthenticated,
    checkIfAdmin,
    getAllProfesseur,
    getAllEtudiant,
    getAllFormulaire,
    getAllReponseNonValide,
    getAllCommentaire,
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

        var commentaires = [];
        const commentairesRef = req.commentaires;
        for (var i = 0; i < commentairesRef.length; i++) {
          commentaires.push(
            (
              await commentairesRef[i].withConverter(commentaireConverter).get()
            ).data()
          );
        }
        res.status(200).json({
          formulaires,
          etudiant,
          professeurs,
          reponses,
          commentaires,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send(error);
      }
    }
  );
};
