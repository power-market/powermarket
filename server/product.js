'use strict'

const db = require('APP/db')
const Product = db.model('product')

// const {mustBeLoggedIn, forbidden} = require('./auth.filters')

// consider authorization -- KHET

module.exports = require('express').Router()
  .get('/',
  (req, res, next) =>
    Product.findAll()
      .then(product => res.json(product))
      .catch(next))
  .post('/',
  (req, res, next) =>
    Product.create(req.body)
      .then(user => res.status(201).json(user))
      .catch(next))
  .get('/:productId',
  (req, res, next) =>
    Product.findById(req.params.productId)
      .then(product => res.json(product))
      .catch(next))

  .put('/:id',
  (req, res, next) =>
    Product.findById(req.params.id)
      .then(product => {
        const update = product.update(req.body)
        return update
      })
      .then(update => res.sendStatus(200)) // send updated product -- KHET
      .catch(next))
  .delete('/:productId',
  (req, res, next) => {
    const id = req.params.productId
    Product.destroy({ where: { id } })
      .then(() => res.status(204).end()) // sendStatus -- KHET
      .catch(next)
  })
