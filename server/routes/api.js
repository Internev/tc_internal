const express = require('express')
const config = require('../../config')
const { User, Dog, Client } = require('../models/db')

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
  res.sendStatus(200)
  // cloudinary.v2.uploader.upload(req.file.path, (err, result) => {
  //   if (err) console.log('cloudinary upload error:', err)
  //   let adjustment = {photo: result.url}
  //   Dog.update(
  //     adjustment,
  //     {where: {id: req.body.id},
  //       returning: true,
  //       plain: true}
  //     )
  //     .then(res => {
  //       console.log('dog photo update result:', res)
  //       res.status(200).json({dog: res.data})
  //     })
  //     .catch(err => {
  //       console.log('dog photo update err:', err)
  //       res.status(500).json({err})
  //     })
  // })
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
      Client.findAll()
        .then(resp => {
          res.status(200).json({list: resp})
        })
        .catch(err => {
          console.log('error finding all clients in csv upload.', err)
          res.status(500).json({err})
        })
    })
  // let dbWrites = []
  // req.body.forEach(client => {
  //   let {dogs, ...c} = client
  //   console.log('client pruned of dogs is:', c)
  //   // if (c.name) dbWrites.push(Client.findCreateFind({where: {email: c.email}}, c))
  //   if (c.name) {
  //     dbWrites.push(Client.findCreateFind({
  //       where: {email: client.email},
  //       include: [ Dog ],
  //       defaults: client
  //     }))
  //   }
  // })
  // Promise.all(dbWrites)
  //   .then(resp => {
  //     resp = resp.reduce((a, v) => {
  //       a.push(v[0])
  //       return a
  //     }, [])
  //     res.status(200).json({list: resp})
  //   })
  //   .catch(err => {
  //     console.log('err from promise all dbwrites:', err)
  //     res.sendStatus(500)
  //   })
})

router.get('/clients', (req, res) => {
  Client.findAll()
    .then(resp => {
      res.status(200).json({list: resp})
    })
    .catch(err => {
      console.log('error finding all clients in get api/clients', err)
      res.status(500).json({err})
    })
})

module.exports = router
