const config = require('../../config')
const axios = require('axios')

function makeMessage (number, msg) {
  return {
    'messages': [
      {
        'source': 'javascript',
        'from': 'Tom + Captain',
        'body': msg,
        // 'to': number
        'to': '+61411111111' // test number.

      }
    ]
  }
}

function sendSMS (name, gender, number, type) {
  console.log('\n\nsendSMS Init\n\n')
  gender = gender === 'Male' ? 'his' : 'her'
  let msg
  if (type === 'picked up') {
    msg = makeMessage(number, `Hi there, letting you know that ${name} has just been picked up for ${gender} adventure!`)
  } else if (type === 'dropped off') {
    msg = makeMessage(number, `${name} has returned from ${gender} adventure. Thank you, Tom and Captain.`)
  }
  if (msg) {
    const options = {
      method: 'POST',
      url: 'https://rest.clicksend.com/v3/sms/send',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': config.sms.auth
      },
      data: msg
    }
    axios(options)
      .then(res => {
        console.log('sms response:', res)
      })
      .catch(err => {
        console.log('sms error:', err)
      })
  }
}

module.exports.sendSMS = sendSMS
