'use strict'

const db = require('APP/db')
const User = db.model('users')
const Orders = db.model('order')
const Reviews = db.model('review')

const { mustBeLoggedIn, forbidden, assertAdmin } = require('./auth.filters')

module.exports = require('express').Router()

// .param('id', (req,res,next,id){}) <-- look into me -- KHET

  .get('/', assertAdmin,
  // The forbidden middleware will fail *all* requests to list users.
  // Remove it if you want to allow anyone to list all users on the site.
  //
  // If you want to only let admins list all the users, then you'll
  // have to add a role column to the users table to support
  // the concept of admin users.
  // forbidden('listing users is not allowed'),
  (req, res, next) => // does EVERYONE need to see ALL users? no, restrict me to just admin -- KHET
    User.findAll()
      .then(users => res.json(users))
      .catch(next))
  .get('/:id',
  // mustBeLoggedIn, // assertAdminOrSelf -- KHET
  (req, res, next) =>
    // filter which scope to include and what to send based on query -- KHET
    // `/api/users/1?scope=orders` look at scope(req.query.scope), maybe always add defaultScope -- KHET
    User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(next))
  .get('/:id/orders',
  (req, res, next) =>
  // User.scope(orders).findById(id) http://docs.sequelizejs.com/manual/tutorial/scopes.html -- KHET
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
  // who can do this? And what should be allowed to be created? -- KHET
    User.create(req.body)
      .then(user => res.status(201).json(user))
      .catch(next))
  .put('/:id',
  (req, res, next) => // who does this? selfOrAdmin -- KHET
    User.findById(req.params.id) // consider User.update for consistency with destroy below -- KHET
      .then(user => {
        // 1 line
        const update = user.update(req.body) // should the whole body be updated -- KHEt
        return update
      })
      .then(update => res.sendStatus(200))
      .catch(next))
  // not working
  .delete('/:id',
  (req, res, next) => {
    const id = req.params.id
    User.destroy({ where: { id } })
      .then(() => res.status(204).end()) // sendStatus -- KHET
      .catch(next)
  })
