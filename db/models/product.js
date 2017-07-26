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
    defaultValue: '/default.jpg' // not a url -- KHET
  },
  description: {
    type: TEXT
  },
  price: {
    type: INTEGER,
    allowNull: false
    // min value -- KHET
  },
  count: { // quantity -- KHET
    type: INTEGER,
    allowNull: false
    // defaultValue of 0 -- KHET
    // definitely min value -- KHET
  }
}, {
    getterMethods: {
      price: function () { // make this 1 line OR consider DECIMAL(10,2) -- KHET
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

module.exports.associations = (Product, { Review }) => {
  Product.hasMany(Review, { as: 'reviews' }) // unnecessary to have `as`. If this was on the belongsTo side it would adjust the foreignKey name -- KHET
  // some link to orders -- KHET
}
