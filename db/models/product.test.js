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

const Product = db.model('product')

/* global describe it before afterEach */

describe('Product model', () => {
    before('Await database sync', () => db.didSync)
    afterEach('Clear the tables', () => db.truncate({ cascade: true }))
    // *Assertion translation*:
    // This assertion expects that the Product model will
    // put an `description` column in the products table.
    it('has the expected description definition', () => {
        expect(Product.attributes.description).to.be.an('object')
    })

    it('has the expected name definition', () => {
        expect(Product.attributes.name).to.be.an('object')
    })

    describe('validations', () => {
        // *Assertion translation*:
        // The `email` column should be a required field.
        it('require name', () => {
            const product = Product.build({ price: 12, count: 3 })
            return product.validate()
                .then(err => {
                    expect(err).to.be.an('object')
                    expect(err.errors).to.contain.a.thing.with.properties({
                        path: 'name',
                        type: 'notNull Violation'
                    })
                })
        })

        it('require price', () => {
            const product = Product.build({ name: 'cranky', count: 19 })
            return product.validate()
                .then(err => {
                    expect(err).to.be.an('object')
                    expect(err.errors).to.contain.a.thing.with.properties({
                        path: 'price',
                        type: 'notNull Violation'
                    })
                })
        })
    })

    describe('defaults', () => {
        let earthyId
        let crankyId
        beforeEach('Seed products', () => {
            const products = [
                { name: 'earthy', price: 123, count: 3 },
                { name: 'cranky', price: 4245, count: 1 }
            ]
            return Product.bulkCreate(products, { returning: true })
                .then(createdProducts => {
                    earthyId = createdProducts[0].id
                    crankyId = createdProducts[1].id
                })
        })

        it('test for price and count', () => {
            Product.findById(crankyId)
                .then(res => {
                    expect(res.price).to.be.equal('4245.00')
                    return Product.findById(earthyId)
                })
                .then(res => {
                    expect(res.count).to.be.equal(3)
                })
        })
    })
})
