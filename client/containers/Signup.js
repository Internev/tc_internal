import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/lib/Button'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'
import { signupUser } from '../redux/creators/userCreators'

class Signup extends React.Component {
  static isPrivate = false
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      pass: '',
      passConfirm: ''
    }
    this.getEmailValid = this.getEmailValid.bind(this)
    this.getPassValid = this.getPassValid.bind(this)
    this.getPassConfirmValid = this.getPassConfirmValid.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }
  componentDidUpdate () {
    console.log('signup props:', this.props)
    if (this.props.user.auth.success) {
      this.props.dispatch({type: 'SIGNUP_REDIRECT'})
      this.props.history.push('/login')
    }
  }
  handleChange (e) {
    const change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
  }
  handleFormSubmit (e) {
    e.preventDefault()
    const creds = {
      name: 'Test Account',
      email: this.state.email,
      password: this.state.pass
    }
    this.props.dispatch(signupUser(creds))
  }
  getEmailValid () {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) return 'success'
    return null
  }
  getPassValid () {
    if (this.state.pass.length > 5) return 'success'
    return null
  }
  getPassConfirmValid () {
    if (this.state.pass === this.state.passConfirm && this.state.passConfirm.length > 5) return 'success'
    if (this.state.passConfirm.length > 3) return 'warning'
    return null
  }
  render () {
    return (
      <div className='row'>
        <div className='col-md-3'></div>
        <div className='col-md-6 col-xs-12'>
          <h4 className=''>Welcome aboard, please create your account</h4>
          <div className='auth_feedback'>
            {this.props.user.auth.message}
          </div>
          <form>
            <FormGroup
              controlId='formBasicText'
              validationState={this.getEmailValid()}
            >
              <ControlLabel>Email:</ControlLabel>
              <FormControl
                type='text'
                value={this.state.email}
                name='email'
                placeholder='Email Address'
                onChange={e => this.handleChange(e)}
                />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup
              controlId='formBasicText'
              validationState={this.getPassValid()}
            >
              <ControlLabel>Password:</ControlLabel>
              <FormControl
                type='password'
                value={this.state.pass}
                name='pass'
                placeholder='Password'
                onChange={e => this.handleChange(e)}
                />
              <FormControl.Feedback />
              {this.getPassValid() !== 'success'
                ? <HelpBlock>Password must be at least 6 characters</HelpBlock>
                : null
              }
            </FormGroup>
            <FormGroup
              controlId='formBasicText'
              validationState={this.getPassConfirmValid()}
            >
              <ControlLabel>Password:</ControlLabel>
              <FormControl
                type='password'
                value={this.state.passConfirm}
                name='passConfirm'
                placeholder='Password'
                onChange={e => this.handleChange(e)}
                />
              <FormControl.Feedback />
                {this.getPassConfirmValid() !== 'success'
                  ? <HelpBlock>Passwords must match</HelpBlock>
                  : null
                }
            </FormGroup>
            <Button type="submit" onClick={e => this.handleFormSubmit(e)}>
              Sign up
            </Button>
          </form>
          <div className=''>Already have an account? <Link to='/login'>log in here</Link>.</div>
        </div>
        <div className='col-md-3'></div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Signup)
