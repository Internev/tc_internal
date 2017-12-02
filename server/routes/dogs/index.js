const dogs = require('express').Router()
const config = require('../../../config')
const { User, Dog, Client, Walk } = require('../../models/db')

dogs.get('/all', (req, res) => {
  Dog.findAll({include: [ Client ]})
  .then(dogs => {
    console.log('\n\nDogs from findAll:', dogs)
    res.status(200).json({dogs})
  })
  .catch(err => {
    console.log('Error finding all dogs:', err)
    res.status(500).json({err})
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

dogs.post('/upload', upload.single('file'), (req, res) => {
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

dogs.get('/', (req, res) => {
  console.log('req headers for dogs route:', req.headers)
  Walk.findAll({
    where: {
      userId: req.headers.id,
      date: {
        $lt: new Date(),
        $gt: new Date().setHours(0, 0, 0, 0)
      }
    },
    include: [{model: Dog}]
  })
    .then(walks => {
      // console.log('\n\nwalks is:', walks)
      const dogs = walks[0].dogs
      if (dogs.length < 1) return res.status(200).json({msg: 'No dogs assigned today.'})
      const dogReqs = dogs.map(dog => dog.getClient())
      Promise.all(dogReqs)
      .then(clients => {
        res.status(200).json({clients, dogs})
      })
    })
    .catch(err => {
      console.log('err from trying to find walks.')
      res.status(500).json({err, msg: 'Unable to find any walks assigned to you today.'})
    })
})

dogs.post('/comment', (req, res) => {
  Dog.findOne({where: {id: req.body.dogId}})
    .then(dog => {
      const comments = dog.comments ? [...dog.comments] : []
      comments.push({name: req.body.name, msg: req.body.comment})
      return dog.update({
        comments
      })
    })
    .then(dog => {
      res.status(200).json({dog})
    })
    .catch(err => {
      console.log('Error updating dog comment:', err)
      res.status(500).json({err})
    })
})

module.exports = dogs
