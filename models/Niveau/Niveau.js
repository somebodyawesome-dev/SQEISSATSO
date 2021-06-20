const { admin } = require("../../configs/firebase");

module.exports.Niveau = class Niveau {
  id = "";
  filiere = {};
  niveau = 0;

  constructor(data) {
    Object.assign(this, data);
  }
};
