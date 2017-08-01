'use strict'

const db = require('APP/db')
const User = db.model('users')
const Orders = db.model('order')
const Reviews = db.model('review')

const { mustBeLoggedIn, selfOnly, assertAdmin, selfOrAdmin } = require('./auth.filters')

module.exports = require('express').Router()
  .param('id',
  (req, res, next, id) => {
    User.findById(id)
      .then(user => {
        if (!user) res.sendStatus(404)
        req.requestedUser = user
        next()
        return null
      })
      .catch(next)
  })
  .get('/', assertAdmin,
  (req, res, next) => {
    User.findAll()
      .then(users => res.json(users))
      .catch(next)
  })
  .get('/:id', mustBeLoggedIn, selfOrAdmin,
  (req, res, next) => {
    res.json(req.requestedUser)
      .catch(next)
  })
  // .get('/:id/orders',
  // (req, res, next) =>
  //   Orders.findAll({ where: { user_id: req.params.id } })
  //     .then(orders => res.json(orders)
  //       .catch(next)))
  // .get('/:id/reviews',
  // (req, res, next) =>
  //   Reviews.findAll({ where: { user_id: req.params.id } })
  //     .then(reviews => res.json(reviews)
  //       .catch(next)))
  .post('/',
  (req, res, next) =>
    User.create(req.body)
      .then(user => res.status(201).json(user))
      .catch(next))
  .put('/:id', selfOrAdmin,
  (req, res, next) => {
    req.requestedUser.update(req.body)
      .then(user => {
        res.json(user)
      })
      .catch(next)
  })
  .delete('/:id', selfOrAdmin,
  (req, res, next) => {
    req.requestedUser.destroy()
      .then(() => {
        res.sendStatus(204)
      })
      .catch(next)
  })
