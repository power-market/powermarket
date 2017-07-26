'use strict'

const { ENUM } = require('sequelize')

// logged in user has a cart -- how do I store it?
	// Order that is pending --> add enum. Always make sure only 1 pending order
		// consider associating with User OR sessionId (if not logged in)

module.exports = db => db.define('order', {
  status: {
    type: ENUM('processing', 'shipped', 'delivered'),
    defaultValue: 'processing'
  }
})

// expect to see join table order -- product association here. At the least an association to productsInOrder -- KHET