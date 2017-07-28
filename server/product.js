'use strict'

const db = require('APP/db')
const Product = db.model('product')

const { assertAdmin } = require('./auth.filters')

module.exports = require('express').Router()
  .param('id',
  (req, res, next, id) => {
    Product.findById(id)
      .then(product => {
        if (!product) res.sendStatus(404)
        req.requestProduct = product
        next()
        return null
      })
      .catch(next)
  })
  .get('/',
  (req, res, next) =>
    Product.findAll()
      .then(product => res.json(product))
      .catch(next))
  .post('/', assertAdmin,
  (req, res, next) =>
    Product.create(req.body)
      .then(user => res.status(201).json(user))
      .catch(next))
  .get('/:productId',
  (req, res, next) => {
    res.json(req.requestedProduct)
      .catch(next)
  })
  .put('/:productId', assertAdmin,
  (req, res, next) =>
    req.requestedProduct.update(req.body)
      .then(product => {
        res.json(product)
      })
      .catch(next))
  .delete('/:productId', assertAdmin,
  (req, res, next) => {
    req.requestedUser.destroy()
      .then(() => res.sendStatus(204))
      .catch(next)
  })
