const express = require('express')
const config = require('../../config')
const { User } = require('../models/db')

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
const fs = require('fs')

router.post('/dog-upload', upload.single('file'), (req, res) => {
  console.log('req.file is:', req.file)
  cloudinary.v2.uploader.upload(req.file.path, (err, result) => {
    if (err) console.log('cloudinary upload error:', err)
    console.log('cloudinary result:', result)
    res.sendStatus(200)
  })
  // no formdata method
  // var data = ''
  //
  // req.on('data', function (chunk) {
  //   data += chunk
  // })
  //
  // req.on('end', function () {
  //   console.log('File uploaded')
  //   fs.writeFile('./uploads/testy.jpg', data, 'binary', (err) => {
  //     if (err) console.log('file write err', err)
  //   })
  //   res.sendStatus(200)
  // })
})
module.exports = router
