const users = require('express').Router()
// const config = require('../../../config')
const { User, Dog, Client, Walk } = require('../../models/db')

users.get('/', (req, res) => {
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

users.post('/', (req, res) => {
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

users.post('/delete', (req, res) => {
  User.destroy(
    {where: {id: req.body.user.id}}
  )
    .then(() => User.findAll({order: [[ 'createdAt', 'ASC' ]]}))
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
      console.log('user destroy failure, error is:', err)
      res.status(500).json({error: err})
    })
})

module.exports = users
