const crypto = require('crypto')

module.exports.genRandom = (length = 24, user) => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(Math.ceil(length / 2), (err, buf) => {
      if (err) {
        reject(err)
      } else {
        resolve([buf.toString('hex'), user])
      }
    })
  })
}
