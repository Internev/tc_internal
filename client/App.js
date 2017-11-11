import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import Route from './utils/AuthRoute'
import Login from './containers/auth/Login'
import Signup from './containers/auth/Signup'
import Logout from './containers/auth/Logout'
import Reset from './containers/auth/Reset'
import Forgot from './containers/auth/Forgot'
import Header from './containers/header/Header'
import Test from './components/Test'
import UserTools from './containers/usertools/UserTools'

const App = () => (
  <Router>
    <div>
      <Header />
      <div className='container'>
        <div className='row'>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/forgot' component={Forgot} />
            <Route path='/reset/:token' component={Reset} />
            <Route path='/logout' component={Logout} isPrivate />
            <Route path='/user-tools' component={UserTools} isPrivate adminOnly />
            <Route path='/' component={Test} isPrivate />
          </Switch>
        </div>
      </div>
    </div>
  </Router>
)

export default App
