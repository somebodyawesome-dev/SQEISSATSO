var user = {};
const listeRContainer = document.getElementById("listeR-container");
firebase.auth().onIdTokenChanged(async (userCred) => {
  if (userCred) {
    user = userCred;
    const reponse = await fetch("/Reponse", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: "Bearer " + (await userCred.getIdToken()),
      },
    });
    if (reponse.ok) {
      const { reponses } = await reponse.json();
      reponses.forEach((element) => {
        listeRContainer.innerHTML += `<div class="liste
          reponse">
          <a href="" class="animated-button thar-three" id="${element.id}">
          <div><h2>${element.id}</h2></div>
        
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
firebase.auth().onIdTokenChanged(async (userCred) => {
  if (userCred) {
    user = userCred;
    const reponse = await fetch("/Reponse", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: "Bearer " + (await userCred.getIdToken()),
      },
    });
    if (reponse.ok) {
      const { reponses } = await reponse.json();
      reponses.forEach((element) => {
        listeContainer.innerHTML += `<div class="liste
        reponse">
        <a href="/Greponse" class="animated-button thar-three" id="${element.id}">
        <div><h2>${element.id}</h2></div>
          <div><h2>${element.ecritePar}</h2></div>
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
