var user = {};
const listeContainer = document.getElementById("liste-container");
const t = [...document.getElementsByClassName("page")];

t[0].style.display = "block";
t[1].style.display = "none";
t[2].style.display = "none";
const UIcontroller = (index) => {
  for (let i = 0; i < t.length; i++) {
    t[i].style.display = i === index ? "block" : "none";
  }
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
        listeContainer.innerHTML += `<div class="liste
        formulaire">
        <a href="/gererform" class="animated-button thar-three" id="${element.id}">
        <div><h2>${element.formulaireId}</h2></div>
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
