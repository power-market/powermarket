'use strict'

const db = require('APP/db')
const Order = db.model('order')
const ProductsInOrder = db.model('productsInOrder')
const Product = db.model('product')

// const { mustBeLoggedIn, forbidden } = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
  (req, res, next) =>
   Order.findAll()
      .then(orders => res.json(orders))
      .catch(next))
  .post('/',
  (req, res, next) =>
    Order.create(req.body)
      .then(order => res.status(201).json(order))
      .catch(next))
  .get('/:id',
  // mustBeLoggedIn,
  (req, res, next) =>
    Order.findById(req.params.id)
      .then(order => res.json(order))
      .catch(next))
  .get('/:id/products',
  (req, res, next) =>
    ProductsInOrder.findAll({
      where: {
        order_id: req.params.id
      },
      include: [
        { model: Product, as: 'product' },
        { model: Order, as: 'order' }
      ]
    })
      .then(order => res.json(order))
      .catch(next))
  .put('/:id',
  (req, res, next) =>
    Order.findById(req.params.id)
      .then(order => order.update(req.body))
      .then(res.sendStatus(200))
      .catch(next))
  // not working
  .delete('/:id',
  (req, res, next) => {
    const id = req.params.id
    Order.destroy({ where: { id } })
      .then(() => res.status(204).end())
      .catch(next)
  })
