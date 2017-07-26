'use strict'

const request = require('supertest')
  , db = require('APP/db')

import chai from 'chai'
import chaiProperties from 'chai-properties'
import chaiThings from 'chai-things'
chai.use(chaiProperties)
chai.use(chaiThings)
const expect = chai.expect
import supertest from 'supertest-as-promised'
import sinon from 'sinon'

const Review = db.model('review')

describe('Review model', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  it('has the expected title definition', () => {
    expect(Review.attributes.title).to.be.an('object')
  })

  it('has the expected text definition', () => {
    expect(Review.attributes.text).to.be.an('object')
  })

  it('has the expected stars definition', () => {
    expect(Review.attributes.stars).to.be.an('object')
  })

  it('has the expected date definition', () => {
    expect(Review.attributes.date).to.be.an('object')
  })

  describe('validations', () => {

    it('require title', () => {
      const review = Review.build({ text: 'Wow this product is amazing!', stars: 5 })
      return review.validate()
        .then(err => {
          expect(err).to.be.an('object')
          expect(err.errors).to.contain.a.thing.with.properties({
            path: 'title',
            type: 'notNull Violation'
          })
        })
    })

    it('text must be at least 20 chars', () => {
      const review = Review.build({ title: 'Amazing product', stars: 5, text: 'this' })
      return review.validate()
        .then(err => {
          expect(err).to.be.an('object')
          expect(err.errors).to.contain.a.thing.with.properties({
            path: 'text',
            type: 'Validation error',
            message: 'Review must be between 20 and 1000 characters in length'
          })
        })
    })

    it('makes sure stars are between 1 and 5', () => {
      const review = Review.build({ title: 'Amazing product', stars: 10, text: 'this is a wonderful product!!' })
      return review.validate()
        .then(err => {
          expect(err).to.be.an('object')
          expect(err.errors).to.contain.a.thing.with.properties({
            message: 'Validation max failed',
            type: 'Validation error',
            path: 'stars'
          })
        })
    })
  })

  describe('defaults', () => {
    let goodReview;
    let badReview;
    beforeEach('Seed reviews', () => {
      const reviews = [
        { title: 'wow!', text: 'this is an amazing product!', stars: 5 },
        { title: 'boo', text: 'this is the worst product ever', stars: 1 }
      ]
      return Review.bulkCreate(reviews, { returning: true })
        .then(createdReviews => {
          goodReview = createdReviews[0].id
          badReview = createdReviews[1].id
        })
    })

    it('defaults date', () => {
      Review.findAll()
        .then(res => {
          expect(res).to.contain.a.thing('date')
          expect(res[0].date).to.not.equal(null)
          expect(res[0].date).to.not.equal(undefined)
        })
    })
  })
})

