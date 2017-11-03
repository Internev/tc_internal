import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/lib/Button'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'
import { loginUser } from '../redux/creators/userCreators'

class Login extends React.Component {
  static isPrivate = false
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      pass: ''
    }
    this.getEmailValid = this.getEmailValid.bind(this)
    this.getPassValid = this.getPassValid.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }
  componentDidUpdate () {
    if (this.props.user.auth.success) {
      this.props.history.push('/')
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
      email: this.state.email,
      password: this.state.pass
    }
    this.props.dispatch(loginUser(creds))
  }
  getEmailValid () {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) return 'success'
    return null
  }
  getPassValid () {
    if (this.state.pass.length > 5) return 'success'
    return null
  }
  render () {
    return (
      <div className='row'>
        <div className='col-md-3'></div>
        <div className='col-md-6 col-xs-12'>
          <h4 className=''>Welcome, please log in.</h4>
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
            <Button type="submit" onClick={e => this.handleFormSubmit(e)}>
              Sign up
            </Button>
          </form>
          <div className=''>No account yet? <Link to='/signup'>Sign up here</Link>.</div>
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

export default connect(mapStateToProps)(Login)
