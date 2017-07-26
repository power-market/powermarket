'use strict'

const db = require('APP/db')
const Product = db.model('product')

// const {mustBeLoggedIn, forbidden} = require('./auth.filters')

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

  .put('/:productId', (req, res, next) => {
    Product.findById(req.params.productId)
      .then((foundProduct) => foundProduct.update(req.body))
      .then((updatedProduct) => {
        res.json(updatedProduct).sendStatus(201)
      })
      .catch(next)
  })
  .delete('/:productId',
  (req, res, next) => {
    const id = req.params.productId
    Product.destroy({ where: { id } })
      .then(() => res.status(204).end())
      .catch(next)
  })
