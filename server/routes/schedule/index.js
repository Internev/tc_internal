const assign = require('express').Router()
// const config = require('../../config')
const { User, Dog, Client, Walk } = require('../../models/db')
const subWeeks = require('date-fns/sub_weeks')

assign.post('/', (req, res) => {
  // console.log('\n\n\nSchedule post subroute hit, req.body:', req.body)
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

assign.get('/', (req, res) => {
  let date = new Date(req.headers.scheduledate)
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
    if (!walks) return res.status(200).json({walks: null})
    res.status(200).json({walks})
  })
  .catch(err => {
    console.log('\n\nerror getting schedule:', err)
    res.status(500).json({err})
  })
})

assign.get('/all', (req, res) => {
  const startDate = new Date(req.headers.startdate)
  Walk.findAll({
    where: {
      date: {$gt: startDate}
    },
    include: [{model: Dog}, {model: User}]
  })
  .then(walks => {
    // console.log('\n\n\n/schedule/all returns: walks', walks)
    res.status(200).json({events: walks})
  })
})

module.exports = assign
