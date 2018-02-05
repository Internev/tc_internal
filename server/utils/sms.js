const config = require('../../config')
const esendex = require('esendex')(config.sms)

const messages = {
  accountreference: 'EX0209145'
}

function sendSMS (name, gender, number, type) {
  gender = gender === 'Male' ? 'his' : 'her'
  if (type === 'picked up') {
    messages.message = [{
      to: '0414641576',
      body: `Hi there, letting you know that ${name} has just been picked up for ${gender} adventure!`
    }]
  } else if (type === 'dropped off') {
    messages.message = [{
      to: '0414641576',
      body: `${name} has returned from ${gender} adventure. Thank you, Tom and Captain.`
    }]
  }
  if (messages.message) {
    esendex.messages.send(messages, function (err, response) {
      if (err) return console.log('error: ', err)
      console.dir(response)
    })
  }
}

module.exports.sendSMS = sendSMS
