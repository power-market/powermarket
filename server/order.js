'use strict'

const db = require('APP/db')
const Order = db.model('order')

const { mustBeLoggedIn, forbidden } = require('./auth.filters')

// authorization considerations -- KHET

module.exports = require('express').Router()
  .get('/',
  (req, res, next) =>
   Order.findAll() // indentation!? -- KHET
      // .then(res.json.bind(res)) <-- does the same as below but different -- KHET
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
  .put('/:id', mustBeLoggedIn,
  (req, res, next) => {
    // if not admin can't set status
    if(!req.user.admin && req.body.status !== 'processing') delete req.body.status
    Order.findById(req.params.id)
      .then(order => {
        if (order.status !== 'pending') return order.update({status: req.body.status})
        return order.update(req.body)
      }) // should all parts be updatable by all parties at all times (i.e. when processing) -- KHET
      .then(res.sendStatus(200)) // probably want the updated order back -- KHET
      .catch(next))
  }
  // not working
  .delete('/:id',
  (req, res, next) => {
    const id = req.params.id
    Order.destroy({ where: { id } })
      .then(() => res.status(204).end()) // sendStatus -- KHET
      .catch(next)
  })
