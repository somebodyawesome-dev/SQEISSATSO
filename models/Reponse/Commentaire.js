class Commentaire {
  id = "";
  commentaire = {};
  sujet = {};
  relatedTo = {};
  reponse = {};
  note = 0;
  constructor(data) {
    Object.assign(this, data);
  }
}
