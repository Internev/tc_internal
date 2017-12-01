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
    key: 'change-password',
    content: <Link to='/change-password' className='tcheader_nav-link'>Change Password</Link>,
    admin: false
  },
  {
    key: 'logout',
    content: <Link to='/logout' className='tcheader_nav-link'>Logout</Link>,
    admin: false
  }
]
