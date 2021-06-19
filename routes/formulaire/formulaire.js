const { db } = require("../../configs/firebase");
const {
  ajout,
  mettre,
  obtenir,
  supprimer,
  ajoutAvecCleAleatoire,
} = require("../../configs/dao");

module.exports = function (app) {
  app.post("/formulaire", async (req, res) => {
    const formulaireEDATA = {
      question: req.body.question,
      semestre: db.collection("semestre").doc(req.body.semestre),
      niveau: db.collection("niveau").doc(req.body.niveau),
    };

    try {
      res.send(await ajoutAvecCleAleatoire("formulaireE", formulaireEDATA));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });

  // app.get("/formulaire/:formulaireEID", async (req, res) => {
  //   const formulaireENom = req.params.formulaireEID;
  //   try {
  //     res.send(await obtenir("formulaireE", formulaireENom));
  //   } catch (err) {
  //     console.log(err.message);
  //     res.send(err.message);
  //   }
  // });

  // app.put("/formulaire", async (req, res) => {
  //   const formulaireE = {
  //     num: req.body.num,

  //     question: req.body.question,
  //   };
  //   try {
  //     res.send(await mettre("formulaire", formulaireE.num));
  //   } catch (err) {
  //     console.log(err.message);
  //     res.send(err.message);
  //   }
  // });

  // app.delete("/formulaire", async (req, res) => {
  //   const formulaireE = req.body.num;
  //   try {
  //     res.send(await supprimer("formulaire", formulaireE));
  //   } catch (err) {
  //     console.log(err.message);
  //     res.send(err.message);
  //   }
  // });
};
