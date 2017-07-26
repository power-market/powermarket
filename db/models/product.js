'use strict'

const { STRING, INTEGER, TEXT } = require('sequelize')

module.exports = db => db.define('product', {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: STRING,
    defaultValue: '/default.jpg'
  },
  description: {
    type: TEXT
  },
  price: {
    type: INTEGER,
    allowNull: false
  },
  count: {
    type: INTEGER,
    allowNull: false
  }
}, {
    getterMethods: {
      price: function () {
        const dollarAmt = this.getDataValue('price') / 100
        return dollarAmt.toFixed(2)
      }
    },
    setterMethods: {
      price: function (dollars) {
        this.setDataValue('price', dollars * 100)
      }
    }
  })

// module.exports.associations = (Product, { Order }) => {
//   Product.belongsToMany(Order, { through: 'productsInOrder' })
// }
