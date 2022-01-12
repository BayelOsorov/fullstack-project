const getProduct = require("./get-product");
const getProducts = require("./get-products");

module.exports = {
  "/api/products/{id}": {
    ...getProduct,
  },
  "/api/products": {
    ...getProducts,
  },
};
