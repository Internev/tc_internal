const assign = require('express').Router()
// const config = require('../../config')
const { User, Dog, Client, Walk } = require('../../models/db')

assign.post('/', (req, res) => {
  // console.log('\n\nassign req body is:', req.body)
  const walker = req.body.walker
  const dogs = req.body.dogs
  const date = new Date(req.body.date)
  const scheduledDogs = req.body.scheduledDogs
  const comment = req.body.comment || ''
  const walkObj = {
    userId: walker.id,
    date: date.setHours(2, 0, 0, 0),
    dogs,
    comment
  }

  Walk.findOne({
    where: {
      userId: walker.id,
      date: {
        $lt: date.setHours(23, 59, 59, 0),
        $gt: date.setHours(0, 0, 0, 0)
      }
    }
  })
  .then(walk => {
    if (walk) {
      return walk.update({
        comment
      }).then(walk => {
        return walk.setDogs(dogs.map(dog => dog.id))
      })
    } else {
      return Walk.create(walkObj)
      .then(walk => {
        return walk.setDogs(dogs.map(dog => dog.id))
      })
    }
  })
  .then(() => {
    return Walk.findOne({
      where: {
        userId: null,
        date: {
          $lt: date.setHours(23, 59, 59, 0),
          $gt: date.setHours(0, 0, 0, 0)
        }
      }
    })
    .then(walk => {
      if (walk) {
        return walk.setDogs(scheduledDogs.map(dog => dog.id))
      } else {
        walkObj.userId = null
        walkObj.dogs = scheduledDogs
        return Walk.create(walkObj)
        .then(walk => {
          return walk.setDogs(scheduledDogs.map(dog => dog.id))
        })
      }
    })
  })
  .then(() => {
    Walk.findAll({
      where: {
        date: {
          $lt: date.setHours(23, 59, 59, 0),
          $gt: date.setHours(0, 0, 0, 0)
        }
      },
      include: [{model: Dog, include: [{model: Client}]}, {model: User}]
    })
    .then(walks => {
      if (!walks) return res.status(200).json({walks: []})
      res.status(200).json({walks})
    })
  })
    .catch(err => {
      console.log('\n\nassign error from db:', err)
      res.status(500).json({err})
    })
})

assign.get('/', (req, res) => {
  console.log('\n\n\nassign get headers:', req.headers)
  const date = req.headers.scheduledate
    ? new Date(req.headers.scheduledate)
    : new Date()
  console.log('\n\n\ndate is set to:', date, '\n\n\n')
  Walk.findOne({
    where: {
      userId: req.headers.id,
      date: {
        $lt: date.setHours(23, 59, 59, 0),
        $gt: date.setHours(0, 0, 0, 0)
      }
    },
    include: [{model: Dog, include: {model: Client}}]
  })
  .then(walk => {
    // console.log('\n\nAssign get ound walk:', walk)
    if (walk) {
      res.status(200).json({walk})
      // walk.getDogs()
      // .then(dogs => {
      //   // console.log('\n\n\nassign get dogs:\n', dogs)
      //   const dogReqs = dogs.map(dog => dog.getClient())
      //   Promise.all(dogReqs)
      //   .then(clients => {
      //     // console.log('\n\n****\nreturn clients now., Clients:', clients)
      //     res.status(200).json({clients, dogs})
      //   })
      // })
    } else {
      res.status(200).json({walk: {dogs: []}})
    }
  })
  .catch(err => {
    console.log('api/assign get db error:', err)
    res.status(500).json({err})
  })
})

module.exports = assign
