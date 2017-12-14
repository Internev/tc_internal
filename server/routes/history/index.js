const history = require('express').Router()
// const config = require('../../../config')
const { User, Dog, Client, Walk } = require('../../models/db')

history.get('/', (req, res) => {
  const userId = req.headers.userid
  Walk.findAll({
    where: {
      userId,
      date: {
        $lt: new Date().setHours(23, 59, 59, 0)
      }
    },
    include: [{
      model: Dog,
      include: [{model: Client}]
    }],
    order: [['date', 'DESC']]
  })
  .then(walks => {
    res.status(200).json({walks})
  })
  .catch(err => {
    console.log('history get error:', err)
    res.status(500).json({err})
  })
})

module.exports = history
