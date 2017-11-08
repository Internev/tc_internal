const express = require('express')
const validator = require('validator')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../../config')
const router = new express.Router()
const addMinutes = require('date-fns/add_minutes')
const { User, genHash } = require('../models/db')
const { genRandom } = require('../utils/crypto')
const { forgotPassEmail } = require('../utils/email')
const format = require('date-fns/format')
/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
// function validateSignupForm (payload) {
//   const errors = {}
//   let isFormValid = true
//   let message = ''
//
//   if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
//     isFormValid = false
//     errors.email = 'Please provide a correct email address.'
//   }
//
//   if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
//     isFormValid = false
//     errors.password = 'Password must have at least 8 characters.'
//   }
//
//   if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
//     isFormValid = false
//     errors.name = 'Please provide your name.'
//   }
//
//   if (!isFormValid) {
//     message = 'Check the form for errors.'
//   }
//
//   return {
//     success: isFormValid,
//     message,
//     errors
//   }
// }

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLoginForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false
    errors.email = 'Please provide your email address.'
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false
    errors.password = 'Please provide your password.'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

router.post('/signup', (req, res, next) => {
  // console.log('\n\n\n****\nThis is signup route, req is:', req.body)
  // const validationResult = validateSignupForm(req.body)
  // if (!validationResult.success) {
  //   return res.status(400).json({
  //     success: false,
  //     message: validationResult.message,
  //     errors: validationResult.errors
  //   })
  // }

  return passport.authenticate('local-signup', (err, user) => {
    if (err) {
      if (err.name === 'exists') {
        // the 409 HTTP status code is for conflict error
        return res.status(409).json({
          success: false,
          message: 'This email is already taken, please log in instead.',
          errors: {
            email: 'This email is already taken, please log in instead.'
          }
        })
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      })
    }

    return res.status(200).json({
      success: true,
      message: `Sign up successful, please log in.`,
      user
    })
  })(req, res, next)
})

router.post('/login', (req, res, next) => {
  const validationResult = validateLoginForm(req.body)
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message
        })
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      })
    }

    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: userData
    })
  })(req, res, next)
})

router.post('/token', (req, res, next) => {
  console.log('token request made, ', req.body)
  jwt.verify(req.body.token, config.jwtSecret, {maxAge: '30 days'}, (err, decoded) => {
    console.log('token jwt verify err', err, 'decoded', decoded)
    if (err) return res.status(401).end()
    if (decoded !== undefined) {
      const userId = decoded.sub

      // check if a user exists
      User.findById(userId)
      .then(user => {
        if (user) {
          console.log('user found that matches token', user)
          return res.json({user})
        }

        return res.status(401).end()
      })
    } else {
      return res.status(401).end()
    }
  })
})

router.post('/forgot', (req, res) => {
  User.findOne({where: {email: req.body.email}})
    .then(user => {
      return genRandom(12, user)
    })
    .then(([passToken, user]) => {
      const tokenDetails = {
        reset_password_token: passToken,
        reset_password_expires: addMinutes(new Date(), 30)
      }
      return User.update(
        tokenDetails,
        {where: {id: user.id},
          returning: true,
          plain: true}
      )
    })
    .then(([_, user]) => {
      return forgotPassEmail(user.email, user.reset_password_token)
    })
    .then(mailResult => {
      console.log('we sent an email!', mailResult)
      res.sendStatus(200)
    })
    .catch(err => {
      console.log('Error in forgot password route:', err)
      res.status(500).json({err})
    })
})

router.get('/reset', (req, res) => {
  User.findOne({where: {reset_password_token: req.headers.token}})
    .then(user => {
      user && format(user.reset_password_expires, 'x') > Date.now()
      ? res.status(200).json({resetToken: true})
      : res.status(200).json({resetToken: false})
    })
    .catch(err => {
      console.log('No password reset token found, token was:', req.headers.token, 'error:', err)
      res.status(200).json({
        resetToken: false
      })
    })
})

router.post('/reset', (req, res) => {
  let update = {
    password: genHash(req.body.password.trim()),
    reset_password_token: '',
    reset_password_expires: null
  }
  console.log('reset Pword, req.body is:', req.body)
  User.update(
    update,
    {where: {reset_password_token: req.body.token},
      returning: true,
      plain: true}
  )
  .then(([_, user]) => {
    console.log('user password reset updated, user is:', user)
    res.status(200).json({
      success: true,
      message: `Password reset, please log in.`,
      user
    })
  })
  .catch(err => {
    console.log('user password reset update error:', err)
    res.status(400).json({
      success: false,
      message: `Reset failed, please try again later.`,
      err
    })
  })
})

module.exports = router
