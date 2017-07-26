const request = require('supertest') 
    , {expect} = require('chai')
    , db = require('APP/db')
    , app = require('./start')

    const supertest = require("supertest-as-promised");


    const Review = db.model("review");

  describe('All them routes', () => {

    before('Await database sync', () => db.didSync)
    afterEach('Clear the tables', () => db.truncate({ cascade: true }))


        let agent
        beforeEach("Set up agent for testing", () => {
            agent = supertest(app);
        })


        describe('api routes', () => {

            let greatePower;
            let terriblePower;
            beforeEach('Seed Reviews', () => {
                const reviews = [
                    {title: 'Fire Power', text: "Throw fire from my palms", stars: 5},
                    {title: 'Ice Power', text: "NOT LIT", stars: 1}

                ];
                return Review.bulkCreate(reviews, {returning: true})
                    .then(createdReviews => {
                        greatPower = reviews[0].id;
                        terriblePower = reviews[1].id;
                    });
            });

    
            describe('Reviews', () => {

                it('serves up all users on request to GET /', () => {
                   return agent
                        .get('/api/review')
                        .expect(200)
                        .then(res => {
                            expect(res.body).to.be.an('array');
                            expect(res.body.length).to.be.equal(2);
                            expect(res.body).to.contain.a.thing.with('id', greatePower);
                            expect(res.body).to.contain.a.thing.with('id', terriblePower);
                        });
                });

                it('updates a user at PUT /{{usersId}}, sending a 201 response', () => {
                    return agent
                        .put(`/review/${greatPower}`)
                        .send({
                            text: 'This is hella lit'
                        })
                        .expect(201)
                        .then(res => {return Review.findById(greatPower);})
                        .then(review => {
                            expect(review.text).to.be.equal('This is hella lit');
                        });
                });

                it("creates a new Review via a POST request", () => {
                    return agent
                        .post("/api/review")
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
                        })
                })
                

            });

            // describe('messages', () => {

            //     // find all messages whose `to` field matches the variable ID

            //     it('serves up all messages to a specific user on GET /to/{{recipientId}}', () => {
            //         return agent
            //             .get(`/messages/to/${obama}`)
            //             .expect(200)
            //             .then(res => {
            //                 expect(res.body).to.be.an('array');
            //                 expect(res.body.length).to.be.equal(1);
            //                 expect(res.body[0].body).to.be.equal('WAAASSUUUUPP??');
            //             });
            //     });

            //     // find all messages whose `from` field matches the variable ID

            //     it('serves up all messages from a specific sender on GET /from/{{senderId}}', () => {
            //         return agent
            //             .get(`/messages/from/${obama}`)
            //             .expect(200)
            //             .then(res => {
            //                 expect(res.body).to.be.an('array');
            //                 expect(res.body.length).to.be.equal(2);
            //                 expect(res.body).to.contain.a.thing.with.property('body', 'HEYOOOOOOO');
            //                 expect(res.body).to.contain.a.thing.with.property('body', 'nmu?');
            //             });
            //     });

            //     // remember eager loading?

            //     it('serves up all messages—WITH FILLED IN REFERENCES—to a specific user on GET /to/{{recipientId}}', () => {
            //         return agent
            //             .get(`/messages/to/${obama}`)
            //             .expect(200)
            //             .then(res => {
            //                 expect(res.body).to.be.an('array');
            //                 expect(res.body.length).to.be.equal(1);
            //                 expect(res.body[0].from.email).to.be.equal('biden@gmail.com');
            //                 expect(res.body[0].to.email).to.be.equal('obama@gmail.com');
            //             });
            //     });

            //    it(`serves up all messages from a specific sender on GET /from/{{senderId}}
            //         and uses the Message model static getAllWhereSender in the process`, () => {

            //         // http://sinonjs.org/docs/#spies
            //         const getAllWhereSenderSpy = sinon.spy(Message, 'getAllWhereSender');

            //         return agent
            //             .get(`/messages/from/${obama}`)
            //             .expect(200)
            //             .then(res => {

            //                 expect(res.body).to.be.an('array');
            //                 expect(res.body.length).to.be.equal(2);

            //                 expect(getAllWhereSenderSpy.called).to.be.equal(true);
            //                 expect(getAllWhereSenderSpy.calledWith(obama.toString())).to.be.equal(true);

            //                 getAllWhereSenderSpy.restore();

            //             });

            //     });

            //     it('adds a new message on POST /, responding with 201 and created message', () => {

            //         return agent
            //             .post('/messages')
            //             .send({
            //                 fromId: biden,
            //                 toId: obama,
            //                 body: 'You are my best friend. I hope you know that.'
            //             })
            //             .expect(201)
            //             .then(res => {
            //                 const createdMessage = res.body;
            //                 return Message.findById(createdMessage.id)
            //             })
            //             .then(foundMessage => {
            //                 expect(foundMessage.body).to.be.equal('You are my best friend. I hope you know that.');
            //             });

            //     });

            // });

        })});








// const request = require('supertest') 
//     , {expect} = require('chai')
//     , db = require('APP/db')
//     , app = require('./start')

// describe("ORDERS API", () => {
//    before("Wait for the database to sync", () => {db.didSync})
//    afterEach("Truncate the databases", () => {db.truncate({cascade: true})})

// describe("POST Route", () => {
//     it("Creates a new review, adds it to the database",() => {
//         it("Makes a Person", () =>{
//             request(app)
//                 .post('/api/reviews')
//                 .send({
//                     title: "fart maker",
//                     text: "Damn I make the illest farts",
//                     stars: "5",
//                     date: (new Date).getDate()
//                     })
//                 .expect(201)
//             })
//       })
//   })

// describe("PUT request", () => {
//     it("Either Changes or Doesn't Change a Review", () => {
//         request(app)
//         .put(`/api/reviews/1`)
//         .send({
//             title: "WHAT IS UP HOMIEEE",
//             text: "DAMN MY FARTS ARE LITTT",
//             stars: "2",
//             date: (new Date).getTime()
//         })
//         .expect(201);
//     })
// })
