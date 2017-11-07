import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Message, Icon, Dimmer, Loader } from 'semantic-ui-react'
import { changePassword, resetPasswordCheck } from '../../redux/creators/userCreators'
import './Auth.scss'

class Reset extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pass: '',
      passConfirm: ''
    }
    this.getPassValid = this.getPassValid.bind(this)
    this.getPassConfirmValid = this.getPassConfirmValid.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }
  componentWillMount () {
    this.props.dispatch(resetPasswordCheck(this.props.match.params.token))
  }
  componentDidUpdate () {
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
    this.props.dispatch(changePassword(this.state.pass, this.props.match.params.token))
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
          <Dimmer inverted active={this.props.user.isPassTokenChecking}>
            <Loader inverted>Checking Reset Permission</Loader>
          </Dimmer>
          <h4 className='auth_heading'>Password reset</h4>
          {!this.props.user.isPassTokenChecking && this.props.user.isPassTokenGood
          ? <Form
            error={this.props.user.auth.message.length > 0}
            onSubmit={this.handleFormSubmit}
            >
            <Message
              error
              content={this.props.user.auth.message}
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
              disabled={!(this.getPassValid() && this.getPassConfirmValid())}
              >Update Password</Form.Button>
          </Form>
          : <div>
            Sorry, the reset token has expired or is invalid. If you would like to request a new reset email, please head <Link to='/forgot'>here</Link>.
          </div>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Reset)
