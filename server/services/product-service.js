const { Op } = require("sequelize");
const { Product } = require("./../models");

const create = async (name, description, price, image, brand, userId) => {
  const product = await Product.create({
    name,
    description,
    price,
    image,
    brand,
    userId,
  });

  //   if (Array.isArray(image)) {
  //     image.forEach((i) => {
  //       PictureService.createPicture(i, product.id);
  //     });
  //   } else {
  //     PictureService.createPicture(image, product.id);
  //   }
  return product;
};

const getAll = async ({ offset, limit, q, brand }) => {
  if (q || brand) {
    q = q || ""
    if (brand) {
      console.log(brand);
      return await Product.findAndCountAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: '%' + q + '%'
              }
            },
          ],
          brand,
        },

        limit,
        offset
      })
    }
    else {
      return await Product.findAndCountAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: '%' + q + '%'
              }
            }
          ],
        },

        limit,
        offset
      })
    }
  }

  return await Product.findAndCountAll({
    limit,
    offset,

  })
}

const deleteOne = async (id) => {
  return await Product.destroy({ where: { id } });
};
const update = async (id, name, description, price, image, brand) => {
  return await Product.update(
    { name, description, price, image, brand },
    { where: { id } }
  );
  //   return await Product.patch({ where: { id } });
};
const getOne = async (id) => {
  const card = await Product.findOne({
    where: { id },
  });
  return card.dataValues;
};
module.exports = {
  create,
  deleteOne,
  update,
  getOne,
  getAll,
};
