import React from 'react'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'

class Login extends React.Component {
  static isPrivate = false
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      pass: ''
    }
    this.getValidationState = this.getValidationState.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidUpdate () {
    console.log('login state:', this.state)
  }
  handleChange (e) {
    const change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
  }
  getValidationState () {
    if (this.state.email.length > 5) return 'success'
    return null
  }
  render () {
    return (
      <div className='row'>
        <div className='col-md-3'></div>
        <div className='col-md-6 col-xs-12'>
          <span className=''>Welcome, please log in</span>
          <form>
            <FormGroup
              controlId='formBasicText'
              >
              <ControlLabel>Email:</ControlLabel>
              <FormControl
                type='text'
                value={this.state.email}
                name='email'
                placeholder='Email Address'
                onChange={e => this.handleChange(e)}
                />
              <ControlLabel>Password:</ControlLabel>
              <FormControl
                type='password'
                value={this.state.pass}
                name='pass'
                placeholder='Password'
                onChange={e => this.handleChange(e)}
                />
            </FormGroup>
          </form>
        </div>
        <div className='col-md-3'></div>
      </div>
    )
  }
}

export default Login
