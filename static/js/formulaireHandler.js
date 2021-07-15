var user = {};
var formulaires = [];
var matieres = [];
var niveau = [];
var selectedFormulaireIndex = -1;
const formulaireContainer = document.getElementById("formulaire-container");
const form = document.getElementById("form");
const sumbitFormulaire = document.querySelector("#submitFormulaire");
const t = document.querySelectorAll('div[class="page"]');
const showForm = (formulaireIndex) => {
  //TODO:update form UI
  setForm(formulaireIndex);
  form.style.display = "block";
  formulaireContainer.style.display = "none";
};
const hideForm = (e) => {
  form.style.display = "none";
  formulaireContainer.style.display = "block";
};

/////////////UI handler//////////////////
const setForm = (formulaireIndex) => {
  selectedFormulaireIndex = formulaireIndex;
  document.getElementById("formulaireName").innerText =
    formulaires[formulaireIndex].niveau;
  let matieresContainer = document.getElementById("matieres-container");
  matieresContainer.innerHTML = "";
  for (let i = 0; i < matieres.length; i++) {
    const nomMatiere = matieres[i].nomMatiere;
    const niveauMatiere = matieres[i].niveau;
    const semestreMatiere = matieres[i].semestre;
    const haveTp = matieres[i].tp;
    if (
      niveauMatiere === formulaires[formulaireIndex].niveau &&
      semestreMatiere === formulaires[formulaireIndex].semestre
    ) {
      matieresContainer.innerHTML += `
      <!-- bloc matiere -->
      <span id="${nomMatiere + "-" + i}">
        <label for="matiere"><h4>${
          haveTp ? `Cour:` : ""
        }${nomMatiere}</h4></label><br />
        <div class="radio-container">
          <input type="radio"  name="${nomMatiere}" value="note" />
          <label class="taille" for="note">insuffisant</label>
          <input type="radio"  name="${nomMatiere}" value="note" />
          <label class="taille" for="note">assez bien</label>
          <input type="radio"  name="${nomMatiere}" value="note" />
          <label class="taille" for="note">bien</label>
          <input type="radio"  name="${nomMatiere}" value="note" />
          <label class="taille" for="note">très bien</label>
          <input type="radio"  name="${nomMatiere}" value="note" />
          <label class="taille" for="note">excellent</label><br /><br />
        </div>
        <textarea  name="${nomMatiere}"></textarea><br /><br />
        ${
          haveTp
            ? `
        <label for="matiere"><h4>TP :${nomMatiere}</h4></label><br />
        <div class="radio-container">
          <input type="radio"  name="${nomMatiere}-TP" value="note" />
          <label class="taille" for="note">insuffisant</label>
          <input type="radio"  name="${nomMatiere}-TP" value="note" />
          <label class="taille" for="note">assez bien</label>
          <input type="radio"  name="${nomMatiere}-TP" value="note" />
          <label class="taille" for="note">bien</label>
          <input type="radio"  name="${nomMatiere}-TP" value="note" />
          <label class="taille" for="note">très bien</label>
          <input type="radio"  name="${nomMatiere}-TP" value="note" />
          <label class="taille" for="note">excellent</label><br /><br />
        </div>
        <textarea name="${nomMatiere}-TP"></textarea><br /><br />
        `
            : ""
        }
        </span>`;
    }
  }
};

//////////////// event listener ////////////

firebase.auth().onIdTokenChanged(async (userCred) => {
  if (userCred) {
    user = userCred;
    const idTokenResult = await userCred.getIdTokenResult();
    if (!idTokenResult.claims.etudiant && !idTokenResult.claims.professeur) {
      alert("UNAUTHORIZED");
      console.log("UNAUTHORIZED");
      window.location.pathname = "/";
    }
    const reponse = await fetch("/formulaireValable", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: "Bearer " + (await userCred.getIdToken()),
      },
    });
    if (reponse.ok) {
      const result = await reponse.json();
      formulaires = result.formulaires;
      niveau = result.niveau;
      matieres = result.matieres;
      for (let i = 0; i < formulaires.length; i++) {
        let element = formulaires[i];
        formulaireContainer.innerHTML += `<div class="formulaire" >
        <a href="#" class="animated-button thar-three" onclick="showForm(${i})" id="${element.formulaireId}">
          <div><h2>${element.niveau}</h2></div>
          <div><h2>${element.semestre}</h2></div>
        </a>
        </div>`;
      }
    } else {
      alert(await reponse.text());
    }
  } else {
    alert("UNAUTHINTICATED");
    console.log("UNAUTHINTICATED");
    window.location.pathname = "/signin";
  }
});

/**
 *
 * @param {Event} e
 */
sumbitFormulaire.onclick = async (e) => {
  // sumbitFormulaire.disabled = true;
  e.preventDefault();
  try {
    //getting filiere reponse
    const filiereRadios = document
      .getElementById("filiereRep")
      .querySelectorAll('input[name="noteFiliere"]');
    let i = 0;
    while (i < filiereRadios.length && !filiereRadios[i].checked) {
      i++;
    }
    const filiereNote =
      i !== filiereRadios.length ? filiereRadios[i].value : "";
    const filiereComment = document.querySelector(
      'textarea[name="noteFiliere"]'
    ).value;
    //getting matiere reponse
    let matieresReponse = [];
    let matiersSpan = document
      .getElementById("matieres-container")
      .querySelectorAll("span");
    for (const matiere of matiersSpan) {
      let matiereIndex = Number(matiere.id.split("-")[1]);
      let matiereRadios = matiere.querySelectorAll(
        `input[name="${matieres[matiereIndex].nomMatiere}"]`
      );
      let tpRadios = matiere.querySelectorAll(
        `input[name="${matieres[matiereIndex].nomMatiere}-TP"]`
      );
      let i = 0;
      while (i < matiereRadios.length && !matiereRadios[i].checked) {
        i++;
      }
      if (i !== matiereRadios.length) {
        //push answer
        const commentaire = {
          commentaire: matiere.querySelector(
            `textarea[name="${matieres[matiereIndex].nomMatiere}"]`
          ).value,
          note: matiereRadios[i].value,
          relatedTo: matieres[matiereIndex].nomMatiere,
          sujet: "matiere",
          tp: false,
        };
        matieresReponse.push(commentaire);
      }
      i = 0;
      while (i < tpRadios.length && !tpRadios[i].checked) {
        i++;
      }
      if (i !== tpRadios.length) {
        //push answer
        const commentaire = {
          commentaire: matiere.querySelector(
            `textarea[name="${matieres[matiereIndex].nomMatiere}-TP"]`
          ).value,
          note: tpRadios[i].value,
          relatedTo: matieres[matiereIndex].nomMatiere,
          sujet: "matiere",
          tp: true,
        };
        matieresReponse.push(commentaire);
      }
    }
    if (filiereNote !== "") {
      matieresReponse.push({
        commentaire: filiereComment,
        note: filiereNote,
        relatedTo: formulaires[selectedFormulaireIndex].niveau,
        sujet: "niveau",
      });
    }
    const reponse = await fetch("/reponse", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: "Bearer " + (await user.getIdToken()),
      },
      body: JSON.stringify({
        formulaire: formulaires[selectedFormulaireIndex].formulaireId,
        ecrirePar: user.uid,
        userType: formulaires.length > 1 ? "professeur" : "etudiant",
        commentaires: matieresReponse,
      }),
    });
    if (reponse.ok) {
      alert("your comment have been sumbited succesfuly");
    } else {
      alert(await reponse.text());
    }
  } catch (error) {
    console.log(error);
  }
};
