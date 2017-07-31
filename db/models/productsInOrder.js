'use strict'
const { DECIMAL, INTEGER } = require('sequelize')

module.exports = db => db.define('productsInOrder', {
  unitPrice: {
    type: DECIMAL(10, 2),

  },
  unitQuantity: {
    type: INTEGER,
    defaultValue: 1,
    validate: {
      min: 1
    }
  }
})

module.exports.associations = (ProductsInOrder, { Product, Order }) => {
  ProductsInOrder.belongsTo(Order)
  ProductsInOrder.belongsTo(Product)
}
