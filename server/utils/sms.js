const config = require('../../config')
const axios = require('axios')
const sharp = require('sharp')
const fs = require('fs-extra')

function makeMessage (number, msg) {
  return {
    'messages': [
      {
        'source': 'javascript',
        'from': 'Tom + Captain',
        'body': msg,
        // 'to': number
        'to': '+61412163365' // test number (Tom).

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

function sendMMS (name, gender, number, files, text) {

  gender = gender === 'Male' ? 'his' : 'her'
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': config.sms.auth
    }
  }

  Promise.all(files.map(({path}) => fs.readFile(path)))
    .then(fileData => Promise.all(fileData.map(f => sharp(f).resize(1080, 1080).min().toBuffer())))
    .then(resizedData => Promise.all(resizedData.map(d => {
      const file64 = d.toString('base64')
      options.url = 'https://rest.clicksend.com/v3/uploads?convert=mms'
      options.data = {
        content: file64
      }
      return axios(options)
    })))
    .then(res => Promise.all(res.map(r => {
      const imgPath = r.data.data._url
      options.url = 'https://rest.clicksend.com/v3/mms/send'
      options.data = {
        'media_file': imgPath,
        'messages': [
          {
            'source': 'javascript',
            'from': 'Tom + Captain',
            'body': text || `${name} on ${gender} adventure!`,
            'to': '+61414641576',
            // 'to': number,
            'subject': `${name} on ${gender} adventure!`,
            'country': 'AU'
          }
        ]
      }
      return axios(options)
    })))
    .then(res => {
      console.log('\n\nHave I sent the mms?\n', res)
    })
    .catch(err => {
      if (err) console.log('MMS failure:', err)
    })
}

module.exports.sendSMS = sendSMS
module.exports.sendMMS = sendMMS
