import React from 'react'
import { connect } from 'react-redux'
import { Form, Message, Icon } from 'semantic-ui-react'
import { updateAuthMsg, forgotPassword } from '../../redux/creators/userCreators'
import './Auth.scss'

class Forgot extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: ''
    }
    this.getEmailValid = this.getEmailValid.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }
  componentWillMount () {
    this.props.dispatch(updateAuthMsg(`Please enter the email address you signed up with. We'll send you link to reset your password.`))
  }
  handleChange (e) {
    const change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
  }
  handleFormSubmit (e) {
    e.preventDefault()
    this.props.dispatch(forgotPassword(this.state.email))
    this.setState({email: ''})
  }
  getEmailValid () {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)
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
          <h4 className='auth_heading'>Password reset</h4>
          <Form
            warning={this.props.user.auth.message.length > 0}
            onSubmit={this.handleFormSubmit}
            >
            <Message
              warning
              content={this.props.user.auth.message}
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
            <Form.Button
              disabled={!(this.getEmailValid())}
              >Send Email</Form.Button>
          </Form>
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

export default connect(mapStateToProps)(Forgot)
