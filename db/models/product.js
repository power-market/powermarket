'use strict'

<<<<<<< HEAD
const { STRING, INTEGER } = require('sequelize')
=======
const {STRING, INTEGER} = require('sequelize')
>>>>>>> 7929c430ab3dace2f51867f047d74f546d1c2585

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
    type: STRING
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
<<<<<<< HEAD
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

module.exports.associations = (Product, { Order, }) => {
  Product.belongsToMany(Order, { as: 'item', through: })
=======
  getterMethods: {
    price: function() {
      const dollarAmt = this.getDataValue('price') / 100
      return dollarAmt.toFixed(2)
    }
  },
  setterMethods: {
    price: function(dollars) {
      this.setDataValue('price', dollars * 100)
    }
  }
})

module.exports.associations = (Product, {Order, }) => {
  Product.belongsToMany(Order, {as: 'item', through: })
>>>>>>> 7929c430ab3dace2f51867f047d74f546d1c2585
}
