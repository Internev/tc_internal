import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import Route from './utils/AuthRoute'
import './App.scss'
import Login from './containers/auth/Login'
import Signup from './containers/auth/Signup'
import Logout from './containers/auth/Logout'
import Reset from './containers/auth/Reset'
import Forgot from './containers/auth/Forgot'
import Header from './containers/header/Header'
import DogListContainer from './containers/dogs/DogListContainer'
import DogDetailsContainer from './containers/dogs/DogDetailsContainer'
import UserTools from './containers/usertools/UserTools'
import ClientTools from './containers/clienttools/ClientTools'
import ScheduleContainer from './containers/schedule/ScheduleContainer'
import AssignDogs from './containers/assignDogs/AssignDogs'
import WalkHistoryContainer from './containers/history/WalkHistoryContainer'
import CommentHistoryContainer from './containers/commentHistory/CommentHistoryContainer'

const App = ({...props}) => (
  <Router>
    <div>
      <Header />
      <div className='tc-app'>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/forgot' component={Forgot} />
          <Route path='/reset/:token' component={Reset} />
          <Route path='/logout' component={Logout} isPrivate />
          <Route path='/user-tools' component={UserTools} isPrivate adminOnly />
          <Route path='/assigned-dogs' component={DogListContainer} isPrivate adminOnly />
          <Route path='/client-tools' component={ClientTools} isPrivate adminOnly />
          <Route path='/dog-details/:id' component={DogDetailsContainer} isPrivate />
          <Route path='/calendar' component={ScheduleContainer} isPrivate adminOnly />
          <Route path='/assign-dogs' component={AssignDogs} isPrivate adminOnly />
          <Route path='/comment-history' component={CommentHistoryContainer} isPrivate adminOnly />
          <Route path='/history' component={WalkHistoryContainer} isPrivate />
          <Route path='/' component={props.auth.admin
              ? ScheduleContainer
              : DogListContainer} isPrivate />
        </Switch>
      </div>
    </div>
  </Router>
)

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(App)
