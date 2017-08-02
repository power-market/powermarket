'use strict'

const { ENUM, DECIMAL, DATE, NOW } = require('sequelize')

module.exports = db => db.define('order', {
  status: {
    type: ENUM('processing', 'shipped', 'delivered', 'cancelled', 'cart'),
    defaultValue: 'cart'
  },
  subtotal: {
    type: DECIMAL(10, 2),
    defaultValue: 0
  },
  date: {
    type: DATE,
    defaultValue: NOW
  }
})

module.exports.associations = (Order, { Product, ProductsInOrder }) => {
  Order.belongsToMany(Product, {through: ProductsInOrder})
}
