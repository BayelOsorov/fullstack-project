const products = require("./products");
const users = require("./users");

module.exports = {
  paths: {
    ...users,
    ...products,
  },
};
