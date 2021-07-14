const loginContainer = document.getElementById("login-container");
firebase.auth().onIdTokenChanged(function (user) {
  if (user) {
    loginContainer.innerHTML = `<li>
    <div class="dropdown">
      <span>Menu</span>
      <div class="dropdown-content">
        <a href="/remplirFormulaire">Remplir formulaire</a>
        <a onclick="firebase.auth().signOut()" href="">Deconnexion</a>
      </div>
    </div>
  </li>`;
  } else {
    loginContainer.innerHTML = ` <li><a href="/signin">Connexion</a></li>
    <li><a href="/signup">Inscription</a></li>`;
  }
});
