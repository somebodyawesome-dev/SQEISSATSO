var user = {};
const formulaireContainer = document.getElementById("formulaire-container");
const form = document.getElementById("form");

const showForm = (e) => {
  //TODO:update form UI
  form.style.display = "block";
  formulaireContainer.style.display = "none";
};
const hideForm = (e) => {
  form.style.display = "none";
  formulaireContainer.style.display = "block";
};
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
      const { formulaires } = await reponse.json();
      formulaires.forEach((element) => {
        formulaireContainer.innerHTML += `<div class="formulaire">
        <a href="#" class="animated-button thar-three" onclick="showForm()" id="${element.formulaireId}">
          <div><h2>${element.niveau}</h2></div>
          <div><h2>${element.semestre}</h2></div>
        </a>
        </div>`;
      });
    } else {
      alert(await reponse.text());
    }
  } else {
    console.log("logged out");
  }
});
