var etudiant = [];
var professeur = [];
var formulaires = [];
var reponses = [];
var commentaires = [];
var user = {};
var somethinChanged = false;
var updatedFormulaire = [];
var selectedReponse = {};
var selectedIndex = -1;
var reponseValide = [];
var reponseNonValide = [];
const reponseContainer = document.getElementById("reponse-container");
const showComment = document.getElementById("showComment");
showComment.style.display = "none";
const setSomethingChanged = (ele, index) => {
  somethinChanged = true;
  updatedFormulaire.push({ ...formulaires[index], ouvert: ele.checked });
  console.log(updatedFormulaire);
};
const setComment = (i) => {
  const commentaireContainer = document.getElementById("commentaire-container");
  commentaireContainer.innerHTML = "";
  commentaires.forEach((element, index) => {
    if (element.reponse !== reponses[i].id) return;
    commentaireContainer.innerHTML += `<div class="liste
            commentaire">
            <a href=""  id="${
              (element.relatedTo, element.note, element.commentaire)
            }" >
            <div class="a" style="overflow-wrap: break-word">
            <h3 class="title" style=" display: flex,
            flex-direction: row"><span class="b">objectif:</span>${
              element.relatedTo
            }</h3>
            <p class="b">note: ${element.note}/5</p>

            <p class="b">commentaire:
            ${element.commentaire}
              
            </p>
          </div>`;
  });
};
const updateReponse = async () => {
  if (reponseNonValide.length === 0 && reponseValide.length === 0) return;
  const reponse = await fetch("updateReponse", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: "Bearer " + (await user.getIdToken()),
    },
    body: JSON.stringify({ reponseNonValide, reponseValide }),
  });
  if (reponse.ok) {
    alert("Mise à jour est effectué");
  } else {
    alert("Mise à jour non effectué");
  }
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
      <a href="/gererform" class="animated-button thar-three"  id="${
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

    reponses.forEach((element, index) => {
      reponseContainer.innerHTML += `<div class="liste
              reponse">
              <a href="#" class="animated-button thar-three" onclick="showComments(${index},this)" id="${element.id}">
              <div><h2>${element.id}</h2></div>
            
              </a
              </div>`;
    });
  } else {
    console.log("logged out");
  }
});
const showComments = (index, ele) => {
  selectedReponse = ele;
  selectedIndex = index;
  setComment(index);
  showComment.style.display = "block";
  reponseContainer.style.display = "none";
};
const hideComments = () => {
  showComment.style.display = "none";
  reponseContainer.style.display = "block";
  reponseValide = reponseValide.filter((element) => {
    return element !== reponses[selectedIndex].id;
  });
  reponseNonValide = reponseNonValide.filter((element) => {
    return element !== reponses[selectedIndex].id;
  });
  selectedReponse.style.backgroundColor = "#FFFFFF";

  console.log(reponseValide);
};
const red = () => {
  reponseValide = reponseValide.filter((element) => {
    return element !== reponses[selectedIndex].id;
  });
  reponseNonValide = reponseNonValide.filter((element) => {
    return element !== reponses[selectedIndex].id;
  });
  showComment.style.display = "none";
  reponseContainer.style.display = "block";
  selectedReponse.style.backgroundColor = "#FF0000";
  reponseNonValide.push(reponses[selectedIndex].id);
  console.log(reponseNonValide);
};
const green = () => {
  reponseValide = reponseValide.filter((element) => {
    return element !== reponses[selectedIndex].id;
  });
  reponseNonValide = reponseNonValide.filter((element) => {
    return element !== reponses[selectedIndex].id;
  });
  showComment.style.display = "none";
  reponseContainer.style.display = "block";
  selectedReponse.style.backgroundColor = "#008000";
  reponseValide.push(reponses[selectedIndex].id);
};
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
      commentaires = data.commentaires;
      console.log(reponses);
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
