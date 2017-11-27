const assign = require('express').Router()
// const config = require('../../config')
const { User, Dog, Client, Walk } = require('../../models/db')

assign.post('/', (req, res) => {
  console.log('\n\nassign req body is:', req.body)
  const walkObj = {
    userId: req.body.walker.id,
    date: new Date()
  }
  Walk.findOne({
    where: {
      userId: req.body.walker.id,
      date: {
        $lt: new Date(),
        $gt: new Date().setHours(0, 0, 0, 0)
      }
    },
    include: [{model: Client}]
  })
  .then(walk => {
    if (walk) {
      return walk.setClients(req.body.clients.map(client => client.id))
    } else {
      return Walk.create(walkObj)
      .then(walk => {
        return walk.setClients(req.body.clients.map(client => client.id))
      })
    }
  })
  .then(walk => {
    res.status(200).json({walk})
  })
  .catch(err => {
    console.log('\n\nassign error from db:', err)
    res.status(500).json({err})
  })
})

assign.get('/', (req, res) => {
  Walk.findOne({
    where: {
      userId: req.headers.id,
      date: {
        $lt: new Date(),
        $gt: new Date().setHours(0, 0, 0, 0)
      }
    },
    include: [{model: Client}]
  })
  .then(walk => {
    if (walk) {
      walk.getClients()
      .then(clients => {
        const dogReqs = clients.map(client => client.getDogs())
        Promise.all(dogReqs)
        .then(dogs => {
          // clients = clients.map(client => {
          //   client.dogs = [`i'm a dog lul`]
          //   // client.dogs = dogs.filter(dog => client.id === dog.clientId)
          //   console.log('client about to be mapped is:', client, client.dogs)
          //   return client
          // })
          console.log('\n\n****\nreturn clients now.')
          res.status(200).json({clients, dogs})
        })
      })
    } else {
      res.status(200).json({clients: []})
    }
  })
  .catch(err => {
    console.log('api/assign get db error:', err)
    res.status(500).json({err})
  })
})

module.exports = assign
