const request = require('supertest')
    , { expect } = require('chai')
    , db = require('APP/db')
    , app = require('./start')

const supertest = require('supertest-as-promised')


const Review = db.model('review')

import chai from 'chai'
import chaiProperties from 'chai-properties'
import chaiThings from 'chai-things'
chai.use(chaiProperties)
chai.use(chaiThings)

describe('Backend', () => {
    before('Await database sync', () => db.didSync)
    afterEach('Clear the tables', () => db.truncate({ cascade: true }))

    let agent
    beforeEach('Set up agent for testing', () => {
        agent = supertest(app)
    })

    describe('routes', () => {
        let firePowerID
        let terriblePowerID
        beforeEach('Seed Reviews', () => {
            const reviews = [
                { title: 'Fire Power', text: "Throw fire from person's palms", stars: 5 },
                { title: 'Ice Power', text: "Throw's ice from person's palms", stars: 1 }
            ]
            return Review.bulkCreate(reviews, { returning: true })
                .then(createdReviews => {
                    firePowerID = createdReviews[0].id
                    terriblePowerID = createdReviews[1].id
                })
        })


        describe('for reviews', () => {
            it('serves up all users on request to GET /', () => agent
                .get('/api/reviews')
                .expect(201)
                .then(res => {
                    expect(res.body).to.be.an('array')
                    expect(res.body.length).to.be.equal(2)
                    expect(res.body).to.contain.a.thing.with('id', firePowerID)
                    expect(res.body).to.contain.a.thing.with('id', terriblePowerID)
                }))

            it('updates a user at PUT /{{usersId}}, sending a 201 response', () => agent
                .put(`/api/reviews/${firePowerID}`)
                .send({
                    text: 'This spits fire, and does other stuff'
                })
                .expect(201)
                .then(res => { return Review.findById(firePowerID); })
                .then(review => {
                    expect(review.text).to.be.equal(`Throw fire from person's palms`);
                }))

            it('creates a new Review via a POST request', () => agent
                .post("/api/reviews")
                .send({
                    title: "Throw Rocks Power",
                    text: "Individual is able to throw rocks at enemies",
                    stars: 3,
                })
                .expect(201)
                .then(res => {
                    const newReview = res.body;
                    return Review.findById(newReview.id)
                })
                .then(foundReview => {
                    expect(foundReview.title).to.be.equal("Throw Rocks Power")
                    expect(foundReview.text).to.be.equal("Individual is able to throw rocks at enemies")
                    expect(foundReview.stars).to.be.equal(3)
                }))
        })
    })
})
