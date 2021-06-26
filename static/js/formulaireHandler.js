var user = {};
const formulaireContainer = document.getElementById("formulaire-container");
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
        console.log(element.niveau);
        formulaireContainer.innerHTML += `<div class="formulaire">
        <a href="" class="animated-button thar-three" id="${element.formulaireId}">
          <div><h2>${element.niveau}</h2></div>
          <div><h2>${element.semestre}</h2></div>
        </a>
        </div>`;
      });
    } else {
      console.log(await reponse.text());
    }
  } else {
    console.log("logged out");
  }
});
