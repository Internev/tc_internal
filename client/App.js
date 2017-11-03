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
    <div>
      <Header />
      <div className='container'>
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
    </div>
  </Router>
)

export default App
