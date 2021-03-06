const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
const config = require('../../config')

const dbUrl = config.db

const db = new Sequelize(dbUrl)

const User = db.define('user', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  phone: Sequelize.STRING,
  password: Sequelize.STRING,
  admin: {type: Sequelize.BOOLEAN, defaultValue: false},
  walker: {type: Sequelize.BOOLEAN, defaultValue: true},
  reset_password_token: Sequelize.STRING,
  reset_password_expires: Sequelize.DATE
})

const Client = db.define('client', {
  name: Sequelize.STRING,
  email: {type: Sequelize.STRING, unique: true},
  address: Sequelize.STRING,
  phone: {type: Sequelize.STRING, allowNull: false},
  emergency: Sequelize.JSON,
  social: Sequelize.STRING,
  vet: Sequelize.JSON,
  pickupdetails: {type: Sequelize.STRING, defaultValue: ''},
  access: Sequelize.JSON,
  payment: {type: Sequelize.STRING, defaultValue: 'prepaid'}
})

const Dog = db.define('dog', {
  name: Sequelize.STRING,
  breed: Sequelize.STRING,
  dob: Sequelize.DATEONLY,
  photo: Sequelize.STRING,
  gender: Sequelize.STRING,
  recall: Sequelize.STRING,
  desexed: Sequelize.BOOLEAN,
  vaccinated: Sequelize.BOOLEAN,
  vacdate: Sequelize.STRING,
  insurance: Sequelize.BOOLEAN,
  insurer: Sequelize.STRING,
  medications: Sequelize.JSON,
  injuries: Sequelize.JSON,
  issues: Sequelize.JSON,
  allergies: Sequelize.JSON,
  notes: Sequelize.JSON,
  comments: Sequelize.JSON
})

const Walk = db.define('walk', {
  date: Sequelize.DATE,
  comment: Sequelize.JSON,
  sms: Sequelize.JSON
})

Client.Dog = Client.hasMany(Dog, {onDelete: 'cascade'})
Dog.belongsTo(Client, {onDelete: 'cascade'})

Walk.belongsTo(User)

Dog.belongsToMany(Walk, {through: 'dogwalk'})
Walk.belongsToMany(Dog, {through: 'dogwalk'})

db.sync()

const genHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

const genHashAsync = (password, cb) => {
  return bcrypt.hash(password, bcrypt.genSaltSync(8), null, cb)
}

const validPass = (password, storedPassword) => {
  return bcrypt.compareSync(password, storedPassword)
}

module.exports = {
  User,
  Client,
  Dog,
  Walk,
  genHash,
  genHashAsync,
  validPass
}
