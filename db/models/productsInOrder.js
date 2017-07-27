'use strict'

module.exports = db => db.define('productsInOrder')

module.exports.associations = (ProductsInOrder, { Product, Order }) => {
  ProductsInOrder.hasMany(Product)
  ProductsInOrder.hasMany(Order)
}
