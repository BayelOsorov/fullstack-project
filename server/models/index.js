const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  firstName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
  isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
  activationLink: { type: DataTypes.STRING },
});

// const Cart = sequelize.define("cart", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
// });

const Product = sequelize.define("product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
  brand: { type: DataTypes.ENUM("pillow", "lamp", "linens") }

});

// const CartProduct = sequelize.define("cart_product", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
// });

const Comment = sequelize.define("comment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: { type: DataTypes.TEXT, allowNull: false },
  owner: { type: DataTypes.STRING }
});

// const Rating = sequelize.define('rating', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     rate: {type: DataTypes.INTEGER, allowNull: false}
// })

User.hasMany(Product);
Product.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Product.hasMany(Comment);
Comment.belongsTo(Product);

// User.hasOne(Cart);
// Cart.belongsTo(User);

// Rating.hasOne(User);
//User.belongsTo(Rating);

// Product.hasMany(Rating);
// Rating.belongsTo(Product);

// Cart.belongsToMany(Product, { through: CartProduct });
// Product.belongsToMany(Cart, { through: CartProduct });

module.exports = {
  User,
  Product,
  Comment,
  // Cart,
  // CartProduct,
  // Rating,
};
