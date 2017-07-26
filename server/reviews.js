'use strict'

const db = require('APP/db')
const Review = db.model('review')

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
      .then(reviews => res.json(reviews))
      .catch(next))
  .post('/',
  (req, res, next) =>
    Review.create(req.body)
      .then(review => res.status(201).json(review))
      .catch(next))
  .get('/:id',
  // mustBeLoggedIn,
  (req, res, next) =>
    Review.findById(req.params.id)
      .then(review => res.json(review))
      .catch(next))
  .put('/:id',
  (req, res, next) =>
    Review.findById(req.params.id)
      .then(review => {return review.update(req.body)})
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
