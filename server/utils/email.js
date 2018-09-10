const nodemailer = require('nodemailer')
const config = require('../../config')

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport(config.mail)

const forgotPassEmail = (email, passToken) => {
  console.log('forgotPassEmail func, email:', email, 'passToken:', passToken)
  if (!email) return Promise.resolve({messageId: 0, response: 'no email address provided.'})
  let html = `<div>Hi there, someone requested a password reset on your Tom and Captain account.</div>
  <div>Please <a href="http:/45.77.234.236/reset/${passToken}">click here</a> to reset your password. (or copy/paste this address into your browser: http:/45.77.234.236/reset/${passToken})</div>
  <div>If you did not request a password reset, feel free to ignore this email, your password will remain unchanged.</div>`

  let mailOptions = {
    from: config.outgoingEmail,
    html,
    to: email,
    subject: 'Tom and Captain password reset'
  }
  return transporter.sendMail(mailOptions)
}

module.exports.forgotPassEmail = forgotPassEmail
