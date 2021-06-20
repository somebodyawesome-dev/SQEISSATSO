const { admin } = require("../configs/firebase");
/**
 *
 * @param {string} collection
 * @param {string} id
 * @param {*} data
 */
async function ajout(collection, id, data) {
  try {
    await admin.firestore().collection(collection).doc(id).set(data);

    return collection + " est ajoute";
  } catch (err) {
    console.log("can't add on " + collection);
    throw new Error(err);
  }
}
async function mettre(collection, id, data) {
  try {
    await admin.firestore().collection(collection).doc(id).update(data);
    return "mise à jour effectué";
  } catch (err) {
    console.log("Error cant update : " + err);
    throw new Error(err);
  }
}
async function obtenir(collection, id) {
  try {
    const docSnap = await admin
      .firestore()
      .collection(collection)
      .doc(id)
      .get();
    if (docSnap.exists) {
      return docSnap.data();
    } else {
      return (
        "Error Cant get " + collection + " : " + id + " document doesn't exist"
      );
    }
  } catch (error) {
    console.log(" can't get " + collection + " for this reasons: " + error);
    throw new Error(" can't get " + collection + " for this reasons: " + error);
  }
}
async function supprimer(collection, id) {
  try {
    const docSnap = await admin
      .firestore()
      .collection(collection)
      .doc(id)
      .get();
    if (docSnap.exists) {
      await docSnap.ref.delete();
      return collection + " est supprimé";
    } else {
      return collection + " déjà unexistant";
    }
  } catch (error) {
    console.log(" can't delete " + collection + " for this reasons: " + error);
    throw new Error(
      " can't delete " + collection + " for this reasons: " + error
    );
  }
}
async function ajoutAvecCleAleatoire(collection, data) {
  try {
    await admin.firestore().collection(collection).add(data);
    return "object de " + collection + " est ajoutee";
  } catch (error) {
    console.log("can't add in " + collection);
    throw new Error(err);
  }
}
module.exports = {
  ajout: ajout,
  mettre: mettre,
  obtenir: obtenir,
  supprimer: supprimer,
  ajoutAvecCleAleatoire: ajoutAvecCleAleatoire,
};
