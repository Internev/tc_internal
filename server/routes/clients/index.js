const clients = require('express').Router()
const { User, Dog, Client, Walk } = require('../../models/db')

function promiseMap (xs, f) {
  const reducer = (promise, x) =>
    promise.then(ysAcc => f(x).then(y => ysAcc.push(y) && ysAcc))
  return xs.reduce(reducer, Promise.resolve([]))
}

clients.post('/', (req, res) => {
  function writeToDB (client) {
    return Client.findCreateFind({
      where: {email: client.email},
      include: [ Dog ],
      defaults: client
    })
    .spread((user, created) => {
      // handle update to dogs for known client.
      if (user.dogs.length !== client.dogs.length) {
        const dogReqs = client.dogs.map(dog => Dog.findCreateFind({
          where: {clientId: user.id, name: dog.name},
          defaults: dog
        }))
        Promise.all(dogReqs)
        .then(() => {
          return user
        })
      } else {
        return user
      }
    })
  }
  console.log('\n\nclients post req body:', req.body, '\n\n')
  promiseMap(req.body, writeToDB)
    .then(resp => {
      // console.log('\n\n************\n\nresponse from clients post promiseMap:', resp)
      Client.findAll({include: [ Dog ]})
        .then(resp => {
          res.status(200).json({list: resp})
        })
        .catch(err => {
          console.log('error finding all clients in csv upload.', err)
          res.status(500).json({err})
        })
    })
})

clients.get('/', (req, res) => {
  Client.findAll({include: [ Dog ], order: [['updatedAt', 'DESC']]})
    .then(resp => {
      res.status(200).json({list: resp})
    })
    .catch(err => {
      console.log('error finding all clients in get api/clients', err)
      res.status(500).json({err})
    })
})

clients.post('/update', (req, res) => {
  // console.log('client update body is:', req.body)
  const client = req.body
  const dbUpdates = []
  dbUpdates.push(Client.update(client, {where: {id: client.id}}))
  client.dogs.forEach(dog => {
    dbUpdates.push(Dog.update(dog, {where: {id: dog.id}}))
  })
  Promise.all(dbUpdates)
    .then(() => {
      return Client.findAll({include: [ Dog ]})
    })
    .then(resp => {
      res.status(200).json({list: resp})
    })
    .catch(err => {
      console.log('error updating single client from api/client-update', err)
      res.status(500).json({err})
    })
})

clients.post('/delete', (req, res) => {
  console.log('req.body.client to be deleted:', req.body.client)
  Client.destroy({where: {id: req.body.client.id}})
  .then(resp => {
    console.log('\n\nresponse from client destroy:', resp)
    res.sendStatus(200)
  })
  .catch(err => {
    console.log('error deleting client:', err)
    res.status(500).json({err})
  })
})

module.exports = clients
