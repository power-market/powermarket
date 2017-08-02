'use strict'

const db = require('APP/db')
const cartItem = db.model('cartItem')
const product = db.model('product')

const { assertAdmin } = require('./auth.filters')

module.exports = require('express').Router()
  .get('/user/', (req, res, next) => { //Get all Cart Items for a specific user Id
    console.log("REACHED GET REQUEST")
    cartItem.findAll({where: {user_id: req.session.passport.user}, include: [{model: product, as: "product" }]})
    .then(foundCarts => {
        console.log("CART ==================> ", foundCarts)
        res.send(foundCarts)
    })
  })

  .post('/user/', (req, res, next) => { //add new thing to Cart with given Quantity and with the right User
      cartItem.create({user_id: req.session.passport.user, quantity: req.body.quantity, product_id: req.body.itemId})
      .then(createdCartItem => {
          console.log("CREATED CART ITEM ============> ", createdCartItem)
          res.json(createdCartItem);
      })
  })
//   .get("/user/:id/fullCart", (req, res, next) => { 
//       cartItem.findAll({where: {userId: req.params.id}, include: [{model: product, as: "product" }]})
//       .then(allCartItems => {
//           var allProducts = [allCartItems.product];
//           res.send(allProducts);
//       })
//   } )