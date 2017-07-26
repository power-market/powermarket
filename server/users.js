'use strict'

const db = require('APP/db')
const User = db.model('users')
const Orders = db.model('order')
const Reviews = db.model('review')

// const { mustBeLoggedIn, forbidden } = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
  // The forbidden middleware will fail *all* requests to list users.
  // Remove it if you want to allow anyone to list all users on the site.
  //
  // If you want to only let admins list all the users, then you'll
  // have to add a role column to the users table to support
  // the concept of admin users.
  // forbidden('listing users is not allowed'),
  (req, res, next) =>
    User.findAll()
      .then(users => res.json(users))
      .catch(next))
  .get('/:id/orders',
  (req, res, next) =>
    Orders.findAll({ where: { user_id: req.params.id } })
      .then(orders => res.json(orders)
        .catch(next)))
  .get('/:id/reviews',
  (req, res, next) =>
    Reviews.findAll({ where: { user_id: req.params.id } })
      .then(reviews => res.json(reviews)
        .catch(next)))
  .post('/',
  (req, res, next) =>
    User.create(req.body)
      .then(user => res.status(201).json(user))
      .catch(next))
  .get('/:id',
  // mustBeLoggedIn,
  (req, res, next) =>
    User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(next))
  .put('/:id',
  (req, res, next) =>
    User.findById(req.params.id)
      .then(user => user.update(req.body))
      .then(res.sendStatus(200))
      .catch(next))
  // not working
  .delete('/:id',
  (req, res, next) => {
    const id = req.params.id
    User.destroy({ where: { id } })
      .then(() => res.status(204).end())
      .catch(next)
  })
