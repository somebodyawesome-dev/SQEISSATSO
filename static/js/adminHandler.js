var etudiant = [];
var professeur = [];
var formulaires = [];
var reponses = [];
var user = {};
var somethinChanged = false;
var updatedFormulaire = [];
const setSomethingChanged = (ele, index) => {
  somethinChanged = true;
  updatedFormulaire.push({ ...formulaires[index], ouvert: ele.checked });
  console.log(updatedFormulaire);
};
const updateFormulaire = async () => {
  if (somethinChanged) {
    const reponse = await fetch("/updateFormulaire", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: "Bearer " + (await user.getIdToken()),
      },
      body: JSON.stringify({ updatedFormulaire }),
    });
    if (reponse.ok) {
      alert("done");
    } else {
      alert("non");
    }
  }
};
const abondonnerFormulaire = async () => {
  somethinChanged = false;
  updatedFormulaire = [];
  const listeContainer = document.getElementById("liste-container");
  listeContainer.innerHTML = "";
  formulaires.forEach((element, index) => {
    listeContainer.innerHTML += `<div class="liste
      formulaire">
      <a href="/gererform" class="animated-button thar-three" id="${
        element.id
      }">
      <div><h2>${element.formulaireId}</h2></div>
   
      <div>
      <label class="switch">
  <input type="checkbox" ${
    element.ouvert ? "checked" : ""
  } onchange="setSomethingChanged(this,${index})">
  <span class="slider round"></span>
 </label>
 </div>
      </a>
      </div>`;
  });
};
firebase.auth().onIdTokenChanged(async (userCred) => {
  if (userCred) {
    user = userCred;
    await initAdmin();
    const listeContainer = document.getElementById("liste-container");

    formulaires.forEach((element, index) => {
      listeContainer.innerHTML += `<div class="liste
      formulaire">
      <a href="/gererform" class="animated-button thar-three" id="${
        element.id
      }">
      <div><h2>${element.formulaireId}</h2></div>
   
      <div>
      <label class="switch">
  <input type="checkbox" ${
    element.ouvert ? "checked" : ""
  } onchange="setSomethingChanged(this,${index})">
  <span class="slider round"></span>
  </label>
 </div>
      </a>
      </div>`;
    });
    const reponseContainer = document.getElementById("reponse-container");

    reponses.forEach((element, index) => {
      reponseContainer.innerHTML += `<div class="liste
              reponse">
              <a href="" class="animated-button thar-three" id="${element.id}">
              <div><h2>${element.id}</h2></div>
            
              </a
              </div>`;
    });
  } else {
    console.log("logged out");
  }
});

const initAdmin = async () => {
  try {
    const reponse = await fetch("/getDataForAdmin", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: "Bearer " + (await user.getIdToken()),
      },
    });
    if (reponse.ok) {
      const data = await reponse.json();
      etudiant = data.etudiant;
      professeur = data.professeurs;
      formulaires = data.formulaires;
      reponses = data.reponses;
      document.getElementById("nbUser").innerHTML =
        etudiant.length + professeur.length;
      document.getElementById("nbReponse").innerHTML = reponses.length;
    } else {
      console.log(await reponse.text());
    }
  } catch (error) {
    console.log(error);
  }
};
