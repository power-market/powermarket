'use strict'

const { ENUM } = require('sequelize') // don't need me -- KHET

module.exports = db => db.define('productsInOrder') // consider adding quantity and price for each product in order. Consider OrderLineItem -- KHET

module.exports.associations = (ProductsInOrder, { Product, Order }) => {
  ProductsInOrder.belongsTo(Product)
  ProductsInOrder.belongsTo(Order)
}
