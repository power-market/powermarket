// 'use strict'

// const db = require('APP/db')
//     , {User} = db
//     , {expect} = require('chai')

// /* global describe it before afterEach */

// describe('User', () => {
//   before('Await database sync', () => db.didSync)
//   afterEach('Clear the tables', () => db.truncate({ cascade: true }))

//   describe('authenticate(plaintext: String) ~> Boolean', () => {
//     it('resolves true if the password matches', () =>
//       User.create({ password: 'ok' })
//         .then(user => user.authenticate('ok'))
//         .then(result => expect(result).to.be.true))

//     it("resolves false if the password doesn't match", () =>
//       User.create({ password: 'ok' })
//         .then(user => user.authenticate('not ok'))
//         .then(result => expect(result).to.be.false))
//   })
// })

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

const User = db.model('users')

/* global describe it before afterEach */

describe('User model', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))
  // *Assertion translation*:
  // This assertion expects that the User model will
  // put an `email` column in the users table.
  it('has the expected email definition', () => {
    expect(User.attributes.email).to.be.an('object')
  })

  it('has the expected name definition', () => {
    expect(User.attributes.name).to.be.an('object')
  })

  describe('validations', () => {
    // *Assertion translation*:
    // The `email` column should be a required field.
    it('require email', () => {
      const user = User.build({ name: 'Brian' })
      return user.validate()
        .then(err => {
          expect(err).to.be.an('object')
          expect(err.errors).to.contain.a.thing.with.properties({
            path: 'email',
            type: 'notNull Violation'
          })
        })
    })

    it('require name', () => {
      const user = User.build({ email: 'bb@fullstack.com' })
      return user.validate()
        .then(err => {
          expect(err).to.be.an('object')
          expect(err.errors).to.contain.a.thing.with.properties({
            path: 'name',
            type: 'notNull Violation'
          })
        })
    })
  })

  describe('defaults', () => {
    let obama
    let biden
    beforeEach('Seed users', () => {
      const users = [
        { name: 'obama', email: 'obama@gmail.com', admin: true },
        { name: 'biden', email: 'biden@gmail.com' }
      ]
      return User.bulkCreate(users, { returning: true })
        .then(createdUsers => {
          obama = createdUsers[0].id
          biden = createdUsers[1].id
        })
    })
    // *Assertion translation*:
    // The `email` column should be a required field.
    it('defaults admin to false unless specified', () => {
      User.findById(biden)
        .then(res => {
          expect(res.admin).to.be.equal(false)
          return User.findById(obama)
        })
        .then(res => {
          expect(res.admin).to.be.equal(true)
        })
    })
  })
})

  // describe('functionality', () => {

  //   let brianId;
  //   let kateId;

  //   beforeEach('Seed users', () => {
  //     const users = [
  //       { name: 'brian', email: 'brian@brian.com' },
  //       { name: 'kate', email: 'kate@fullstack.com' }
  //     ];
  //     return User.bulkCreate(users, { returning: true })
  //       .then(createdUsers => {
  //         brianId = createdUsers[0].id;
  //         kateId = createdUsers[1].id;
  //       });
  //   });

  // });
