'use strict'

const { ENUM } = require('sequelize')

module.exports = db => db.define('productsInOrder')

module.exports.associations = (ProductsInOrder, { Product, Order }) => {
  ProductsInOrder.belongsTo(Product)
  ProductsInOrder.belongsTo(Order)
}
