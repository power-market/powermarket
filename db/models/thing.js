'use strict'

const {STRING, INTEGER} = require('sequelize')

module.exports = db => db.define('things', {
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
  rating: {
    type: INTEGER
  }
}, {
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

module.exports.associations = (Thing, {User, Favorite}) => {
  Thing.belongsToMany(Order, {as: 'item', through: Favorite})
}
