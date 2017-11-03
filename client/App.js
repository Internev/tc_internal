import React, { PropTypes } from 'react'
import { BrowserRouter as Router, Link, Switch } from 'react-router-dom'
import Route from './utils/AuthRoute'
import Login from './containers/Login'
import Signup from './containers/Signup'
import Logout from './containers/Logout'
import Header from './containers/Header'
import Test from './components/Test'
import Protected from './components/Protected'

const App = () => (
  <Router>
    <div className='container'>
      <Header />
      <ul>
        <li><Link to='/'>Root</Link></li>
        <li><Link to='/login'>Login Page</Link></li>
        <li><Link to='/protected'>Protected Page</Link></li>
        <li><Link to='/logout'>Log Out</Link></li>
      </ul>
      <div className='row'>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/protected' component={Protected} />
          <Route path='/logout' component={Logout} />
          <Route path='/' component={Test} />
        </Switch>
      </div>
    </div>
  </Router>
)

export default App
