class Reponse {
  id = "";
  commentaires = {};
  fromulaire = {};
  ecrirePar = {};
  userType = "";

  constructor(data) {
    Object.assign(this, data);
  }
}
