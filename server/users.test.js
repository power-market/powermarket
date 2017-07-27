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

const User = db.model('users')
const Reviews = db.model('review')

/* global describe it before afterEach */

describe('Backend', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  let agent
  beforeEach('Set up agent for testing', () => {
    agent = supertest(app)
  })

  describe('routing', () => {
    let obama
    let biden
    beforeEach('Seed users', () => {
      const users = [
        { name: 'obama', email: 'obama@gmail.com' },
        { name: 'biden', email: 'biden@gmail.com' }
      ]
      return User.bulkCreate(users, { returning: true })
        .then(createdUsers => {
          obama = createdUsers[0].id
          biden = createdUsers[1].id
        })
    })

    describe('for users', () => {
      it('serves up all users on request to GET /', () => {
        return agent
          .get('/api/users')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array')
            expect(res.body.length).to.be.equal(2)
            expect(res.body).to.contain.a.thing.with('id', obama)
            expect(res.body).to.contain.a.thing.with('id', biden)
          })
      })

      it('serves up a specific user on request to GET /{{usersId}}', () => {
        return agent
          .get(`/api/users/${biden}`)
          .expect(200)
          .then(res => {
            expect(res.body.name).to.be.equal('biden')
            expect(res.body.email).to.be.equal('biden@gmail.com')
          })
      })

      it('deletes a specific user on request to DELETE /{{usersId}}', () => {
        return agent
          .delete(`/api/users/${biden}`)
          .expect(204)
          .then(res => {
            return User.findAll({ where: { id: biden } })
          })
          .then(users => {
            expect(users).to.be.an('array')
            expect(users.length).to.be.equal(0)
            expect(users).to.not.contain.a.thing.with('id', biden)
          })
      })

      it('updates a specific user on request to PUT /{{usersId}}', () => {
        return agent
          .put(`/api/users/${obama}`)
          .send({ email: 'potus@wh.gov' })
          .expect(200)
          .then(res => {
            return User.findById(obama)
          })
          .then(foundUser => {
            expect(foundUser.email).to.be.equal('potus@wh.gov')
            expect(foundUser.name).to.be.equal('obama')
          })
      })

      it('adds a user at POST /, sending a 201 response', () => {
        return agent
          .post('/api/users')
          .send({
            name: 'Hillary',
            email: 'hilldog@gmail.com',
          })
          .expect(201)
          .then(res => {
            const createdUser = res.body
            return User.findById(createdUser.id)
          })
          .then(foundUser => {
            expect(foundUser.email).to.be.equal('hilldog@gmail.com')
            expect(foundUser.name).to.be.equal('Hillary')
          })
      })
    })
  })
})

  // describe('GET /:id', () =>
  //   describe('when not logged in', () =>
  //     it('fails with a 401 (Unauthorized)', () =>
  //       request(app)
  //         .get(`/api/users/1`)
  //         .expect(401)
  //     )))

  // describe('POST', () =>
  //   describe('when not logged in', () => {
  //     it('creates a user', () =>
  //       request(app)
  //         .post('/api/users')
  //         .send({
  //           email: 'beth@secrets.org',
  //           password: '12345'
  //         })
  //         .expect(201))

  //     it('redirects to the user it just made', () =>
  //       request(app)
  //         .post('/api/users')
  //         .send({
  //           email: 'eve@interloper.com',
  //           password: '23456',
  //         })
  //         .redirects(1)
  //         .then(res => expect(res.body).to.contain({
  //           email: 'eve@interloper.com'
  //         })))
  //   }))
