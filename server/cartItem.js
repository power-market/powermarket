'use strict'
const db = require('APP/db')
const cartItem = db.model('cartItem')
const product = db.model('product')
const { assertAdmin } = require('./auth.filters')
module.exports = require('express').Router()
  .get('/user/', (req, res, next) => { //Get all Cart Items for a specific user Id
    cartItem.findAll({ where: { user_id: req.session.passport.user }, include: [{ model: product, as: "product" }] })
      .then(foundCarts => {
        res.send(foundCarts)
      })
  })
  .post('/user/', (req, res, next) => { //add new thing to Cart with given Quantity and with the right User
    cartItem.create({ user_id: req.session.passport.user, quantity: req.body.quantity, product_id: req.body.itemId })
      .then(createdCartItem => {
        res.json(createdCartItem);
      })
  })
