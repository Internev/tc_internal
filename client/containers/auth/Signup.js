import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Message, Icon } from 'semantic-ui-react'
import { signupUser, updateAuthMsg } from '../../redux/creators/authCreators'
import './Auth.scss'

class Signup extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      name: '',
      phone: '',
      pass: '',
      passConfirm: '',
      submit: false
    }
    this.getEmailValid = this.getEmailValid.bind(this)
    this.getPassValid = this.getPassValid.bind(this)
    this.getPassConfirmValid = this.getPassConfirmValid.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }
  componentWillMount () {
    this.props.dispatch(updateAuthMsg(''))
    this.props.dispatch({type: 'SIGNUP_REDIRECT'})
  }
  componentDidUpdate () {
    if (this.props.auth.auth.success) {
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
      name: this.state.name,
      email: this.state.email.toLowerCase(),
      phone: this.state.phone,
      password: this.state.pass
    }
    this.props.dispatch(signupUser(creds))
  }
  getEmailValid () {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)
  }
  getPassValid () {
    return this.state.pass.length > 5
  }
  getPassConfirmValid () {
    if (this.state.pass === this.state.passConfirm && this.state.passConfirm.length > 5) return true
    if (this.state.passConfirm.length > 3) return false
    return null
  }
  render () {
    const validIcon =
      <Icon
        name='check'
        color='green'
        circular
        bordered
      />
    const warnIcon =
        <Icon
          name='attention'
          color='orange'
          circular
          bordered
        />

    return (
      <div className='auth'>
        <div className='auth_container'>
          <h4 className='auth_heading'>Welcome aboard, please create your account</h4>
          <Form
            warning={this.props.auth.auth.message.length > 0}
            onSubmit={this.handleFormSubmit}
            >
            <Message
              warning
              content={this.props.auth.auth.message}
              />
            <Form.Input
              label='Name'
              placeholder='Name'
              type='text'
              name='name'
              value={this.state.name}
              onChange={e => this.handleChange(e)}
              icon={this.state.name ? validIcon : null}
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
              label='Phone'
              placeholder='Phone Number'
              type='text'
              name='phone'
              value={this.state.phone}
              onChange={e => this.handleChange(e)}
              icon={this.state.phone.length > 9 ? validIcon : null}
              />
            <Form.Input
              label='Password (min 6 characters)'
              placeholder='Password'
              type='password'
              name='pass'
              value={this.state.pass}
              onChange={e => this.handleChange(e)}
              icon={this.getPassValid() ? validIcon : null}
              />
            <Form.Input
              label='Confirm Password'
              placeholder='Password'
              type='password'
              name='passConfirm'
              value={this.state.passConfirm}
              onChange={e => this.handleChange(e)}
              icon={
                this.getPassConfirmValid()
                ? validIcon
                : this.getPassConfirmValid() === null
                  ? null
                  : warnIcon}
              />
            <Form.Button
              disabled={!(this.getEmailValid() && this.getPassValid() && this.getPassConfirmValid())}
              >Submit</Form.Button>
          </Form>
          <div className='auth_link'>Already have an account? <Link to='/login'>Log in here</Link>.</div>
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

export default connect(mapStateToProps)(Signup)
