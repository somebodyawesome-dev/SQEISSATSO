var signupButton = document.getElementById("signupButton");

(async () => {
  signupButton.onclick = async (e) => {
    e.preventDefault();
    const email = document.getElementById("adresseInput").value;

    const rep = await fetch("/etudiant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        email: email,
        niveau: "FIA-02",
      }),
    });
    if (rep.ok) {
      window.alert("allez voir votre email pour avoir votre mot de passe! ");
      window.location.href = "/signin";
    } else {
      alert(await rep.text());
    }
  };
})();
