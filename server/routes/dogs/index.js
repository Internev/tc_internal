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
                comments: dog.comments,
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
