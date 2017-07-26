'use strict'

const { ENUM } = require('sequelize')

module.exports = db => db.define('order', {
  status: {
    type: ENUM('processing', 'shipped', 'delivered'),
    defaultValue: 'processing'
  }
})
