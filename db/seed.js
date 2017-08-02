'use strict'
const db = require('APP/db')
  , { User, Product, Review, Order, ProductsInOrder, Promise } = db
  , { mapValues } = require('lodash')
function seedEverything() {
  const seeded = {
    users: users(),
    products: products()
  }
  seeded.orders = orders(seeded)
  seeded.productsInOrder = productsInOrder(seeded)
  seeded.reviews = reviews(seeded)
  return Promise.props(seeded)
}
const users = seed(User, {
  brian: {
    email: 'brian@brian.com',
    name: 'brian',
    admin: true,
    password: '1234'
  },
  barack: {
    name: 'Barack Obama',
    email: 'obama@whitehouse.gov',
    admin: false,
    password: 'hello'
  },
})
const products = seed(Product, {
  fire: {
    name: 'Fire',
    imageUrl: 'https://c1.staticflickr.com/5/4004/5164132293_aa7453ce3a_b.jpg',
    category: 'elemental',
    description: 'shoot fire out of palms',
    price: 100000,
    count: 10,
  },
  ice: {
    name: 'Ice',
    imageUrl: 'https://i.ytimg.com/vi/BwZlVwfz4UY/maxresdefault.jpg',
    category: 'elemental',
    description: 'shoot ice out of palms',
    price: 1000000,
    count: 10,
  },
  wind: {
    name: 'Wind',
    imageUrl: 'http://static.tvtropes.org/pmwiki/pub/images/Funnel_5498.jpg',
    category: 'elemental',
    description: 'shoot wind out of palms',
    price: 9999999,
    count: 1,
  },
  invisibility: {
    name: 'Invisibility',
    imageUrl: 'http://i.dailymail.co.uk/i/pix/2015/01/26/2519277000000578-2927503-image-a-13_1422313512226.jpg',
    category: 'adaptation',
    description: 'The user can become invisible when in/on/touching air.',
    price: 23423,
    count: 12,
  },
  'stench generation': {
    name: 'Stench Generation',
    imageUrl: 'https://vignette3.wikia.nocookie.net/powerlisting/images/6/6e/Spongebob_Suds_Breath.png/revision/latest?cb=20140428063132',
    category: 'adaptation',
    description: 'Power to instantly evacuate a room.',
    price: 23423,
    count: 12,
  },
  flight: {
    name: 'Flight',
    imageUrl: 'http://cdn.smosh.com/sites/default/files/ftpuploads/bloguploads/flight-better-dude.jpg',
    category: 'adaptation',
    description: 'Power to fly.',
    price: 13400,
    count: 12
  },
  telekinesis: {
    name: 'Telekinesis',
    imageUrl: 'http://d.ibtimes.co.uk/en/full/1511845/telekinesis-mind-control.jpg',
    category: 'mental',
    description: 'Power to levitate objects up to size of a car.',
    price: 1340000,
    count: 2
  },
  teleportation: {
    name: 'Teleportation',
    imageUrl: 'http://newdawnblog.com/wp-content/uploads/2016/09/469122042.jpg',
    category: 'mental',
    description: 'Power to teleport to a spot within your vision',
    price: 13400,
    count: 1
  },
  precognition: {
    name: 'Precognition',
    imageUrl: 'http://psychicbloggers.com/wp-content/uploads/2012/04/19815801.jpg',
    category: 'mental',
    description: 'Power to perceive future events.',
    price: 13400,
    count: 12
  }
})
const reviews = seed(Review,
  ({ users, products }) => ({
    'one': {
      title: 'WOW',
      text: 'wow this is so much fun I burned my house down!!',
      stars: 5,
      user_id: users.barack.id,
      product_id: products.fire.id
    },
    'two': {
      title: 'wind sucks',
      text: 'dont buy overpriced :(',
      stars: 1,
      user_id: users.brian.id,
      product_id: products.wind.id
    }
  })
)
const orders = seed(Order,
  ({ users }) => ({
    'order1': {
      user_id: users.brian.id,    // users.barack is an instance of the User model
      // that we created in the user seed above.
      // The seed function wires the promises so that it'll
      // have been created already.
      status: 'delivered' // Same thing for things.
    }
  })
)
const productsInOrder = seed(ProductsInOrder,
  // We're specifying a function here, rather than just a rows object.
  // Using a function lets us receive the previously-seeded rows (the seed
  // function does this wiring for us).
  //
  // This lets us reference previously-created rows in order to create the join
  // rows. We can reference them by the names we used above (which is why we used
  // Objects above, rather than just arrays).
  ({ products, orders }) => ({
    // The easiest way to seed associations seems to be to just create rows
    // in the join table.
    'order 1': {
      product_id: products.fire.id,    // users.barack is an instance of the User model
      // that we created in the user seed above.
      // The seed function wires the promises so that it'll
      // have been created already.
      order_id: orders.order1.id, // Same thing for things.
      unitPrice: products.fire.price
    }
  })
)
if (module === require.main) {
  db.didSync
    .then(() => db.sync({ force: true }))
    .then(seedEverything)
    .finally(() => process.exit(0))
}
class BadRow extends Error {
  constructor(key, row, error) {
    super(error)
    this.cause = error
    this.row = row
    this.key = key
  }
  toString() {
    return `[${this.key}] ${this.cause} while creating ${JSON.stringify(this.row, 0, 2)}`
  }
}
// seed(Model: Sequelize.Model, rows: Function|Object) ->
//   (others?: {...Function|Object}) -> Promise<Seeded>
//
// Takes a model and either an Object describing rows to insert,
// or a function that when called, returns rows to insert. returns
// a function that will seed the DB when called and resolve with
// a Promise of the object of all seeded rows.
//
// The function form can be used to initialize rows that reference
// other models.
function seed(Model, rows) {
  return (others = {}) => {
    if (typeof rows === 'function') {
      rows = Promise.props(
        mapValues(others,
          other =>
            // Is other a function? If so, call it. Otherwise, leave it alone.
            typeof other === 'function' ? other() : other)
      ).then(rows)
    }
    return Promise.resolve(rows)
      .then(rows => Promise.props(
        Object.keys(rows)
          .map(key => {
            const row = rows[key]
            return {
              key,
              value: Promise.props(row)
                .then(row => Model.create(row)
                  .catch(error => { throw new BadRow(key, row, error) })
                )
            }
          }).reduce(
          (all, one) => Object.assign({}, all, { [one.key]: one.value }),
          {}
          )
      )
      )
      .then(seeded => {
        console.log(`Seeded ${Object.keys(seeded).length} ${Model.name} OK`)
        return seeded
      }).catch(error => {
        console.error(`Error seeding ${Model.name}: ${error} \n${error.stack}`)
      })
  }
}
module.exports = Object.assign(seed, { users, orders, reviews, products })
