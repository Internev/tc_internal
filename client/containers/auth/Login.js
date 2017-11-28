import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Message, Icon } from 'semantic-ui-react'
import { loginUser } from '../../redux/creators/authCreators'
import './Auth.scss'

class Login extends React.Component {
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
  componentWillMount () {
    console.log('login component mounting, state:', this.state)
    console.log('login component mounting, props:', this.props)
  }
  componentDidMount () {
    console.log('login component mounted, state:', this.state)
    console.log('login component mounted, props:', this.props)
  }
  componentDidUpdate () {
    if (this.props.auth.auth.success) {
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
      email: this.state.email.toLowerCase(),
      password: this.state.pass
    }
    this.props.dispatch(loginUser(creds))
  }
  getEmailValid () {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)
  }
  getPassValid () {
    return this.state.pass.length > 5
  }
  render () {
    const validIcon =
      <Icon
        name='check'
        color='green'
        circular
        bordered
      />

    return (
      <div className='auth'>
        <div className='auth_container'>
          <h4 className='auth_heading'>Welcome, please log in</h4>
          <Form
            warning={this.props.auth.auth.message.length > 0}
            onSubmit={this.handleFormSubmit}
            >
            <Message
              warning
              content={this.props.auth.auth.message}
              />
            <Form.Input
              label='Email'
              placeholder='Email Address'
              type='text'
              name='email'
              value={this.state.email}
              onChange={e => this.handleChange(e)}
              icon={this.getEmailValid() ? validIcon : null}
              />
            <Form.Input
              label='Password'
              placeholder='Password'
              type='password'
              name='pass'
              value={this.state.pass}
              onChange={e => this.handleChange(e)}
              icon={this.getPassValid() ? validIcon : null}
              />
            <Form.Button
              disabled={!(this.getEmailValid() && this.getPassValid())}
              >Submit</Form.Button>
          </Form>
          <div className='auth_link'>
            No account yet? <Link to='/signup'>Sign up here</Link>.<br />
            Forgotten your password? <Link to='/forgot'>Reset it here</Link>.
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Login)
