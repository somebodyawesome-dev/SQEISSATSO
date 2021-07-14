var user = {};
var formulaires = {};
var matieres = {};
var niveau = {};
const formulaireContainer = document.getElementById("formulaire-container");
const form = document.getElementById("form");
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
      <span>
        <label for="matiere"><h4>${
          haveTp ? `Cour:` : ""
        }${nomMatiere}</h4></label><br />
        <div class="radio-container">
          <input type="radio" id="i" name="${nomMatiere}" value="note" />
          <label class="taille" for="note">insuffisant</label>
          <input type="radio" id="ab" name="${nomMatiere}" value="note" />
          <label class="taille" for="note">assez bien</label>
          <input type="radio" id="b" name="${nomMatiere}" value="note" />
          <label class="taille" for="note">bien</label>
          <input type="radio" id="tb" name="${nomMatiere}" value="note" />
          <label class="taille" for="note">très bien</label>
          <input type="radio" id="ex" name="${nomMatiere}" value="note" />
          <label class="taille" for="note">excellent</label><br /><br />
        </div>
        <textarea id="comment" name="${nomMatiere}"></textarea><br /><br />
        ${
          haveTp
            ? `
        <label for="matiere"><h4>TP :${nomMatiere}</h4></label><br />
        <div class="radio-container">
          <input type="radio" id="i" name="${nomMatiere}" value="note" />
          <label class="taille" for="note">insuffisant</label>
          <input type="radio" id="ab" name="${nomMatiere}" value="note" />
          <label class="taille" for="note">assez bien</label>
          <input type="radio" id="b" name="${nomMatiere}" value="note" />
          <label class="taille" for="note">bien</label>
          <input type="radio" id="tb" name="${nomMatiere}" value="note" />
          <label class="taille" for="note">très bien</label>
          <input type="radio" id="ex" name="${nomMatiere}" value="note" />
          <label class="taille" for="note">excellent</label><br /><br />
        </div>
        <textarea id="comment" name="${nomMatiere}"></textarea><br /><br />
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
    console.log("logged out");
  }
});
