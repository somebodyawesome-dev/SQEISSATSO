const { db } = require("./firebase");
/**
 *
 * @param {string} collection
 * @param {string} id
 * @param {*} data
 */
async function ajout(collection, id, data) {
  try {
    console.log(data);
    await db.collection(collection).doc(id).set(data);

    return collection + " est ajoute";
  } catch (err) {
    console.log(err.message);
    return err;
  }
}
async function mettre(collection, id, data) {
  try {
    await db.collection(collection).doc(id).update(data);
    return "mise à jour effectué";
  } catch (err) {
    console.log("Error cant update : " + err);
    return err;
  }
}
async function obtenir(collection, id) {
  try {
    const docSnap = await db.collection(collection).doc(id).get();
    if (docSnap.exists) {
      return docSnap.data();
    } else {
      return (
        "Error Cant get " + collection + " : " + id + " document doesn't exist"
      );
    }
  } catch (error) {
    console.log(" can't get " + collection + " for this reasons: " + error);
    return " can't get " + collection + " for this reasons: " + error;
  }
}
module.exports = {
  ajout: ajout,
  mettre: mettre,
  obtenir: obtenir,
};
