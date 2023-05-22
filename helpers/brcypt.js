const brcypt = require("bcryptjs");

function hashPassword(password) {
  return brcypt.hashSync(password);
}

function comparePassword(password, hashPass) {
  return brcypt.compareSync(password, hashPass);
}

module.exports = {
  hashPassword,
  comparePassword,
};
