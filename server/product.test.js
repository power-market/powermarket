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

describe('/api/product', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))
  let agent
  beforeEach('Set up agent for testing', () => {
      agent = supertest(app)
    })

  describe('api routes', () => {
      let windy
      let firey
      beforeEach('Seed products', () => {
          const products = [
                { name: 'windy', imageUrl: 'http://weknowyourdreams.com/images/wind/wind-01.jpg', description: 'shoot some wind', price: 123, count: 13 },
                { name: 'firey', imageUrl: 'https://suade.org/images/fire_2.jpg', description: 'shoot some fire', price: 1233, count: 132 },
            ]
          return Product.bulkCreate(products, { returning: true })
                .then(createdProduct => {
                  windy = createdProduct[0].id
                  firey = createdProduct[1].id
                })
        })

      describe('products', () => {
          it('serves up all products on request to GET /', () => agent
                .get('/api/product/')
                .expect(200)
                .then(res => {
                  console.log('this is body', res.body)
                  expect(res.body).to.be.an('array')
                  expect(res.body.length).to.be.equal(2)
                  expect(res.body).to.contain.a.thing.with('id', windy)
                  expect(res.body).to.contain.a.thing.with('id', firey)
                }))
        })
    })
})
