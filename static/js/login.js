(async () => {
  const emailInput = document.getElementById("emailInput");
  const passwordInput = document.getElementById("passwordInput");
  const loginButt = document.getElementById("loginButt");
  loginButt.onclick = async (e) => {
    e.preventDefault();
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInput.value,
        password: passwordInput.value,
      }),
    });
    if (response.ok) {
      const { idToken } = await response.json();
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
          alert(errorMessage);
          console.log(errorCode + ":" + errorMessage);
        });
    } else {
      alert(await response.text());
    }
  };

  //auth state listner
  firebase.auth().onIdTokenChanged(function (user) {
    if (user) {
      window.location.assign("/");
    } else {
      console.log("logged out");
    }
  });
})();
