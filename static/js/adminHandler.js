var etudiant = [];
var professeur = [];
var formulaires = [];
var reponses = [];
var user = {};
firebase.auth().onIdTokenChanged(async (userCred) => {
  if (userCred) {
    user = userCred;
    await initAdmin();
  } else {
    console.log("logged out");
  }
});
const initAdmin = async () => {
  try {
    console.log("zertyui");
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
