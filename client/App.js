import React, { PropTypes } from 'react'
import { BrowserRouter as Router, Link, Switch } from 'react-router-dom'
import Route from './containers/AuthRoute'
import Login from './components/Login'
import Home from './components/Home'
import Protected from './components/Protected'

const App = () => (
  <Router>
    <div className='container'>
      <ul>
        <li><Link to="/">Root</Link></li>
        <li><Link to="/login">Login Page</Link></li>
        <li><Link to="/protected">Protected Page</Link></li>
      </ul>
      <div className='row'>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/protected" component={Protected}/>
          <Route path="/" component={Home}/>
        </Switch>
      </div>
    </div>
  </Router>
)

export default App
