var user = {};
var reponses = [];
const reponseContainer = document.getElementById("reponse-container");
const sumbitreponse = document.querySelector("#submitreponse");

firebase.auth().onIdTokenChanged(async (userCred) => {
  if (userCred) {
    user = userCred;
    const idTokenResult = await userCred.getIdTokenResult();
    if (!idTokenResult.claims.etudiant && !idTokenResult.claims.professeur) {
      alert("UNAUTHORIZED");
      console.log("UNAUTHORIZED");
      window.location.pathname = "/";
    }
    const reponse = await fetch("/reponseValable", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: "Bearer " + (await userCred.getIdToken()),
      },
    });
    if (reponse.ok) {
      const result = await reponse.json();
      reponses = result.reponses;
      for (let i = 0; i < reponses.length; i++) {
        let element = reponses[i];
        reponseContainer.innerHTML += `<div class="reponse" >
        <a href="#" class="animated-button thar-three" onclick="showForm(${i})" id="${element.id}">
          <div><h2>${element.id}</h2></div>
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
 

