const assign = require('express').Router()
// const config = require('../../config')
const { User, Dog, Client, Walk } = require('../../models/db')

assign.post('/', (req, res) => {
  // console.log('\n\nassign req body is:', req.body)
  const walkObj = {
    userId: req.body.walker.id,
    date: new Date()
  }
  // res.sendStatus(200)
  Walk.findOne({
    where: {
      userId: req.body.walker.id,
      date: {
        $lt: new Date(),
        $gt: new Date().setHours(0, 0, 0, 0)
      }
    },
    include: [{model: Dog}]
  })
  .then(walk => {
    if (walk) {
      return walk.setDogs(req.body.dogs.map(dog => dog.id))
    } else {
      return Walk.create(walkObj)
      .then(walk => {
        return walk.setDogs(req.body.dogs.map(dog => dog.id))
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
    include: [{model: Dog}]
  })
  .then(walk => {
    if (walk) {
      walk.getDogs()
      .then(dogs => {
        // console.log('\n\n\nassign get dogs:\n', dogs)
        const dogReqs = dogs.map(dog => dog.getClient())
        Promise.all(dogReqs)
        .then(clients => {
          // console.log('\n\n****\nreturn clients now., Clients:', clients)
          res.status(200).json({clients, dogs})
        })
      })
    } else {
      res.status(200).json({clients: [], dogs: []})
    }
  })
  .catch(err => {
    console.log('api/assign get db error:', err)
    res.status(500).json({err})
  })
})

assign.post('/schedule', (req, res) => {
  console.log('\n\n\nSchedule post subroute hit, req.body:', req.body)
  let date = new Date(req.body.date)
  const walkObj = { date: date.setHours(1, 0, 0, 0) }
  Walk.findOne({
    where: {
      date: {
        $lt: date.setHours(23, 59, 59, 0),
        $gt: date.setHours(0, 0, 0, 0)
      }
    },
    include: [{model: Dog}]
  })
  .then(walk => {
    if (walk) {
      return walk.setDogs(req.body.dogs.map(dog => dog.id))
    } else {
      return Walk.create(walkObj)
      .then(walk => {
        return walk.setDogs(req.body.dogs.map(dog => dog.id))
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

assign.get('/schedule', (req, res) => {
  let date = new Date(req.headers.scheduledate)
  Walk.findOne({
    where: {
      date: {
        $lt: date.setHours(23, 59, 59, 0),
        $gt: date.setHours(0, 0, 0, 0)
      }
    },
    include: [{model: Dog}]
  })
  .then(walk => {
    if (!walk) return res.status(200).json({walk: null, dogs: []})
    return walk.getDogs()
    .then(dogs => {
      const dogReqs = dogs.map(dog => dog.getClient())
      Promise.all(dogReqs).then(clients => {
        res.status(200).json({walk, dogs, clients})
      })
    })
  })
  .catch(err => {
    console.log('\n\nerror getting schedule:', err)
    res.status(500).json({err})
  })
})

module.exports = assign
