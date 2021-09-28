const loginContainer = document.getElementById("login-container");

firebase.auth().onIdTokenChanged(async (user) => {
  if (user) {
    const idTokenResult = await user.getIdTokenResult();
    if (
      !idTokenResult.claims.etudiant &&
      !idTokenResult.claims.professeur &&
      !idTokenResult.claims.admin
    ) {
      alert("UNAUTHORIZED");
      console.log("UNAUTHORIZED");
      window.location.pathname = "/";
    }
    loginContainer.innerHTML = `<li>
      <div class="dropdown">
        <span>Menu</span>
        <div class="dropdown-content">
        ${
          idTokenResult.claims.admin
            ? `<a href="/admin">panneau d'admin </a>`
            : ""
        }  
        ${
          idTokenResult.claims.etudiant || idTokenResult.claims.professeur
            ? `<a href="/remplirFormulaire">formulaire a remplir</a>`
            : ""
        }
          
          <a onclick="firebase.auth().signOut()" href="">Deconnexion</a>
        </div>
      </div>
    </li>`;
  } else {
    loginContainer.innerHTML = ` <li><a href="/signin">Connexion</a></li>
      <li><a href="/signup">Inscription</a></li>`;
  }
});
