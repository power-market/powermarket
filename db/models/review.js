'use strict'

const { STRING, INTEGER, NOW, DATE } = require('sequelize')

module.exports = db => db.define('review', {
  title: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  text: {
    type: STRING, // 255 VARCHAR, so consider text -- KHET
    validate: {
      len: {
        args: [20, 1000],
        msg: 'Review must be between 20 and 1000 characters in length'
      }
    }
  },
  stars: {
    type: INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  },
  date: {
    type: DATE,
    defaultValue: NOW
  }
})

module.exports.associations = (Review, { User, Product }) => {
  Review.belongsTo(User)
  Review.belongsTo(Product)
  // Product.hasMany(Review)
}
