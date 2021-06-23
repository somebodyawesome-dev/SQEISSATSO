const loginContainer = document.getElementById("login-container");
firebase.auth().onIdTokenChanged(function (user) {
  if (user) {
    loginContainer.innerHTML = `<li><a onclick="firebase.auth().signOut()" href="">Deconnexion</a></li>`;
  } else {
    loginContainer.innerHTML = ` <li><a href="/signin">Connexion</a></li>
    <li><a href="/signup">Inscription</a></li>`;
  }
});
