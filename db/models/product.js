'use strict'

const { STRING, INTEGER, TEXT, DECIMAL } = require('sequelize')

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
    validate: {
      isUrl: true
    }
  },
  description: {
    type: TEXT
  },
  category: {
    type: STRING,
  },
  price: {
    type: DECIMAL(10, 2),
    allowNull: false
  },
  quantity: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
})

module.exports.associations = (Product, { Order, Review, ProductsInOrder }) => {
  Product.hasMany(Review)
  Product.belongsToMany(Order, { through: ProductsInOrder })
}
