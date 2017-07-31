'use strict'
const { ARRAY } = require('sequelize')

module.exports = db => db.define('cart', {
  cartItems: {
    type: ARRAY,
    allowNull: true,
  }
})

module.exports.associations = (Cart, { Product }) => {
  Cart.hasMany(Product)
  Product.belongsToMany(Cart, {through: ProductsInCart})
}
