const express = require('express')
const config = require('../../config')
const { User, Dog, Client, Walk } = require('../models/db')

const router = new express.Router()

router.get('/users', (req, res) => {
  User.findAll({order: [[ 'createdAt', 'ASC' ]]})
    .then(users => {
      res.status(200).json(users.map(user => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          admin: user.admin,
          phone: user.phone,
          walker: user.walker
        }
      }))
    })
    .catch(err => {
      console.log('users findall failure, error is:', err)
      res.status(500).json({error: err})
    })
})

router.post('/users', (req, res) => {
  console.log('api users post, reqbody', req.body)
  let adjustment
  if (req.body.update === 'admin') adjustment = {admin: !req.body.user.admin}
  if (req.body.update === 'walker') adjustment = {walker: !req.body.user.walker}
  User.update(
    adjustment,
    {where: {id: req.body.user.id},
      returning: true,
      plain: true}
    )
    .then(user => {
      console.log('we have just updated a user, user is:', user)
      return User.findAll({order: [[ 'createdAt', 'ASC' ]]})
    })
    .then(users => {
      res.status(200).json(users.map(user => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          admin: user.admin,
          walker: user.walker
        }
      }))
    })
    .catch(err => {
      console.log('user update failure, error is:', err)
      res.status(500).json({error: err})
    })
})

const cloudinary = require('cloudinary')
cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.cloud_api_key,
  api_secret: config.cloud_api_secret
})
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage })

router.post('/dog-upload', upload.single('file'), (req, res) => {
  console.log('req.file is:', req.file)
  console.log('req body?', req.body)
  // dogs db not implemented yet.
  // res.sendStatus(200)
  cloudinary.v2.uploader.upload(req.file.path, (err, result) => {
    if (err) console.log('cloudinary upload error:', err)
    let adjustment = {photo: result.url}
    Dog.update(
      adjustment,
      {where: {id: req.body.id},
        returning: true,
        plain: true}
      )
      .then(dog => {
        console.log('dog photo update result:', dog)
        res.status(200).json({dog: dog[1]})
      })
      .catch(err => {
        console.log('dog photo update err:', err)
        res.status(500).json({err})
      })
  })
})

function promiseMap (xs, f) {
  const reducer = (promise, x) =>
    promise.then(ysAcc => f(x).then(y => ysAcc.push(y) && ysAcc))
  return xs.reduce(reducer, Promise.resolve([]))
}

router.post('/clients', (req, res) => {
  function writeToDB (client) {
    return Client.findCreateFind({
      where: {email: client.email},
      include: [ Dog ],
      defaults: client
    })
    .spread((user, created) => user)
  }

  promiseMap(req.body, writeToDB)
    .then(resp => {
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

router.get('/clients', (req, res) => {
  Client.findAll({include: [ Dog ]})
    .then(resp => {
      res.status(200).json({list: resp})
    })
    .catch(err => {
      console.log('error finding all clients in get api/clients', err)
      res.status(500).json({err})
    })
})

router.post('/client-update', (req, res) => {
  console.log('client update body is:', req.body)
  const client = req.body
  const dbUpdates = []
  dbUpdates.push(Client.update(client, {where: {id: client.id}}))
  client.dogs.forEach(dog => {
    dbUpdates.push(Dog.update(dog, {where: {clientId: client.id}}))
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

router.post('/assign', (req, res) => {
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

router.get('/assign', (req, res) => {
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

router.get('/dogs', (req, res) => {
  console.log('req headers for dogs route:', req.headers)
  Walk.findAll({
    where: {
      userId: req.headers.id,
      date: {
        $lt: new Date(),
        $gt: new Date().setHours(0, 0, 0, 0)
      }
    },
    include: [{model: Client}]
  })
    .then(walks => {
      const clients = walks[0].clients
      if (clients.length < 1) return res.status(200).json({msg: 'No dogs assigned today.'})
      const dogReqs = clients.map(client => client.getDogs())
      Promise.all(dogReqs)
        .then(dogs => {
          dogs = dogs
            .reduce((a, b) => a.concat(b), [])
            .map(dog => {
              let client = clients.find(c => c.id === dog.clientId)
              // This is depressing.
              const doggy = {
                id: dog.id,
                name: dog.name,
                breed: dog.breed,
                dob: dog.dob,
                photo: dog.photo,
                gender: dog.gender,
                recall: dog.recall,
                desexed: dog.desexed,
                vaccinated: dog.vaccinated,
                vacdate: dog.vacdate,
                insurance: dog.insurance,
                insurer: dog.insurer,
                medications: dog.medications,
                injuries: dog.injuries,
                issues: dog.issues,
                allergies: dog.allergies,
                notes: dog.notes,
                address: client.address,
                emergency: client.emergency,
                owner: client.name,
                phone: client.phone,
                pickupdetails: client.pickupdetails,
                vet: client.vet
              }
              return doggy
            })
          res.status(200).json({list: dogs})
        })
    })
    .catch(err => {
      console.log('err from trying to find walks.')
      res.status(500).json({err, msg: 'Unable to find any walks assigned to you today.'})
    })
})

module.exports = router
// Find walks for specific walker (inc clients walked)
// Walk.findAll({
//   where: {userId: 1},
//   include: [{
//     model: Client
//   }]
// })
// .then(walks => {
//   console.log('all walks with user id 1:', walks)
//   res.status(200).json({walks})
// })
// Find walks for a specific client.
// Client.find({where: {id: 2}})
//   .then(client => {
//     return client.getWalks()
//   })
//   .then(walks => {
//   })
