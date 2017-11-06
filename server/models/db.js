const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
const config = require('../../config')

const dbUrl = config.db

const db = new Sequelize(dbUrl)

const User = db.define('user', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  admin: {type: Sequelize.BOOLEAN, defaultValue: false},
  walker: {type: Sequelize.BOOLEAN, defaultValue: true},
  reset_password_token: Sequelize.STRING,
  reset_password_expires: Sequelize.DATE
})

const Client = db.define('client', {
  name: Sequelize.STRING,
  address: Sequelize.STRING,
  phone: Sequelize.STRING,
  pickupdetails: Sequelize.STRING
})

const Dog = db.define('dog', {
  name: Sequelize.STRING,
  breed: Sequelize.STRING,
  dob: Sequelize.DATEONLY,
  photo: Sequelize.STRING,
  notes: Sequelize.JSON
})

Dog.belongsTo(Client, {
  onDelete: 'cascade',
  foreignKey: {
    field: 'owner',
    allowNull: false
  }
})

User.sync()
Client.sync()
Dog.sync()

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
  genHash,
  genHashAsync,
  validPass
}
//
// module.exports.User = User
// module.exports.Order = Order
// module.exports.Storedorder = Storedorder
// module.exports.Storegeo = Storegeo
// module.exports.genHash = genHash
// module.exports.genHashAsync = genHashAsync
// module.exports.validPass = validPass
