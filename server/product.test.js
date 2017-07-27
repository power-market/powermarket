const db = require('APP/db')
  , app = require('./start')

import chai from 'chai'
import chaiProperties from 'chai-properties'
import chaiThings from 'chai-things'
chai.use(chaiProperties)
chai.use(chaiThings)
const expect = chai.expect
import supertest from 'supertest-as-promised'
import sinon from 'sinon'

const Product = db.model('product')

/* global describe it before afterEach */

describe('Backend', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))
  let agent
  beforeEach('Set up agent for testing', () => {
    agent = supertest(app)
  })

  describe('routes', () => {
    let windyId
    let fireyId
    beforeEach('Seed products', () => {
      const products = [
        { name: 'windy', imageUrl: 'http://weknowyourdreams.com/images/wind/wind-01.jpg', description: 'shoot some wind', price: 123, count: 13 },
        { name: 'firey', imageUrl: 'https://suade.org/images/fire_2.jpg', description: 'shoot some fire', price: 1233, count: 132 },
      ]
      return Product.bulkCreate(products, { returning: true })
        .then(createdProduct => {
          windyId = createdProduct[0].id
          fireyId = createdProduct[1].id
        })
    })

    describe('for products', () => {
      it('serves up all products on request to GET /', () => agent
        .get('/api/product/')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(2)
          expect(res.body).to.contain.a.thing.with('id', windyId)
          expect(res.body).to.contain.a.thing.with('id', fireyId)
        }))

      it('serves up a specific Product on request to GET /{{productId}}', () => agent
        .get(`/api/product/${windyId}`)
        .expect(200)
        .then(res => {
          expect(res.body.name).to.be.equal('windy')
          expect(res.body.description).to.be.equal('shoot some wind')
          expect(res.body.price).to.be.equal('123.00')
        }))

      it('deletes a specific Product on request to DELETE /{{productId}}', () => agent
        .delete(`/api/product/${windyId}`)
        .expect(204)
        .then(res => Product.findAll({ where: { id: windyId } }))
        .then(product => {
          expect(product).to.be.an('array')
          expect(product.length).to.be.equal(0)
          expect(product).to.not.contain.a.thing.with('id', windyId)
        }))

      it('updates a specific Product on request to PUT /{{productId}}', () => agent
        .put(`/api/product/${fireyId}`)
        .send({ price: 1334 })
        .expect(200)
        .then(res => Product.findById(fireyId))
        .then(foundProduct => {
          expect(foundProduct.price).to.be.equal('1334.00')
          expect(foundProduct.name).to.be.equal('firey')
        }))

      it('adds a Product at POST /, sending a 201 response', () => agent
        .post('/api/product')
        .send({
          name: 'icy', imageUrl: 'https://suade.org/images/fire_2.jpg', description: 'shoot some ice', price: 234, count: 1322
        })
        .expect(201)
        .then(res => {
          const createdProduct = res.body
          return Product.findById(createdProduct.id)
        })
        .then(foundProduct => {
          expect(foundProduct.name).to.be.equal('icy')
          expect(foundProduct.price).to.be.equal('234.00')
        }))
    })
  })
})
