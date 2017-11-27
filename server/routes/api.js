const express = require('express')
// const config = require('../../config')
// const { User, Dog, Client, Walk } = require('../models/db')
const users = require('./users')
const clients = require('./clients')
const assign = require('./assign')
const dogs = require('./dogs')

const router = new express.Router()

router.use('/users/', users)
router.use('/clients', clients)
router.use('/clients', clients)
router.use('/assign', assign)
router.use('/dogs', dogs)

module.exports = router
