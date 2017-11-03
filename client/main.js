import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import registerServiceWorker from './utils/registerServiceWorker'
import './main.scss'
import store from './redux/store'

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
registerServiceWorker()
