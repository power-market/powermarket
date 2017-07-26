'use strict'

const db = require('APP/db')
const Review = db.model('review')

module.exports = require('express').Router()
  .get('/',
  (req, res, next) =>
    Review.findAll()
      .then(Reviews => res.json(Reviews))
      .catch(next))
  .post('/',
  (req, res, next) =>
    Review.create(req.body)
      .then(Review => res.status(201).json(Review))
      .catch(next))
  .get('/:id',
  (req, res, next) =>
    Review.findById(req.params.id)
      .then(Review => res.json(Review))
      .catch(next))
  .put('/:id',
  (req, res, next) =>
    Review.findById(req.params.id)
      .then(Review => Review.update(req.body))
      .then(res.sendStatus(200))
      .catch(next))
  .delete('/:id',
  (req, res, next) => {
    const id = req.params.id
    Review.destroy({ where: { id } })
      .then(() => res.status(204).end())
      .catch(next)
  })
