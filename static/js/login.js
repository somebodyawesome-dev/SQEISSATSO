(async () => {
  email = document.getElementById("emailInput");
  pass = document.getElementById("passInput");
  loginButt = document.getElementById("login");
  logoutButt = document.getElementById("logout");

  loginButt.onclick = () => {
    axios
      .post(
        "/login",
        {
          email: email.value,
          password: pass.value,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "CSRF-Token": Cookies.get("XSRF-TOKEN"),
          },
        }
      )
      .then(function (response) {
        const { idToken } = response.data;
        firebase
          .auth()
          .signInWithCustomToken(idToken)
          .then(async (userCredential) => {
            // Signed in
            const user = userCredential.user;
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode + ":" + errorMessage);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  logoutButt.onclick = () => {
    firebase
      .auth()
      .signOut()
      .then((resp) => console.log("signed out"));
  };
  //auth state listner
  firebase.auth().onIdTokenChanged(function (user) {
    if (user) {
      // window.location.assign("/");
    }
  });
})();
