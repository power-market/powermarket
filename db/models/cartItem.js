'use strict'
const { STRING, INTEGER } = require('sequelize')

module.exports = db => db.define('cartItem', {
  quantity: {
    type: INTEGER,
    allowNull: false, 
    validate:{
      min: 1
    }
  }
})

module.exports.associations = (cartItem , { Product, User }) => {
  cartItem.belongsTo(User)
  cartItem.belongsTo(Product)
}
