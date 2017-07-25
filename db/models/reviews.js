'use strict'

const { STRING, INTEGER } = require('sequelize')

module.exports = db => db.define('review', {
  title: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  text: {
    type: STRING,
    validate: {
      len: {
        args: [20, 1000],
        msg: 'Display name must be between 20 and 1000 characters in length'
      }
    }
  },
  stars: {
    type: INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  }
})
