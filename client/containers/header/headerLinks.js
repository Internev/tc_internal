import React from 'react'
import { Link } from 'react-router-dom'

export const headerLinks = [
  {
    key: 'home',
    content: <Link to='/home' className='tcheader_nav-link'>Home</Link>,
    admin: false
  },
  {
    key: 'user-tools',
    content: <Link to='/user-tools' className='tcheader_nav-link'>User Tools</Link>,
    admin: true
  },
  {
    key: 'client-tools',
    content: <Link to='/client-tools' className='tcheader_nav-link'>Client Tools</Link>,
    admin: true
  },
  {
    key: 'assigned-dogs',
    content: <Link to='/assigned-dogs' className='tcheader_nav-link'>Assigned Dogs</Link>,
    admin: true
  },
  {
    key: 'calendar',
    content: <Link to='/calendar' className='tcheader_nav-link'>Calendar</Link>,
    admin: true
  },
  {
    key: 'assign-dogs',
    content: <Link to='/assign-dogs' className='tcheader_nav-link'>Assign Dogs</Link>,
    admin: true
  },
  {
    key: 'history',
    content: <Link to='/history' className='tcheader_nav-link'>Walk History</Link>,
    admin: true
  },
  {
    key: 'comment-history',
    content: <Link to='/comment-history' className='tcheader_nav-link'>Comment History</Link>,
    admin: true
  },
  {
    key: 'logout',
    content: <Link to='/logout' className='tcheader_nav-link'>Logout</Link>,
    admin: false
  }
]
